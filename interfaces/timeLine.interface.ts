export interface Speaker {
  name: string;
  title: string;
  institution: string;
  orcid: string;
  specialty: string;
  topic: string;
  image: string;
}

export interface ScheduleEvent {
  time: string;
  type: "ponencia" | "talleres" | "ceremonia" | "descanso";
  title: string;
  description: string;
  speaker?: Speaker;
  location: string;
}
