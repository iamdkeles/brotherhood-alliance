"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import { ContactForm } from "../../types";
import Header from "@/components/layout/Header";

const ContactPage: React.FC = () => {
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setAlert(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: "Your message was sent successfully!",
        });
        reset(); // Reset form after successful submission
      } else {
        setAlert({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setAlert({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-50">
      <Header />
      <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Have questions about The Brotherhood Alliance? We&apos;d love to
            hear from you. Reach out and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Alert Message */}
        {alert && (
          <div
            className={`mb-6 p-4 rounded-md ${
              alert.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {alert.type === "success" ? (
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-secondary-900">Address</h3>
                  <p className="text-secondary-600">
                    123 Brotherhood Street
                    <br />
                    Unity City, UC 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-secondary-900">Phone</h3>
                  <p className="text-secondary-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-secondary-900">Email</h3>
                  <p className="text-secondary-600">
                    info@brotherhoodalliance.org
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-primary-600 mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-secondary-900">
                    Office Hours
                  </h3>
                  <p className="text-secondary-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Location
              </h3>
              <div className="bg-secondary-100 rounded-lg h-64 flex items-center justify-center cursor-pointer hover:bg-secondary-200 transition-colors">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-secondary-400 mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-secondary-600">Interactive Map</p>
                  <p className="text-sm text-secondary-500">
                    Click to view full map
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="First Name"
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    error={errors.firstName?.message}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Input
                    label="Last Name"
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                    error={errors.lastName?.message}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <Input
                label="Email Address"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
                placeholder="Enter your email address"
              />

              <Input
                label="Phone Number (Optional)"
                type="tel"
                {...register("phone")}
                placeholder="Enter your phone number"
              />

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Subject
                </label>
                <select
                  {...register("subject", {
                    required: "Please select a subject",
                  })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="membership">Membership Information</option>
                  <option value="events">Events & Programs</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="support">Support & Feedback</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <TextArea
                label="Message"
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
                error={errors.message?.message}
                placeholder="Tell us how we can help you..."
                rows={5}
              />

              <div className="flex items-start">
                <input
                  type="checkbox"
                  {...register("agreeToTerms", {
                    required: "You must agree to our privacy policy",
                  })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded mt-1"
                />
                <label className="ml-2 text-sm text-secondary-600">
                  I agree to the{" "}
                  <a
                    href="/privacy"
                    className="text-primary-600 hover:text-primary-500 underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and consent to being contacted by The Brotherhood Alliance.
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">
                  {errors.agreeToTerms.message}
                </p>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-primary-50 rounded-lg">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Questions about Membership?
              </h3>
              <p className="text-primary-700 mb-3">
                If you&apos;re interested in joining The Brotherhood Alliance,
                we&apos;d love to learn more about you.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/membership")}
              >
                Learn About Membership
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
