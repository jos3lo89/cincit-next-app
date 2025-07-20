import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const footerLinks = [
    {
      title: "Evento",
      links: [
        { name: "Cronograma", href: "/schedule" },
        { name: "Ponentes", href: "/" },
        // { name: "Talleres", href: "#talleres" },
        { name: "Ubicación", href: "#ubicacion" },
      ],
    },
    {
      title: "Información",
      links: [
        { name: "Sobre CINCIT", href: "#about" },
        { name: "Patrocinadores", href: "#sponsors" },
        { name: "Prensa", href: "#press" },
        { name: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Soporte",
      links: [
        { name: "Contáctanos", href: "#contact" },
        { name: "Ayuda", href: "#help" },
        { name: "Términos", href: "#terms" },
        { name: "Privacidad", href: "#privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-background-secondary to-background border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-3xl font-bold text-gradient mb-4">CINCIT</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                El evento tecnológico más importante del año, donde la
                innovación y la inteligencia artificial se encuentran.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@cincit.pe</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+51 999 888 777</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Lima, Perú</span>
                </div>
              </div>
            </div>

            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground mr-2">
                Síguenos:
              </span>
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full border-border/30 hover:border-primary/50 hover:bg-card-hover transition-all duration-300"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 CINCIT. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <p className="text-sm text-muted-foreground"> {"</>"} 33</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
