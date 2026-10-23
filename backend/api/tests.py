from django.test import TestCase
from django.core import mail
from rest_framework.test import APIClient
from rest_framework import status
from .models import JobPosition, JobApplication, ProductBuildInquiry, HireTalentInquiry, AcademyApplication, ContactInquiry


class InquiryEmailNotificationTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_product_build_inquiry_sends_email(self):
        payload = {
            "full_name": "Alexander Sterling",
            "company_name": "Apex Global Ventures",
            "work_email": "alex@apexventures.io",
            "phone": "+44 20 7946 0991",
            "project_type": "full_cycle",
            "budget_range": "tier_3",
            "timeline": "standard",
            "project_description": "We need a scalable cross-platform fintech portal with Django and React.",
        }
        res = self.client.post("/api/inquiries/product-build/", data=payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProductBuildInquiry.objects.count(), 1)

        # Check outbox
        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertIn("Alexander Sterling", sent_email.subject)
        self.assertIn("Apex Global Ventures", sent_email.body)
        self.assertIn("fintech portal", sent_email.body)

    def test_contact_inquiry_sends_email(self):
        mail.outbox = []
        payload = {
            "name": "Kofi Mensah",
            "email": "kofi@mensahholdings.com",
            "phone": "+233 24 123 4567",
            "subject": "Enterprise Partnership Inquiry",
            "message": "Interested in discussing an enterprise software engineering partnership for Q1 2027.",
            "source": "Contact Us Page",
        }
        res = self.client.post("/api/inquiries/contact/", data=payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactInquiry.objects.count(), 1)

        # Check outbox
        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertIn("Kofi Mensah", sent_email.subject)
        self.assertIn("Enterprise Partnership Inquiry", sent_email.subject)
        self.assertIn("mensahholdings.com", sent_email.body)

    def test_hire_talent_inquiry_sends_email(self):
        mail.outbox = []
        payload = {
            "full_name": "Sarah Jenkins",
            "company_name": "CloudScale Inc",
            "work_email": "sarah@cloudscale.com",
            "phone": "+1 415 555 2671",
            "engagement_model": "dedicated_pod",
            "roles_needed": "2x Full-Stack Engineers, 1x QA",
            "seniority_level": "senior",
            "technical_requirements": "React, Python, AWS, Docker",
        }
        res = self.client.post("/api/inquiries/hire-talent/", data=payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(HireTalentInquiry.objects.count(), 1)

        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertIn("CloudScale Inc", sent_email.subject)
        self.assertIn("tech_pod", sent_email.body.lower().replace(" ", "_"))

    def test_academy_application_sends_email(self):
        mail.outbox = []
        payload = {
            "full_name": "Kwame Boateng",
            "email": "kwame@techmail.com",
            "phone": "+233 20 888 9999",
            "track": "full_stack",
            "experience_level": "intermediate",
            "learning_mode": "bootcamp",
            "motivation_statement": "Aspiring to master microservices and design systems.",
        }
        res = self.client.post("/api/inquiries/academy/", data=payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AcademyApplication.objects.count(), 1)

        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertIn("Kwame Boateng", sent_email.subject)

    def test_job_application_sends_email(self):
        mail.outbox = []
        job = JobPosition.objects.create(
            title="Senior React Developer",
            department="engineering",
            summary="React role",
            description="Role details",
            responsibilities="Coding",
            requirements="TypeScript"
        )
        payload = {
            "position": job.id,
            "full_name": "Ama Osei",
            "email": "ama.osei@devspace.io",
            "phone": "+233 55 999 1234",
            "portfolio_url": "https://amaosei.design",
            "cover_note": "5 years of modern React and state management experience.",
        }
        res = self.client.post("/api/careers/apply/", data=payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(JobApplication.objects.count(), 1)

        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertIn("Ama Osei", sent_email.subject)
        self.assertIn("Senior React Developer", sent_email.subject)
