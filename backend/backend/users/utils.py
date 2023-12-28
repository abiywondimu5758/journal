import pythoncom
import pyotp
from users.models import User
from django.core.mail import send_mail
import win32com.client as win32


def send_otp_to_user(user, otp):
    outlook = win32.Dispatch('outlook.application', pythoncom.CoInitialize())
    mail = outlook.CreateItem(0)
    mail.Subject = 'otp sent to ' + user.username
    mail.To = user.email
    mail.HTMLBody = otp
    mail.Send()


def generate_otp(user):
    totp = pyotp.TOTP(pyotp.random_base32())
    otp = totp.now()
    user.otp_secret = otp
    user.save()
    # Send OTP to the user through the desired channel (email, SMS, etc.)
    # send_otp_to_user(user, otp)


def verify_otp(user, entered_otp):
    print(user.otp_secret == str(entered_otp))
    totp = pyotp.TOTP(user.otp_secret)
    return str(entered_otp) == user.otp_secret

def generate_unique_otp(user):
    # Generate a new unique OTP for the user
    while True:
        totp = pyotp.TOTP(pyotp.random_base32())
        otp = totp.now()

        # Check if the generated OTP is unique
        if not User.objects.filter(otp_forgot_pass=otp).exists():
            return otp

def forgot_password(user):
    otp = generate_unique_otp(user)
    user.otp_forgot_pass = otp
    user.save()


def verify_forgot_otp(user, entered_otp):
    print(user.otp_forgot_pass == str(entered_otp))
    totp = pyotp.TOTP(user.otp_secret)
    return str(entered_otp) == user.otp_forgot_pass
