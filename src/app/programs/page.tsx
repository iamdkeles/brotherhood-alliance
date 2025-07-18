import React from "react";
import Button from "../../components/ui/Button";

const ProgramsPage: React.FC = () => {
  const featuredPrograms = [
    {
      title: "Mentorship Program",
      description:
        "Connect with experienced members for guidance in personal and professional development.",
      icon: "👥",
      features: [
        "One-on-one mentoring",
        "Group sessions",
        "Goal setting",
        "Career guidance",
      ],
    },
    {
      title: "Leadership Retreats",
      description:
        "Intensive weekend retreats focused on developing leadership skills and character.",
      icon: "🏔️",
      features: [
        "Weekend getaways",
        "Leadership workshops",
        "Team building",
        "Self-reflection",
      ],
    },
    {
      title: "Community Outreach",
      description:
        "Serve our communities through organized volunteer work and charitable initiatives.",
      icon: "🤝",
      features: [
        "Volunteer opportunities",
        "Charity events",
        "Community partnerships",
        "Social impact",
      ],
    },
    {
      title: "Personal Growth",
      description:
        "Workshops and seminars focused on personal development and life skills.",
      icon: "📈",
      features: [
        "Life coaching",
        "Skill development",
        "Wellness programs",
        "Goal achievement",
      ],
    },
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary-900 mb-6">
            Our Programs & Initiatives
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            We offer a comprehensive range of programs designed to foster
            personal growth, leadership development, and community engagement
            among our members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredPrograms.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                {program.title}
              </h3>
              <p className="text-secondary-600 mb-6">{program.description}</p>

              <ul className="space-y-2 mb-6">
                {program.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-secondary-600"
                  >
                    <svg
                      className="w-5 h-5 text-primary-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg">View All Programs</Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
