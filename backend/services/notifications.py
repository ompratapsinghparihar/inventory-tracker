import smtplib
from email.mime.text import MIMEText

def send_email(subject: str, message: str, to_email: str):
    try:
        sender_email = "your_email@gmail.com"
        sender_password = "your_password"

        msg = MIMEText(message)
        msg["Subject"] = subject
        msg["From"] = sender_email
        msg["To"] = to_email

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, [to_email], msg.as_string())
        server.quit()
    except Exception as e:
        print("Email Error:", e)

def check_low_stock(item):
    if item.quantity <= item.threshold:
        send_email(
            "Low Stock Alert",
            f"Item '{item.name}' is running low (Qty: {item.quantity})",
            "admin@example.com",
        )

def notify_request_status(user_email, status):
    send_email(
        "Request Update",
        f"Your request status is now: {status}",
        user_email
    )