from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# CORS settings: allow configuring origins via environment variable
CORS_ALLOW_ALL_ORIGINS = config('CORS_ALLOW_ALL_ORIGINS', default=False, cast=bool)
CORS_ALLOW_CREDENTIALS = True

# Provide sensible defaults for local development but allow override via .env
_default_origins = "http://localhost:8081,http://127.0.0.1:8081,http://localhost:8080,http://127.0.0.1:8080,http://localhost:5173"
raw_origins = config('CORS_ALLOWED_ORIGINS', default=_default_origins)
CORS_ALLOWED_ORIGINS = [o.strip() for o in raw_origins.split(',') if o.strip()]
# ================= SECURITY =================
SECRET_KEY = "django-insecure-86)v$&@b6kts4xlxxuf$ehm6*(l0daa(q#la!%@itk61@jyvyr"

DEBUG = True

ALLOWED_HOSTS = [
    'backend-web-portfolio.onrender.com',
    'localhost',
    '127.0.0.1',
    '*'
]

# ================= APPS =================
INSTALLED_APPS = [
    "corsheaders",  
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "contact",
]

# ================= MIDDLEWARE =================
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",

    "corsheaders.middleware.CorsMiddleware",   

    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ================= URL =================
ROOT_URLCONF = "backend_project.urls"

# ================= TEMPLATES =================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ================= WSGI =================
WSGI_APPLICATION = "backend_project.wsgi.application"

# ================= DATABASE =================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ================= PASSWORD =================
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# ================= I18N =================
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ================= STATIC =================
STATIC_URL = "static/"

# ================= EMAIL / RESEND =================
RESEND_API_KEY = config("RESEND_API_KEY", default=None)
if RESEND_API_KEY is not None:
    RESEND_API_KEY = RESEND_API_KEY.strip()
CONTACT_EMAIL = config("CONTACT_EMAIL", default=None)
if CONTACT_EMAIL is not None:
    CONTACT_EMAIL = CONTACT_EMAIL.strip()
RESEND_FROM_EMAIL = config("RESEND_FROM_EMAIL", default="onboarding@resend.dev").strip()
RESEND_REQUEST_TIMEOUT = config("RESEND_REQUEST_TIMEOUT", default=10, cast=int)

if not RESEND_API_KEY:
    raise ValueError("RESEND_API_KEY must be set in the environment")
if not CONTACT_EMAIL:
    raise ValueError("CONTACT_EMAIL must be set in the environment")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {
            "format": "%(asctime)s %(levelname)s %(name)s %(message)s",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "standard",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
}