import React, { useEffect, useState } from "react";
import { format, startOfWeek, addDays, getHours, getMinutes } from "date-fns";
import { getCardDetailsInWeekAPI } from "../../services/Card/Card.service";
import { vi } from "date-fns/locale";

const Calendar: React.FC = () => {
  const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 0 });
  const [card, setCard] = useState<any[]>([]);

  const fetchCardDetailsInWeek = async () => {
    try {
      const response = await getCardDetailsInWeekAPI();
      setCard(response);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchCardDetailsInWeek();
  }, []);

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const days = Array.from({ length: 7 }, (_, i) => ({
    date: addDays(startOfWeekDate, i),
    dayName: format(addDays(startOfWeekDate, i), "EEEE", { locale: vi }),
  }));

  const splitEventAcrossDays = (event: any, day: Date) => {
    const eventStart = new Date(event.start_date);
    const eventEnd = new Date(event.end_date);
    const dayStart = new Date(format(day, "yyyy-MM-dd") + "T00:00:00");
    const dayEnd = new Date(format(day, "yyyy-MM-dd") + "T23:59:59");

    if (eventEnd < dayStart || eventStart > dayEnd) {
      return null;
    }

    const displayStart = eventStart > dayStart ? eventStart : dayStart;
    const displayEnd = eventEnd < dayEnd ? eventEnd : dayEnd;

    const duration = (displayEnd.getTime() - displayStart.getTime()) / (1000 * 60);
    const startHour = getHours(displayStart) + getMinutes(displayStart) / 60;

    return {
      duration,
      startHour,
      name: event.name,
      card_id: event.card_id,
      startTime: displayStart.getTime(),
      endTime: displayEnd.getTime(),
    };
  };

  const calculateEventPositions = (events: any[]) => {
    const sortedEvents = events.sort((a, b) => a.startTime - b.startTime);
    const positionedEvents: any[] = [];

    sortedEvents.forEach((event, index) => {
      let position = 0;
      let maxOverlap = 1;

      // Kiểm tra chồng lấn
      for (let i = 0; i < index; i++) {
        const prevEvent = sortedEvents[i];
        if (
          event.startTime < prevEvent.endTime &&
          event.endTime > prevEvent.startTime
        ) {
          position++;
        }
      }

      // Tính số lượng chồng lấn tối đa
      for (let i = 0; i < sortedEvents.length; i++) {
        let overlap = 1;
        const currentEvent = sortedEvents[i];
        for (let j = 0; j < sortedEvents.length; j++) {
          if (i === j) continue;
          const otherEvent = sortedEvents[j];
          if (
            currentEvent.startTime < otherEvent.endTime &&
            currentEvent.endTime > otherEvent.startTime
          ) {
            overlap++;
          }
        }
        maxOverlap = Math.max(maxOverlap, overlap);
      }

      // Điều chỉnh chiều rộng và vị trí
      const width = 90 / Math.max(maxOverlap, 1); // Đảm bảo không chia 0
      const left = 5 + position * width;

      positionedEvents.push({
        ...event,
        left: `${left}%`,
        width: `${width}%`,
        color: `hsl(${Math.random() * 360}, 70%, 80%)`, // Màu ngẫu nhiên
      });
    });

    return positionedEvents;
  };

  return (
    <div className="flex h-screen">
      <div className="w-16 bg-gray-100 border-r">
        {timeSlots.map((time) => (
          <div key={time} className="h-16 flex items-center justify-center text-sm">
            {time}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7">
        {days.map((day, index) => {
          const eventsForDay = card
            .map((event) => splitEventAcrossDays(event, day.date))
            .filter((event) => event !== null);

          const positionedEvents = calculateEventPositions(eventsForDay);

          return (
            <div key={index} className="border-r last:border-r-0">
              <div className="text-center py-2 border-b bg-gray-200">
                <div>{format(day.date, "EEEE", { locale: vi })}</div>
                <div className="text-sm">{format(day.date, "d MMM", { locale: vi })}</div>
              </div>

              <div className="h-full relative">
                {timeSlots.map((_, timeIndex) => (
                  <div key={timeIndex} className="h-16 border-t border-gray-300" />
                ))}

                {positionedEvents.map((event: any) => (
                  <div
                    key={event.card_id}
                    className="absolute text-white rounded-lg p-1 text-xs overflow-hidden whitespace-nowrap"
                    style={{
                      top: `${event.startHour * 4}rem`,
                      height: `${(event.duration / 60) * 4}rem`,
                      left: event.left,
                      width: event.width,
                      backgroundColor: event.color,
                    }}
                  >
                    {event.name.length > 10 ? `${event.name.substring(0, 10)}...` : event.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;