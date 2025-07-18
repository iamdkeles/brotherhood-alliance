import React from "react";
import Button from "../../components/ui/Button";
import { Event } from "../../types/index";
import Header from "@/components/layout/Header";

const EventsPage: React.FC = () => {
  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "Monthly Brotherhood Gathering",
      date: "2024-02-15",
      type: "Meeting",
      location: "Community Center, Downtown",
    },
    {
      id: "2",
      title: "Leadership Development Workshop",
      date: "2024-02-22",
      type: "Workshop",
      location: "Conference Room A, Main Office",
    },
    {
      id: "3",
      title: "Community Service Day",
      date: "2024-03-01",
      type: "Service",
      location: "Local Food Bank",
    },
    {
      id: "4",
      title: "Annual Brotherhood Retreat",
      date: "2024-03-15",
      type: "Retreat",
      location: "Mountain Lodge Resort",
    },
    {
      id: "5",
      title: "New Member Orientation",
      date: "2024-03-22",
      type: "Orientation",
      location: "Main Office Conference Room",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      Meeting: "bg-blue-100 text-blue-800",
      Workshop: "bg-green-100 text-green-800",
      Service: "bg-purple-100 text-purple-800",
      Retreat: "bg-orange-100 text-orange-800",
      Orientation: "bg-gray-100 text-gray-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-50">
      <Header />
      <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Stay connected with your brothers through our regular events,
            workshops, and gatherings. All events are designed to strengthen our
            bonds and support our collective growth.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">
              Event Calendar
            </h2>
          </div>

          <div className="divide-y divide-secondary-200">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="px-6 py-4 hover:bg-secondary-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {event.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(
                          event.type
                        )}`}
                      >
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-secondary-600">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">RSVP</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-secondary-600 mb-6">
            Don&apos;t see an event that interests you? We&apos;re always open
            to new ideas and member-led initiatives.
          </p>
          <Button variant="outline">Suggest an Event</Button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
