import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from html import escape
from typing import Dict
import logging

logger = logging.getLogger(__name__)


def _mask_email(email: str) -> str:
    if not email or '@' not in email:
        return '***'
    local, domain = email.split('@', 1)
    return f"{local[0]}***@{domain}" if local else f"***@{domain}"


class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_user = os.getenv('SMTP_USER', '')
        self.smtp_password = os.getenv('SMTP_PASSWORD', '')
        self.from_email = os.getenv('FROM_EMAIL', 'noreply@yourbusiness.com')
        self.to_email = os.getenv('ADMIN_EMAIL', 'admin@yourbusiness.com')
        self.enabled = os.getenv('EMAIL_ENABLED', 'false').lower() == 'true'

    def send_lead_notification(self, lead_data: Dict) -> bool:
        if not self.enabled:
            logger.info(f"Email notifications disabled. Lead captured: {_mask_email(lead_data.get('email', ''))}")
            return True

        try:
            message = MIMEMultipart('alternative')
            message['Subject'] = f"New Lead: {escape(lead_data.get('name', ''))}"
            message['From'] = self.from_email
            message['To'] = self.to_email

            name = escape(lead_data.get('name', ''))
            email = escape(lead_data.get('email', ''))
            phone = escape(lead_data.get('phone', ''))
            company = escape(lead_data.get('company', 'N/A'))
            msg = escape(lead_data.get('message', ''))
            lead_id = escape(str(lead_data.get('id', '')))
            created_at = escape(str(lead_data.get('created_at', '')))

            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
                            New Lead Received
                        </h2>

                        <div style="margin: 20px 0;">
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Phone:</strong> {phone}</p>
                            <p><strong>Company:</strong> {company}</p>
                        </div>

                        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                            <p><strong>Message:</strong></p>
                            <p style="white-space: pre-wrap;">{msg}</p>
                        </div>

                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                            <p>Lead ID: {lead_id}</p>
                            <p>Submitted: {created_at}</p>
                        </div>
                    </div>
                </body>
            </html>
            """

            html_part = MIMEText(html_body, 'html')
            message.attach(html_part)

            if self.smtp_user and self.smtp_password:
                with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_user, self.smtp_password)
                    server.send_message(message)

                logger.info(f"Email notification sent for lead: {_mask_email(lead_data.get('email', ''))}")
                return True
            else:
                logger.warning("SMTP credentials not configured. Email not sent.")
                return False

        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False

    def send_thank_you_email(self, lead_data: Dict) -> bool:
        if not self.enabled:
            return True

        try:
            message = MIMEMultipart('alternative')
            message['Subject'] = "Thank you for contacting us!"
            message['From'] = self.from_email
            message['To'] = lead_data.get('email')

            name = escape(lead_data.get('name', ''))

            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #000;">Thank You for Reaching Out!</h2>

                        <p>Hi {name},</p>

                        <p>Thank you for your interest in our services. We have received your message and will get back to you within 24 hours.</p>

                        <p>In the meantime, feel free to explore our website to learn more about what we offer.</p>

                        <p>Best regards,<br>
                        <strong>YourBrand Team</strong></p>

                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                            <p>This is an automated response. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
            </html>
            """

            html_part = MIMEText(html_body, 'html')
            message.attach(html_part)

            if self.smtp_user and self.smtp_password:
                with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_user, self.smtp_password)
                    server.send_message(message)

                logger.info(f"Thank you email sent to: {_mask_email(lead_data.get('email', ''))}")
                return True
            else:
                return False

        except Exception as e:
            logger.error(f"Failed to send thank you email: {str(e)}")
            return False


email_service = EmailService()
