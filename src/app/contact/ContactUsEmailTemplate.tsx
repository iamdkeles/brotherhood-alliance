import React from "react";

type ContactUsEmailTemplateProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  agreeToTerms: boolean;
};

export default function ContactUsEmailTemplate({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
  agreeToTerms,
}: ContactUsEmailTemplateProps) {
  return (
    <div>
      <h2>New Contact Form Submission</h2>
      <p>
        <strong>Name:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Subject:</strong> {subject}
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <p>{message}</p>
      <p>
        <strong>Subscribed to newsletter:</strong> {agreeToTerms ? "Yes" : "No"}
      </p>
    </div>
  );
}
