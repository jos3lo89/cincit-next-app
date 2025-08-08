import { getSettings } from "@/lib/settings";
import ScheduleTimeline from "../components/ScheduleTimeline";
import ComingSoon from "../components/ComingSoon";

const SchedulePage = async () => {
  const mostrar = await getSettings("showSpeakersPage", false);

  return (
    <>
      <section className="pt-10  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient">Cronograma</span>
            <br />
            <span className="text-foreground">CINCIT 2025</span>
          </h1>
          {mostrar && (
            <p
              className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Descubre el programa completo de ponencias, talleres y actividades
              durante los tres días del evento.
            </p>
          )}
        </div>
      </section>
      {mostrar ? <ScheduleTimeline /> : <ComingSoon />}
    </>
  );
};
export default SchedulePage;
