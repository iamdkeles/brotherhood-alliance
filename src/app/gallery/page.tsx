"use client";

import Header from "@/components/layout/Header";
import Image from "next/image";
import React, { useState } from "react";

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Annual Brotherhood Retreat 2023",
      category: "Events",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Community Service Day",
      category: "Service",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Leadership Workshop",
      category: "Education",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "New Member Initiation",
      category: "Ceremonies",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Monthly Gathering",
      category: "Meetings",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Mentorship Program",
      category: "Programs",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Charity Fundraiser",
      category: "Service",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Brotherhood Dinner",
      category: "Social",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Outdoor Adventure",
      category: "Recreation",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Guest Speaker Event",
      category: "Education",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Volunteer Recognition",
      category: "Awards",
    },
    {
      src: "https://via.placeholder.com/400x300",
      caption: "Holiday Celebration",
      category: "Social",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-50">
      <Header />
      <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-6">
            Gallery
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Capturing moments of brotherhood, service, and growth. These images
            tell the story of our community and the bonds we&apos;ve built
            together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.caption}
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-sm mb-1">
                    {image.caption}
                  </h3>
                  <span className="text-xs bg-primary-600 px-2 py-1 rounded">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for full-size image */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={selectedImage}
                alt="Selected gallery image"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
