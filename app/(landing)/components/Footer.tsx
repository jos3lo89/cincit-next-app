import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const CONTACT_INFO = [
  { icon: Mail, text: "info@cincit.pe", type: "email" },
  { icon: Phone, text: "+51 999 888 777", type: "phone" },
  { icon: MapPin, text: "Andahuaylas, Apurimac, Perú", type: "location" },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "X" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const NAVIGATION_LINKS = [
  { name: "Cronograma", href: "/schedule" },
  { name: "Ubicación", href: "#ubicacion" },
  { name: "Ingresar", href: "/signin" },
];

const PARTNER_LOGOS = [
  { src: "/logoepis.webp", alt: "Logo EPIS", name: "EPIS" },
  { src: "/logounajma.webp", alt: "Logo UNAJMA", name: "UNAJMA" },
];

const ContactInfo = () => (
  <div className="space-y-4">
    <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-6">
      CINCIT
    </h3>
    <div className="space-y-3">
      {CONTACT_INFO.map((contact, index) => (
        <div
          key={index}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <contact.icon className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="break-all">{contact.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const NavigationSection = () => (
  <div className="text-center">
    <nav>
      <ul className="space-y-3">
        {NAVIGATION_LINKS.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm md:text-base"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const PartnerLogos = () => (
  <div className="flex flex-col items-center space-y-4">
    <div className="flex flex-wrap justify-center items-center gap-6">
      {PARTNER_LOGOS.map((logo) => (
        <div
          key={logo.name}
          className="flex-shrink-0 hover:scale-105 transition-transform duration-300"
        >
          <img
            src={logo.src || "/placeholder.svg"}
            alt={logo.alt}
            className="w-24 md:w-32 h-auto object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
);

const SocialMedia = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
    <span className="text-sm text-muted-foreground font-medium">Síguenos:</span>
    <div className="flex items-center gap-3">
      {SOCIAL_LINKS.map((social) => (
        <Button
          key={social.label}
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border-border/30 hover:border-primary/50 hover:bg-card-hover transition-all duration-300 bg-transparent hover:scale-110"
          asChild
        >
          <a
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <social.icon className="h-4 w-4" />
          </a>
        </Button>
      ))}
    </div>
  </div>
);

const Copyright = () => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
    <p className="text-sm text-muted-foreground">
      © 2025 CINCIT. Todos los derechos reservados.
    </p>
    <div className="flex items-center gap-2">
      <a
        href="https://evilain.site"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-105 transition-transform"
      >
        <Badge variant="outline" className="hover:border-primary/50">
          {"</>"} gothangelsinner
        </Badge>
      </a>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-background-secondary to-background border-t border-border/20 mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-4">
              <ContactInfo />
            </div>

            <div className="flex justify-center">
              <NavigationSection />
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <PartnerLogos />
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-border/20">
          <SocialMedia />
        </div>

        <div className="py-6 border-t border-border/20">
          <Copyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
