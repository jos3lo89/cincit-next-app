import { Button } from "@/components/ui/button";
import { Eye, Facebook, Instagram, Ticket, Twitter } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import Link from "next/link";
import MatrixText from "@/components/MatrixText";

const HeroSection = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "X" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <section className="min-h-screen pt-4 pb-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider">
                  <MatrixText text="CINCIT" />
                </h1>
              </div>

              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
                  <span className="text-gradient">Innovación & Tecnología</span>
                  <br />
                  <span className="text-gradient-secondary">del Futuro</span>
                </h2>
              </div>

              <p className="text-lg md:text-xl text-center max-w-full mx-auto lg:text-left text-muted-foreground leading-relaxed ">
                Únete a los expertos más destacados en{" "}
                <span className="text-primary font-semibold">
                  Inteligencia Artificial
                </span>{" "}
                y <span className=" font-semibold">avances tecnológicos.</span>
              </p>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-lg font-semibold text-muted-foreground">
                El evento comienza en:
              </h3>
              <CountdownTimer />
            </div>

            <div className="flex flex-col sm:flex-row gap-4  justify-center lg:justify-start ">
              <Button
                size="lg"
                className="bg-gradient-primary cursor-pointer hover:bg-gradient-secondary text-primary-foreground font-semibold px-8 py-4 rounded-xl shadow-glow-primary hover-glow transition-all duration-300"
              >
                <Ticket className=" h-5 w-5" />
                Aquire tu entrada
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 cursor-pointer text-foreground hover:bg-card-hover px-8 py-4 rounded-xl hover-scale transition-all duration-300"
                asChild
              >
                <Link href="/signin">
                  <Eye className=" h-5 w-5" />
                  Estado de inscripción
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-primary rounded-full animate-glow"></div>
                <span>15-17 Agosto 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-secondary rounded-full animate-glow"></div>
                <span>Apurimac, Perú</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-primary rounded-full animate-glow"></div>
                <span>+300 Participantes</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-fade-in-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-glow"></div>
              <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-secondary opacity-10 blur-2xl rounded-full animate-float"></div>

              <img
                src="/robot.webp"
                alt="CINCIT Robot Mascot"
                className="relative z-10 w-80 h-80 md:w-96 md:h-96 xl:w-[500px] xl:h-[500px] object-contain animate-float drop-shadow-2xl"
              />

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full opacity-60 animate-glow"></div>
              <div
                className="absolute bottom-10 -left-6 w-6 h-6 bg-gradient-secondary rounded-full opacity-40 animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute top-1/2 -right-8 w-4 h-4 bg-accent rounded-full opacity-50 animate-glow"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
