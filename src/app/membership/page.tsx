"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import { MembershipApplication } from "../../types/index";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import CheckCircleIcon from "@/components/icons/check-circle-icon";

const MembershipPage: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MembershipApplication>();

  const onSubmit = async (data: MembershipApplication) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/applications/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
        alert("Submission failed: " + (errorData.message || "Unknown error"));
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      router.replace("/membership/success");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const benefits = [
    "Access to exclusive events and gatherings",
    "Mentorship opportunities with experienced members",
    "Professional networking and development",
    "Community service and outreach programs",
    "Personal growth workshops and seminars",
    "Lifelong brotherhood and support network",
  ];

  const requirements = [
    "Must be invited by a current member or recommended by leadership",
    "Commitment to our core values and principles",
    "Willingness to participate actively in brotherhood activities",
    "Background check and character references required",
    "Attendance at orientation and probationary period",
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Submit Application",
      description: "Complete the membership application form below",
    },
    {
      step: 2,
      title: "Review Process",
      description: "Leadership reviews your application and references",
    },
    {
      step: 3,
      title: "Interview",
      description: "Meet with current members for a formal interview",
    },
    {
      step: 4,
      title: "Decision",
      description: "Receive notification of acceptance and next steps",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-50">
      <Header />
      <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction Banner */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary-900 mb-6">
            Join Our Brotherhood
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Membership in The Brotherhood Alliance is by invitation only. We
            seek men of character who are committed to personal growth,
            community service, and authentic brotherhood.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            {/* Why Join */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Why Join?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon />
                    <span className="text-secondary-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Requirements
              </h2>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon />
                    <span className="text-secondary-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Application Process */}
            <section>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Application Process
              </h2>
              <div className="space-y-6">
                {applicationSteps.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {item.step}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {item.title}
                      </h3>
                      <p className="text-secondary-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Membership Application
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                value={""}
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full name is required" })}
                error={errors.fullName?.message}
              />

              <Input
                label="Email Address"
                type="email"
                value={""}
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
              />

              <Input
                label="Phone Number"
                type="tel"
                value={""}
                placeholder="Enter your phone number"
                {...register("phone", { required: "Phone number is required" })}
                error={errors.phone?.message}
              />

              <TextArea
                label="Why do you want to join The Brotherhood Alliance?"
                rows={4}
                placeholder="Share your motivation and reasons for wanting to join..."
                {...register("motivation", {
                  required: "Please share your motivation",
                  minLength: {
                    value: 50,
                    message: "Please provide at least 50 characters",
                  },
                })}
                error={errors.motivation?.message}
                helperText="Minimum 50 characters"
              />

              <Input
                label="Referral (Required)"
                type="text"
                value={""}
                placeholder="Name of the member who referred you"
                {...register("referral")}
                error={errors.referral?.message}
                
              />

              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-md text-secondary-600 font-sans">
                Already a member?
                <Link
                  href="/member-portal"
                  className="text-primary-600 hover:underline font-sans hover:text-primary-700 ml-2"
                >
                  Click here to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;