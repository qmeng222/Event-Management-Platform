- [x] build the images defined in the docker-compose.yml file and run the application:
      docker-compose build
      docker-compose up

- [x] fake SMTP server: http://localhost:8025/
- [x] front-end application: http://localhost:3000/
- [x] create new location: http://localhost:3000/new-location.html
- [x] create new conference: http://localhost:3000/new-conference.html
- [x] create new presentation: http://localhost:3000/new-presentation.html
- [x] attend conference: http://localhost:3000/attend-conference.html
- [x] login: http://localhost:3000/login.html
- [x] React app: http://localhost:3001/

---

# Setup:

1. Install from pip: python -m pip install django-cors-headers
2. and then add it to your installed apps:
   INSTALLED_APPS = [
   ...,
   "corsheaders",
   ...,
   ]
   Make sure you add the trailing comma or you might get a ModuleNotFoundError.
3. You will also need to add a middleware class to listen in on responses:
   MIDDLEWARE = [
   ...,
   "corsheaders.middleware.CorsMiddleware",
   "django.middleware.common.CommonMiddleware",
   ...,
   ]

   CorsMiddleware should be placed as high as possible, especially before any middleware that can generate responses such as Django's CommonMiddleware or Whitenoise's WhiteNoiseMiddleware. If it is not before, it will not be able to add the CORS headers to these responses.

   Also if you are using CORS_REPLACE_HTTPS_REFERER it should be placed before Django's CsrfViewMiddleware.
