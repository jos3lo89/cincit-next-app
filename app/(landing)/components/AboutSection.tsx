import { Brain, Target, Users, Zap } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Inteligencia Artificial",
      description:
        "Exploramos las últimas tendencias y aplicaciones de la IA en diferentes industrias.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Users,
      title: "Networking",
      description:
        "Conecta con profesionales, investigadores y líderes tecnológicos del país.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: Zap,
      title: "Innovación",
      description:
        "Descubre las tecnologías emergentes que están transformando el futuro.",
      gradient: "from-accent to-primary",
    },
    {
      icon: Target,
      title: "Casos Prácticos",
      description:
        "Aprende de implementaciones reales y casos de éxito en el mercado peruano.",
      gradient: "from-primary to-accent",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Sobre</span>{" "}
            <span className="text-foreground">CINCIT</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CINCIT es el evento tecnológico más importante del año, donde
            convergen las mentes más brillantes para compartir conocimientos
            sobre inteligencia artificial y avances tecnológicos que están
            moldeando nuestro futuro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 rounded-2xl hover-glow group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient transition-all duration-300">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "+300", label: "Participantes" },
            { number: "10+", label: "Ponentes Expertos" },
            { number: "3", label: "Días de Evento" },
            { number: "10+", label: "Talleres Prácticos" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
