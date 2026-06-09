import json
import os
import smtplib
import urllib.request
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(name: str, contact: str, question: str, service: str):
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if not smtp_password:
        return False

    sender = "olgazajceva332@gmail.com"
    recipient = "olgazajceva332@gmail.com"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = sender
    msg["To"] = recipient

    body = f"""
Новая заявка с сайта:

Имя: {name}
Контакт: {contact}
Услуга: {service or 'не указана'}
Вопрос: {question}
"""
    msg.attach(MIMEText(body, "plain", "utf-8"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_bytes())
    return True


def send_telegram(name: str, contact: str, question: str, service: str):
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")
    if not token or not chat_id:
        return False

    text = (
        f"📩 Новая заявка с сайта!\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Контакт: {contact}\n"
        f"✨ Услуга: {service or 'не указана'}\n"
        f"💬 Вопрос: {question}"
    )

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req, timeout=10)
    return True


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на email и в Telegram."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    raw_body = event.get("body") or "{}"
    body = json.loads(raw_body) if isinstance(raw_body, str) else raw_body
    name = body.get("name", "").strip()
    contact = body.get("contact", "").strip()
    question = body.get("question", "").strip()
    service = body.get("service", "").strip()

    if not name or not contact:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": {"error": "Укажите имя и контакт"},
        }

    email_ok = send_email(name, contact, question, service)
    tg_ok = send_telegram(name, contact, question, service)

    return {
        "statusCode": 200,
        "headers": headers,
        "body": {"success": True, "email": email_ok, "telegram": tg_ok},
    }