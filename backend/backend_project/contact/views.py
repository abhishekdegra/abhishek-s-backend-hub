import json
import logging
import urllib.request
import urllib.error

from django.conf import settings
from django.core.exceptions import ValidationError
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

        step = "check_config"
        if not settings.RESEND_API_KEY:
            logger.error("Resend API key is missing")
            return JsonResponse({"success": False, "step": step, "error": "Email provider not configured"}, status=500)
        if not settings.CONTACT_EMAIL:
            logger.error("Contact email is missing")
            return JsonResponse({"success": False, "step": step, "error": "Recipient email is not configured"}, status=500)

        full_message = f"Visitor Name: {name}\nVisitor Email: {email}\nVisitor Message:\n{message}"
        logger.info("Contact request received for email=%s", email)

        step = "send_email"
        payload_data = {
            "from": settings.RESEND_FROM_EMAIL,
            "to": [settings.CONTACT_EMAIL],
            "subject": "New Portfolio Contact Message",
            "text": full_message,
            "html": f"<p><strong>Name:</strong> {name}</p><p><strong>Email:</strong> {email}</p><p><strong>Message:</strong></p><p>{message}</p>",
            "reply_to": email,
        }
        logger.info("Resend request payload: %s", json.dumps({
            "from": payload_data["from"],
            "to": payload_data["to"],
            "subject": payload_data["subject"],
            "reply_to": payload_data["reply_to"],
        }))

        payload = json.dumps(payload_data).encode("utf-8")

        request_obj = urllib.request.Request(
            "https://api.resend.com/emails",
            data=payload,
            method="POST",
            headers={
                "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "Django/ResendContactClient",
            },
        )

        try:
            logger.info(
                "Sending Resend email from=%s to=%s reply_to=%s",
                settings.RESEND_FROM_EMAIL,
                settings.CONTACT_EMAIL,
                email,
            )
            with urllib.request.urlopen(request_obj, timeout=settings.RESEND_REQUEST_TIMEOUT) as response:
                status_code = response.getcode()
                response_body = response.read().decode("utf-8", errors="ignore")
            logger.info("Resend response status=%s body=%s", status_code, response_body)
            if status_code >= 400:
                raise Exception(f"Resend returned status {status_code}: {response_body}")
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="ignore")
            headers = dict(e.headers) if e.headers is not None else {}
            logger.error(
                "Resend HTTP error status=%s reason=%s headers=%s body=%s",
                getattr(e, 'code', None),
                getattr(e, 'reason', None),
                headers,
                body,
            )
            return JsonResponse({
                "success": False,
                "step": step,
                "error": "Failed to send email",
                "error_type": type(e).__name__,
                "status": getattr(e, 'code', None),
                "details": body,
            }, status=getattr(e, 'code', 500))
        except urllib.error.URLError as e:
            logger.error("Resend URL error: %s", str(e))
            return JsonResponse({
                "success": False,
                "step": step,
                "error": "Failed to send email",
                "error_type": type(e).__name__,
                "details": str(e),
            }, status=500)
        except Exception as e:
            logger.exception("Resend request failed")
            return JsonResponse({
                "success": False,
                "step": step,
                "error": "Failed to send email",
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
