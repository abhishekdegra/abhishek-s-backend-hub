from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import json


@csrf_exempt
def send_contact_email(request):
    if request.method != "POST":
        return JsonResponse({"status": "error", "error": "Invalid method"}, status=405)

    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return JsonResponse({"status": "error", "error": "Invalid JSON payload"}, status=400)

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    # Basic validation
    if not name or not email or not message:
        return JsonResponse({"status": "error", "error": "All fields are required"}, status=400)

    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"status": "error", "error": "Invalid email address"}, status=400)

    full_message = f"Name: {name}\nEmail: {email}\nMessage: {message}"

    try:
        send_mail(
            subject="New Contact Message",
            message=full_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
    except Exception as e:
        # Log the exception server-side (print used for simplicity)
        print("Contact email send failed:", str(e))
        return JsonResponse({"status": "error", "error": "Failed to send email"}, status=500)

    return JsonResponse({"status": "success"}, status=200)