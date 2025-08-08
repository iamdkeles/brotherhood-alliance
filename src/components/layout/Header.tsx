"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Membership", href: "/membership" },
    { name: "Programs", href: "/programs" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => mounted && pathname === path;

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center"
              onClick={handleMobileMenuClose}
            >
              <span className="text-xl font-bold text-primary-600">
                THE BROTHERHOOD ALLIANCE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "border-b-2 border-primary-500 text-secondary-900"
                    : "text-secondary-500 hover:text-secondary-700 hover:border-b-2 hover:border-secondary-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Member Portal Button - Fixed to use /member-portal */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login Portal
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 pl-3 pr-4 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-primary-50 border-l-4 border-primary-500 text-primary-700"
                      : "text-secondary-500 hover:bg-secondary-50 hover:text-secondary-700"
                  }`}
                  onClick={handleMobileMenuClose}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="block py-2 pl-3 pr-4 text-base font-medium text-secondary-500 hover:bg-secondary-50 hover:text-secondary-700 transition-colors duration-200"
                onClick={handleMobileMenuClose}
              >
                Login Portal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
