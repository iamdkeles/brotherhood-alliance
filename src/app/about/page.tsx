import Header from "@/components/layout/Header";
import Image from "next/image";
import React from "react";

const AboutPage: React.FC = () => {
  const leadership = [
    {
      name: "Prince Micky",
      title: "President",
      bio: "Founding member with over 15 years of leadership experience in community building.",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Oluwadamilare Olurombi",
      title: "Secretary",
      bio: "Oversees member development and ensures adherence to our core principles.",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Kenil Limited",
      title: "Treasurer",
      bio: "Maintains our records and coordinates communication across all chapters.",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Oladele E Olabiyi",
      title: "Adviser",
      bio: "Maintains our records and coordinates communication across all chapters.",
      image: "https://picsum.photos/200/200",
    },
    {
      name: "Oluwanice",
      title: "P.R.O",
      bio: "Maintains our records and coordinates communication across all chapters.",
      image: "https://picsum.photos/200/200",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-50">
      <Header />
      <div className="mx-auto py-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Our Story */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-secondary-900 mb-8 text-center">
            Our Story
          </h1>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <p className="text-lg text-secondary-600 leading-relaxed">
              The Brotherhood Alliance was born from a simple yet powerful idea:
              that men united by shared values and mutual support can create
              extraordinary positive change in their communities and the world
              at large. Founded in 2025 by a group of like-minded individuals
              who recognized the need for authentic brotherhood in modern
              society, our organization has grown from a small local gathering
              to a nationwide network of dedicated members.
            </p>
            <p className="text-lg text-secondary-600 leading-relaxed mt-6">
              What started as informal meetups in coffee shops and community
              centers has evolved into a structured organization with chapters
              across the country. Yet we&apos;ve never lost sight of our
              founding principle: that genuine relationships built on trust,
              respect, and shared commitment to growth are the foundation of
              lasting positive impact.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16 bg-gradient-to-br from-slate-50 to-sky-50 rounded-lg p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="border-r-4 border-sky-100">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-secondary-600 leading-relaxed">
                To foster authentic brotherhood among men through shared values,
                mutual support, and commitment to personal growth. We create
                environments where men can develop their character, pursue
                excellence, and contribute meaningfully to their communities.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-secondary-600 leading-relaxed">
                A world where men are connected through genuine brotherhood,
                empowered to reach their full potential, and committed to
                leaving a positive legacy for future generations. We envision
                communities strengthened by the character and service of our
                members.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section>
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <Image
                    width={200}
                    height={200}
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {leader.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {leader.title}
                </p>
                <p className="text-secondary-600">{leader.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
