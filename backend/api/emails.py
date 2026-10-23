"""
backend/api/emails.py — Automated Email Notifications via Resend & Django Anymail.

Dispatches instant lead alerts to administrators whenever a quote is requested,
a contact form is submitted, or a job application is received.
"""

import logging
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.utils.html import escape

logger = logging.getLogger(__name__)


def get_admin_recipients():
    """
    Returns a cleaned list of admin email addresses from settings.ADMIN_NOTIFICATION_EMAIL.
    """
    raw = getattr(settings, "ADMIN_NOTIFICATION_EMAIL", "hello@jnab.tech")
    if isinstance(raw, (list, tuple)):
        return [str(e).strip() for e in raw if str(e).strip()]
    return [e.strip() for e in str(raw).split(",") if e.strip()]


def _build_html_email(title: str, subtitle: str, fields: list[tuple[str, str]], admin_url: str = None) -> str:
    """
    Builds a high-end, responsive HTML email template branded with JNAB Innovations styling.
    """
    field_rows = []
    for label, val in fields:
        if val is None or val == "":
            continue
        safe_val = escape(str(val)).replace("\n", "<br/>")
        field_rows.append(f"""
        <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #94A3B8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; width: 32%; border-bottom: 1px solid #1E293B; vertical-align: top;">
                {escape(label)}
            </td>
            <td style="padding: 10px 14px; color: #F1F5F9; font-size: 14px; font-weight: 500; border-bottom: 1px solid #1E293B; vertical-align: top;">
                {safe_val}
            </td>
        </tr>
        """)

    admin_button_html = ""
    if admin_url:
        admin_button_html = f"""
        <div style="text-align: center; margin-top: 28px; margin-bottom: 10px;">
            <a href="{admin_url}" style="background-color: #02AA69; color: #FFFFFF; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 9999px; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(2, 170, 105, 0.4);">
                Open in Django Admin &rarr;
            </a>
        </div>
        """

    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{escape(title)}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #070B11; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F1F5F9;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #070B11; padding: 40px 12px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" style="max-width: 620px; background-color: #0C121D; border: 1px solid #1E293B; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                        
                        <!-- Header Banner -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #02AA69 0%, #0F3A2E 100%); padding: 26px 30px; text-align: left;">
                                <div style="display: inline-block; background-color: rgba(0,0,0,0.25); color: #E6FFFA; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px;">
                                    JNAB Innovations · Instant Lead Alert
                                </div>
                                <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.3px;">
                                    {escape(title)}
                                </h1>
                                <p style="margin: 6px 0 0; font-size: 13px; color: #D1FAE5;">
                                    {escape(subtitle)}
                                </p>
                            </td>
                        </tr>

                        <!-- Body Content -->
                        <tr>
                            <td style="padding: 28px 26px;">
                                <table role="presentation" width="100%" style="border-collapse: collapse; background-color: #080D15; border-radius: 10px; overflow: hidden; border: 1px solid #1E293B;">
                                    {"".join(field_rows)}
                                </table>

                                {admin_button_html}
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #06090E; padding: 18px 26px; border-top: 1px solid #1E293B; text-align: center;">
                                <p style="margin: 0; font-size: 12px; color: #64748B;">
                                    JNAB Tech Solutions · Accra, Ghana · <a href="https://www.jnab.tech" style="color: #02AA69; text-decoration: none;">www.jnab.tech</a>
                                </p>
                                <p style="margin: 4px 0 0; font-size: 11px; color: #475569;">
                                    Powered by Resend Transactional Email & Django Anymail
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """


def send_product_build_notification(inquiry, request=None):
    """
    Notifies admin team when a client requests a quote for an end-to-end product build.
    """
    recipients = get_admin_recipients()
    if not recipients:
        logger.warning("[Email] No admin notification email configured in settings.")
        return False

    title = f"New Product Build Quote: {inquiry.full_name}"
    subtitle = f"Company: {inquiry.company_name or 'Independent Venture'} · Budget: {inquiry.get_budget_range_display()}"
    
    admin_url = None
    if request:
        admin_url = request.build_absolute_uri(f"/admin/api/productbuildinquiry/{inquiry.id}/change/")

    fields = [
        ("Full Name", inquiry.full_name),
        ("Company", inquiry.company_name or "Not provided"),
        ("Work Email", inquiry.work_email),
        ("Phone", inquiry.phone),
        ("Project Type", inquiry.get_project_type_display()),
        ("Target Platforms", inquiry.target_platforms or "Not specified"),
        ("Budget Range", inquiry.get_budget_range_display()),
        ("Target Timeline", inquiry.get_timeline_display()),
        ("Spec / PRD Link", inquiry.existing_spec_url or "None provided"),
        ("Project Brief", inquiry.project_description),
        ("Submitted At", inquiry.created_at.strftime("%Y-%m-%d %H:%M:%S UTC") if inquiry.created_at else "Just now"),
    ]

    html_content = _build_html_email(title, subtitle, fields, admin_url)
    text_content = f"{title}\n\n" + "\n".join([f"{k}: {v}" for k, v in fields])

    subject = f"🔔 [JNAB Quote] {inquiry.full_name} — {inquiry.get_project_type_display()}"

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=recipients,
            reply_to=[inquiry.work_email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        logger.info("[Email] Dispatched Product Build alert to %s", recipients)
        return True
    except Exception as e:
        logger.error("[Email] Failed to dispatch Product Build notification: %s", e, exc_info=True)
        return False


def send_hire_talent_notification(inquiry, request=None):
    """
    Notifies admin team when a client requests an engineering pod or embedded talent.
    """
    recipients = get_admin_recipients()
    if not recipients:
        return False

    title = f"New Talent Pod Request: {inquiry.company_name}"
    subtitle = f"Contact: {inquiry.full_name} · Engagement: {inquiry.get_engagement_model_display()}"

    admin_url = None
    if request:
        admin_url = request.build_absolute_uri(f"/admin/api/hiretalentinquiry/{inquiry.id}/change/")

    fields = [
        ("Full Name", inquiry.full_name),
        ("Company Name", inquiry.company_name),
        ("Work Email", inquiry.work_email),
        ("Phone", inquiry.phone),
        ("Engagement Model", inquiry.get_engagement_model_display()),
        ("Roles Needed", inquiry.roles_needed),
        ("Seniority Level", inquiry.get_seniority_level_display()),
        ("Headcount", inquiry.headcount),
        ("Duration", inquiry.get_duration_display()),
        ("Start Date", inquiry.start_date),
        ("Timezone Overlap", inquiry.timezone_overlap),
        ("Technical Requirements", inquiry.technical_requirements),
    ]

    html_content = _build_html_email(title, subtitle, fields, admin_url)
    text_content = f"{title}\n\n" + "\n".join([f"{k}: {v}" for k, v in fields])
    subject = f"👥 [JNAB Talent Pod] {inquiry.company_name} — {inquiry.roles_needed}"

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=recipients,
            reply_to=[inquiry.work_email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        logger.info("[Email] Dispatched Hire Talent alert to %s", recipients)
        return True
    except Exception as e:
        logger.error("[Email] Failed to dispatch Hire Talent notification: %s", e, exc_info=True)
        return False


def send_academy_notification(application, request=None):
    """
    Notifies admissions team when someone applies to JNAB Academy.
    """
    recipients = get_admin_recipients()
    if not recipients:
        return False

    title = f"New Academy Application: {application.full_name}"
    subtitle = f"Track: {application.get_track_display()}"

    admin_url = None
    if request:
        admin_url = request.build_absolute_uri(f"/admin/api/academyapplication/{application.id}/change/")

    fields = [
        ("Full Name", application.full_name),
        ("Email", application.email),
        ("Phone", application.phone),
        ("Track", application.get_track_display()),
        ("Experience Level", application.get_experience_level_display()),
        ("Learning Mode", application.get_learning_mode_display()),
        ("Portfolio / GitHub", application.portfolio_or_github or "None provided"),
        ("Scholarship Requested", "Yes" if application.scholarship_requested else "No"),
        ("Motivation", application.motivation_statement),
    ]

    html_content = _build_html_email(title, subtitle, fields, admin_url)
    text_content = f"{title}\n\n" + "\n".join([f"{k}: {v}" for k, v in fields])
    subject = f"🎓 [JNAB Academy] New Application: {application.full_name} ({application.get_track_display()})"

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=recipients,
            reply_to=[application.email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        logger.info("[Email] Dispatched Academy alert to %s", recipients)
        return True
    except Exception as e:
        logger.error("[Email] Failed to dispatch Academy notification: %s", e, exc_info=True)
        return False


def send_contact_notification(inquiry, request=None):
    """
    Notifies admin team when a visitor submits the Contact Us page form.
    """
    recipients = get_admin_recipients()
    if not recipients:
        return False

    title = f"New Contact Inquiry: {inquiry.name}"
    subtitle = f"Subject: {inquiry.subject} · Source: {inquiry.source}"

    admin_url = None
    if request:
        admin_url = request.build_absolute_uri(f"/admin/api/contactinquiry/{inquiry.id}/change/")

    fields = [
        ("Full Name", inquiry.name),
        ("Email", inquiry.email),
        ("Phone", inquiry.phone or "Not provided"),
        ("Subject", inquiry.subject),
        ("Source", inquiry.source),
        ("Message", inquiry.message),
    ]

    html_content = _build_html_email(title, subtitle, fields, admin_url)
    text_content = f"{title}\n\n" + "\n".join([f"{k}: {v}" for k, v in fields])
    subject = f"📬 [JNAB Contact] {inquiry.name}: {inquiry.subject}"

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=recipients,
            reply_to=[inquiry.email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        logger.info("[Email] Dispatched Contact inquiry alert to %s", recipients)
        return True
    except Exception as e:
        logger.error("[Email] Failed to dispatch Contact notification: %s", e, exc_info=True)
        return False


def send_career_application_notification(application, request=None):
    """
    Notifies recruitment team when an engineer or designer applies to a career opening.
    """
    recipients = get_admin_recipients()
    if not recipients:
        return False

    target_role = application.position.title if application.position else (application.role_title_applied or "General Talent")
    title = f"New Job Application: {application.full_name}"
    subtitle = f"Applying for: {target_role}"

    admin_url = None
    if request:
        admin_url = request.build_absolute_uri(f"/admin/api/jobapplication/{application.id}/change/")

    fields = [
        ("Applicant Name", application.full_name),
        ("Role Applied", target_role),
        ("Email", application.email),
        ("Phone", application.phone),
        ("Location", application.location or "Not specified"),
        ("Experience", application.years_of_experience or "Not specified"),
        ("Portfolio URL", application.portfolio_url or "None"),
        ("GitHub URL", application.github_url or "None"),
        ("LinkedIn URL", application.linkedin_url or "None"),
        ("Resume Uploaded", application.resume.url if application.resume else (application.resume_url or "None")),
        ("Cover Note", application.cover_note),
    ]

    html_content = _build_html_email(title, subtitle, fields, admin_url)
    text_content = f"{title}\n\n" + "\n".join([f"{k}: {v}" for k, v in fields])
    subject = f"💼 [JNAB Career] {application.full_name} applied for {target_role}"

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=recipients,
            reply_to=[application.email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        logger.info("[Email] Dispatched Career Application alert to %s", recipients)
        return True
    except Exception as e:
        logger.error("[Email] Failed to dispatch Career Application notification: %s", e, exc_info=True)
        return False
