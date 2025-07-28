import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import HeroSection from "./components/heroSection";
// import RegistrationForm from "./components/RegistrationForm";
import VerificationForm from "./components/VerificationForm";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      {/* <RegistrationForm /> */}
      <VerificationForm />
      <Footer />
    </>
  );
};

export default HomePage;
