import React from "react";
import { format, startOfWeek, addDays, getHours } from "date-fns";

interface Event {
  id: number;
  title: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  day: number;       // 0 = Sunday, 1 = Monday, etc.
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 0 });

  // Generate labels for the time slots
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  // Render the weekly grid
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfWeekDate, i));

  return (
    <div className="flex h-screen">
      {/* Sidebar for time slots */}
      <div className="w-16 bg-gray-100 border-r">
        {timeSlots.map((time) => (
          <div key={time} className="h-16 flex items-center justify-center text-sm">
            {time}
          </div>
        ))}
      </div>

      {/* Main calendar grid */}
      <div className="flex-1 grid grid-cols-7">
        {days.map((day, index) => (
          <div key={index} className="border-r last:border-r-0">
            {/* Header with day and date */}
            <div className="text-center py-2 border-b bg-gray-200">
              <div>{format(day, "EEEE")}</div>
              <div className="text-sm">{format(day, "MMM d")}</div>
            </div>

            {/* Time slot container */}
            <div className="h-full relative">
              {timeSlots.map((_, timeIndex) => (
                <div
                  key={timeIndex}
                  className="h-16 border-t border-gray-300"
                />
              ))}

              {/* Render events */}
              {events
                .filter((event) => event.day === index)
                .map((event) => {
                  const eventStartHour = getHours(new Date(event.startTime));
                  const eventEndHour = getHours(new Date(event.endTime));
                  const eventDuration = eventEndHour - eventStartHour;

                  return (
                    <div
                      key={event.id}
                      className="absolute bg-blue-500 text-white rounded-lg p-1 text-xs"
                      style={{
                        top: `${eventStartHour * 4}rem`,
                        height: `${eventDuration * 4}rem`,
                        left: "10%",
                        right: "10%",
                      }}
                    >
                      {event.title}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
