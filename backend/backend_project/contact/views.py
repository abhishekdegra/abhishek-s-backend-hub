from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
import json

@csrf_exempt
def send_contact_email(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))

            name = data.get("name")
            email = data.get("email")
            message = data.get("message")

            full_message = f"Name: {name}\nEmail: {email}\nMessage: {message}"

            send_mail(
                subject="New Contact Message",
                message=full_message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
            )

            return JsonResponse({"status": "success"})

        except Exception as e:
            return JsonResponse({"status": "error", "error": str(e)})