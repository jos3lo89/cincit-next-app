import ScheduleTimeline from "../components/ScheduleTimeline";
import ComingSoon from "../components/ComingSoon";

const SchedulePage = async () => {
  const show = true;

  return (
    <>
      <section className="text-center pt-10  px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          <span className="text-gradient">Cronograma</span>
        </h2>
      </section>
      {show ? <ScheduleTimeline /> : <ComingSoon />}
    </>
  );
};
export default SchedulePage;
