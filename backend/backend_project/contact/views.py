import json
import logging
import urllib.request
import urllib.error

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger(__name__)

@csrf_exempt
def send_contact_email(request):
    step = "start"
    try:
        if request.method != "POST":
            step = "invalid_method"
            return JsonResponse({"success": False, "step": step, "error": "Invalid method"}, status=405)

        step = "parse_json"
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            logger.exception("Invalid JSON payload")
            return JsonResponse({
                "success": False,
                "step": step,
                "error": "Invalid JSON payload",
                "error_type": type(e).__name__,
            }, status=400)

        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip()
        message = (data.get("message") or "").strip()

        step = "validate_fields"
        if not name or not email or not message:
            return JsonResponse({"success": False, "step": step, "error": "All fields are required"}, status=400)

        step = "validate_email"
        try:
            validate_email(email)
        except ValidationError as e:
            logger.exception("Invalid email address")
            return JsonResponse({
                "success": False,
                "step": step,
                "error": "Invalid email address",
                "error_type": type(e).__name__,
            }, status=400)

        full_message = f"Name: {name}\nEmail: {email}\nMessage: {message}"
        logger.info("Contact request received for email=%s", email)

        step = "send_email"
        if getattr(settings, "SENDGRID_API_KEY", None):
            request_body = json.dumps({
                "personalizations": [{"to": [{"email": settings.SENDGRID_TO_EMAIL}]}],
                "from": {"email": settings.SENDGRID_FROM_EMAIL},
                "subject": "New Contact Message",
                "content": [{"type": "text/plain", "value": full_message}],
            }).encode("utf-8")
            req = urllib.request.Request(
                "https://api.sendgrid.com/v3/mail/send",
                data=request_body,
                method="POST",
                headers={
                    "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
                    "Content-Type": "application/json",
                },
            )
            try:
                with urllib.request.urlopen(req, timeout=10) as response:
                    status_code = response.getcode()
                    response_body = response.read().decode("utf-8", errors="ignore")
                logger.info("SendGrid response status=%s body=%s", status_code, response_body)
                if status_code >= 400:
                    raise Exception(f"SendGrid returned status {status_code}: {response_body}")
            except urllib.error.HTTPError as e:
                body = e.read().decode("utf-8", errors="ignore")
                logger.exception("SendGrid HTTP error")
                return JsonResponse({
                    "success": False,
                    "step": step,
                    "error": "Failed to send email via SendGrid",
                    "error_type": type(e).__name__,
                    "details": body,
                }, status=500)
            except Exception as e:
                logger.exception("SendGrid request failed")
                return JsonResponse({
                    "success": False,
                    "step": step,
                    "error": "Failed to send email via SendGrid",
                    "error_type": type(e).__name__,
                }, status=500)
        else:
            try:
                send_mail(
                    subject="New Contact Message",
                    message=full_message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
            except Exception as e:
                logger.exception("SMTP email send failed")
                return JsonResponse({
                    "success": False,
                    "step": step,
                    "error": "Failed to send email via SMTP",
                    "error_type": type(e).__name__,
                }, status=500)

        return JsonResponse({"success": True}, status=200)
    except Exception as e:
        logger.exception("Unhandled exception in contact endpoint at step %s", step)
        return JsonResponse({
            "success": False,
            "step": step,
            "error": "Internal server error",
            "error_type": type(e).__name__,
        }, status=500)
