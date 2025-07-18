import React from "react";
import Link from "next/link";
import Button from "../components/ui/Button";
import Header from "@/components/layout/Header";

const HomePage: React.FC = () => {
  const coreValues = [
    {
      title: "Loyalty",
      description: "Unwavering commitment to our brotherhood and principles",
    },
    {
      title: "Integrity",
      description: "Acting with honor and authenticity in all we do",
    },
    {
      title: "Brotherhood",
      description:
        "Supporting and uplifting one another through all challenges",
    },
    {
      title: "Growth",
      description: "Continuous improvement and personal development",
    },
    {
      title: "Excellence",
      description: "Striving for the highest standards in everything",
    },
    {
      title: "Legacy",
      description: "Building something lasting for future generations",
    },
  ];

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              THE BROTHERHOOD ALLIANCE
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-100">
              Building stronger communities through brotherhood, integrity, and
              shared values. Join us in our mission to create lasting positive
              impact.
            </p>
            <Button size="lg" variant="secondary">
              Discover Our Mission
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              About Our Alliance
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              The Brotherhood Alliance was founded on the principles of mutual
              support, personal growth, and community service. We believe that
              through authentic relationships and shared commitment to
              excellence, we can create positive change in our communities and
              beyond.
            </p>
            <Link href="/about">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-secondary-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-secondary-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Join Our Brotherhood?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Take the first step towards becoming part of something greater
              than yourself
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/membership">
                <Button size="lg" variant="secondary">
                  Become a Member
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Attend an Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
