import Link from "next/link";

export default function MembershipSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-primary-50">
      <h1 className="text-4xl font-bold text-primary-600 mb-4">
        Application Submitted!
      </h1>
      <p className="text-lg text-secondary-700 mb-6 max-w-xl">
        Thank you for your interest in{" "}
        <span className="font-semibold">The Brotherhood Alliance</span>. Your
        membership application has been submitted successfully. We will be in
        touch shortly.
      </p>
      <Link
        href="/"
        className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
      >
        Return to homepage
      </Link>
    </div>
  );
}
