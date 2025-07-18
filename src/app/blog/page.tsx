import React from "react";
import Link from "next/link";
import { BlogPost } from "../../types";

const BlogPage: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Power of Brotherhood in Modern Society",
      preview:
        "Exploring how authentic male friendships and support networks contribute to personal growth and community strength.",
      date: "2024-01-15",
      author: "Marcus Thompson",
    },
    {
      id: "2",
      title: "Leadership Lessons from Our Recent Retreat",
      preview:
        "Key insights and takeaways from our leadership development weekend that every member should consider.",
      date: "2024-01-10",
      author: "David Rodriguez",
    },
    {
      id: "3",
      title: "Building Character Through Service",
      preview:
        "How our community outreach programs shape not only the communities we serve but also the men who serve.",
      date: "2024-01-05",
      author: "James Wilson",
    },
    {
      id: "4",
      title: "Mentorship: A Two-Way Street",
      preview:
        "Understanding how both mentors and mentees benefit from our structured mentorship program.",
      date: "2023-12-28",
      author: "Robert Johnson",
    },
    {
      id: "5",
      title: "The Evolution of Brotherhood Alliance",
      preview:
        "A look back at our journey from a small group to a nationwide organization and what lies ahead.",
      date: "2023-12-20",
      author: "Marcus Thompson",
    },
    {
      id: "6",
      title: "Values in Action: Real Stories from Members",
      preview:
        "Personal accounts of how our core values have guided members through life challenges.",
      date: "2023-12-15",
      author: "Michael Brown",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="py-12 bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-6">
            Insights & Reflections
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Thoughts, experiences, and wisdom from our brotherhood. Read about
            leadership, personal growth, community service, and the journey of
            authentic brotherhood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-secondary-500 mb-2">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mx-2">•</span>
                  <span>By {post.author}</span>
                </div>

                <h2 className="text-xl font-bold text-secondary-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {post.preview}
                </p>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Read More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <nav
            className="inline-flex rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button className="relative inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium text-secondary-500 bg-white hover:bg-secondary-50 rounded-l-md">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border-t border-b border-secondary-300 bg-primary-600 text-sm font-medium text-white">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium text-secondary-700 bg-white hover:bg-secondary-50">
              2
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium text-secondary-700 bg-white hover:bg-secondary-50">
              3
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium text-secondary-500 bg-white hover:bg-secondary-50 rounded-r-md">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
