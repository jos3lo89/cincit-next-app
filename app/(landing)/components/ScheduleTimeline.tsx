import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimelineItem from "./TimeLineItem";
import { eventDays, scheduleData } from "@/data/timeLine.data";

const ScheduleTimeline = () => {
  return (
    <section className="py-8 md:py-16 px-4">
      <Tabs defaultValue="dia1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-4xl mx-auto mb-12 h-auto bg-card/50 p-2">
          {eventDays.map((day, index) => (
            <TabsTrigger
              key={index}
              value={`dia${index + 1}`}
              className="flex flex-col p-4 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-200 cursor-pointer"
            >
              <span className="font-bold text-base">{day.day}</span>
              <span className="text-xs md:text-sm opacity-90 mt-1 break-words text-center">
                {day.date}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(scheduleData).map((day) => (
          <TabsContent key={day} value={day}>
            <div className="relative flex flex-col items-center gap-8 max-w-6xl mx-auto">
              {/* Vertical Line - Desktop Only */}
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-border/30 hidden md:block"></div>

              {scheduleData[day].map((event, index) => (
                <TimelineItem
                  key={`${day}-${index}`}
                  event={event}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default ScheduleTimeline;
