import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScheduleEvent } from "@/interfaces/timeLine.interface";
import { cn } from "@/lib/utils";
import {
  Building,
  Clock,
  Coffee,
  GraduationCap,
  MapPin,
  Mic,
  User,
} from "lucide-react";

const EventIcon = ({ type }: { type: ScheduleEvent["type"] }) => {
  switch (type) {
    case "ponencia":
      return <Mic className="h-5 w-5 text-primary" />;
    case "talleres":
      return <User className="h-5 w-5 text-green-500" />;
    case "ceremonia":
      return <GraduationCap className="h-5 w-5 text-purple-500" />;
    case "descanso":
      return <Coffee className="h-5 w-5 text-amber-500" />;
    default:
      return null;
  }
};
const getEventTypeColor = (type: ScheduleEvent["type"]) => {
  switch (type) {
    case "ponencia":
      return "border-primary bg-primary/5";
    case "talleres":
      return "border-green-500 bg-green-500/5";
    case "ceremonia":
      return "border-purple-500 bg-purple-500/5";
    case "descanso":
      return "border-amber-500 bg-amber-500/5";
    default:
      return "border-border bg-card";
  }
};

const TimelineItem = ({
  event,
  index,
}: {
  event: ScheduleEvent;
  index: number;
}) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className="relative flex items-center w-full">
      {/* Desktop Layout */}
      <div
        className={cn(
          "hidden md:flex w-1/2",
          isReversed ? "justify-start" : "justify-end pr-8"
        )}
      >
        {!isReversed && (
          <Card
            className={cn(
              "w-full max-w-lg animate-fade-in-up",
              getEventTypeColor(event.type)
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
                <MapPin className="h-4 w-4 ml-2" />
                <span>{event.location}</span>
              </div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="text-sm">
                {event.description}
              </CardDescription>
            </CardHeader>
            {event.speaker && (
              <CardContent className="pt-0">
                <div className="flex items-start gap-4">
                  <img
                    src={event.speaker.image || "/placeholder.svg"}
                    alt={event.speaker.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-primary mb-1">
                      {event.speaker.name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {event.speaker.title}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        <span className="truncate">
                          {event.speaker.institution}
                        </span>
                      </div>
                      <p className="text-xs">
                        <strong>Especialidad:</strong> {event.speaker.specialty}
                      </p>
                      <p className="text-xs">
                        <strong>Enfoque:</strong> {event.speaker.topic}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        )}
      </div>

      {/* Timeline Center - Desktop Only */}
      <div className="relative z-10 flex-col items-center flex-shrink-0 hidden md:flex">
        <div
          className={cn(
            "flex flex-col items-center justify-center h-20 w-20 rounded-full border-4 shadow-lg",
            getEventTypeColor(event.type)
          )}
        >
          <EventIcon type={event.type} />
          <p className="text-xs font-bold mt-1 text-center leading-tight">
            {event.time.split(" - ")[0]}
          </p>
        </div>
      </div>

      {/* Desktop Right Side */}
      <div
        className={cn(
          "hidden md:flex w-1/2",
          isReversed ? "pl-8" : "justify-start"
        )}
      >
        {isReversed && (
          <Card
            className={cn(
              "w-full max-w-lg animate-fade-in-up",
              getEventTypeColor(event.type)
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
                <MapPin className="h-4 w-4 ml-2" />
                <span>{event.location}</span>
              </div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="text-sm">
                {event.description}
              </CardDescription>
            </CardHeader>
            {event.speaker && (
              <CardContent className="pt-0">
                <div className="flex items-start gap-4">
                  <img
                    src={event.speaker.image || "/placeholder.svg"}
                    alt={event.speaker.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-primary mb-1">
                      {event.speaker.name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {event.speaker.title}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        <span className="truncate">
                          {event.speaker.institution}
                        </span>
                      </div>
                      <p className="text-xs">
                        <strong>Especialidad:</strong> {event.speaker.specialty}
                      </p>
                      <p className="text-xs">
                        <strong>Enfoque:</strong> {event.speaker.topic}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        )}
      </div>

      {/* Mobile Layout - Bola encima del recuadro */}
      <div className="md:hidden w-full flex flex-col items-center">
        {/* Bola de tiempo centrada */}
        <div className="relative z-10 flex flex-col items-center flex-shrink-0 mb-4">
          <div
            className={cn(
              "flex flex-col items-center justify-center h-16 w-16 rounded-full border-4 shadow-lg",
              getEventTypeColor(event.type)
            )}
          >
            <EventIcon type={event.type} />
            <p className="text-xs font-bold mt-1 text-center leading-tight">
              {event.time.split(" - ")[0]}
            </p>
          </div>
        </div>

        {/* Recuadro de información ocupando todo el ancho */}
        <Card className={cn("w-full", getEventTypeColor(event.type))}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="text-sm">
              {event.description}
            </CardDescription>
          </CardHeader>
          {event.speaker && (
            <CardContent className="pt-0">
              <div className="flex items-start gap-4">
                <img
                  src={event.speaker.image || "/placeholder.svg"}
                  alt={event.speaker.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-primary mb-1">
                    {event.speaker.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {event.speaker.title}
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      <span className="truncate">
                        {event.speaker.institution}
                      </span>
                    </div>
                    <p className="text-xs">
                      <strong>ORCID:</strong> {event.speaker.orcid}
                    </p>
                    <p className="text-xs">
                      <strong>Especialidad:</strong> {event.speaker.specialty}
                    </p>
                    <p className="text-xs">
                      <strong>Enfoque:</strong> {event.speaker.topic}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TimelineItem;
