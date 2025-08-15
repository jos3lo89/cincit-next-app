import MyImage from "@/components/MyImage";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const CONTACT_INFO = [
  { icon: Mail, text: "info@cincit.pe", type: "email" },
  { icon: Phone, text: "+51 999 888 777", type: "phone" },
  { icon: MapPin, text: "Andahuaylas, Apurimac, Perú", type: "location" },
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
          className="flex-shrink-0 hover:scale-105 transition-transform duration-300 max-w-32"
        >
          <MyImage
            imagePath={logo.src}
            altText={logo.alt}
            height={300}
            width={400}
          />
        </div>
      ))}
    </div>
  </div>
);

const SocialMedia = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
    <span className="text-sm text-muted-foreground font-medium">Síguenos:</span>
    <div className="flex items-center gap-4">
      <a
        href={"#"}
        aria-label="facebook"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-105 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 256 256"
        >
          <path
            fill="#1877f2"
            d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
          />
          <path
            fill="#fff"
            d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
          />
        </svg>
      </a>
      <a
        href={"#"}
        aria-label="tiktok"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-105 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 256 290"
        >
          <path
            fill="#ff004f"
            d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53a67 67 0 0 1-13.918-1.456v37.413c-24.711 0-47.59-7.851-66.272-21.195v96.996c0 48.523-39.356 87.855-87.9 87.855c-18.113 0-34.949-5.473-48.934-14.86c15.962 16.313 38.222 26.432 62.848 26.432c48.548 0 87.905-39.332 87.905-87.857v-96.995zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898M69.673 225.607a40 40 0 0 1-8.203-24.33c0-22.192 18.001-40.186 40.21-40.186a40.3 40.3 0 0 1 12.197 1.883v-48.593c-4.61-.631-9.262-.9-13.912-.801v37.822a40.3 40.3 0 0 0-12.203-1.882c-22.208 0-40.208 17.992-40.208 40.187c0 15.694 8.997 29.281 22.119 35.9"
          />
          <path d="M175.803 92.849c18.683 13.344 41.56 21.195 66.272 21.195V76.631c-13.794-2.937-26.005-10.141-35.186-20.162c-15.715-9.802-27.038-25.972-30.358-44.898h-34.643v189.843c-.079 22.132-18.049 40.052-40.21 40.052c-13.058 0-24.66-6.221-32.007-15.86c-13.12-6.618-22.118-20.206-22.118-35.898c0-22.193 18-40.187 40.208-40.187c4.255 0 8.356.662 12.203 1.882v-37.822c-47.692.985-86.047 39.933-86.047 87.834c0 23.912 9.551 45.589 25.053 61.428c13.985 9.385 30.82 14.86 48.934 14.86c48.545 0 87.9-39.335 87.9-87.857z" />
          <path
            fill="#00f2ea"
            d="M242.075 76.63V66.516a66.3 66.3 0 0 1-35.186-10.047a66.47 66.47 0 0 0 35.186 20.163M176.53 11.57a68 68 0 0 1-.728-5.457V0h-47.834v189.845c-.076 22.13-18.046 40.05-40.208 40.05a40.06 40.06 0 0 1-18.09-4.287c7.347 9.637 18.949 15.857 32.007 15.857c22.16 0 40.132-17.918 40.21-40.05V11.571zM99.966 113.58v-10.769a89 89 0 0 0-12.061-.818C39.355 101.993 0 141.327 0 189.845c0 30.419 15.467 57.227 38.971 72.996c-15.502-15.838-25.053-37.516-25.053-61.427c0-47.9 38.354-86.848 86.048-87.833"
          />
        </svg>
      </a>
      <a
        href={"#"}
        aria-label="instagram"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-105 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 256 256"
        >
          <g fill="none">
            <rect
              width={256}
              height={256}
              fill="url(#SVGWRUqebek)"
              rx={60}
            ></rect>
            <rect
              width={256}
              height={256}
              fill="url(#SVGfkNpldMH)"
              rx={60}
            ></rect>
            <path
              fill="#fff"
              d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
            ></path>
            <defs>
              <radialGradient
                id="SVGWRUqebek"
                cx={0}
                cy={0}
                r={1}
                gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fd5"></stop>
                <stop offset={0.1} stopColor="#fd5"></stop>
                <stop offset={0.5} stopColor="#ff543e"></stop>
                <stop offset={1} stopColor="#c837ab"></stop>
              </radialGradient>
              <radialGradient
                id="SVGfkNpldMH"
                cx={0}
                cy={0}
                r={1}
                gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3771c8"></stop>
                <stop offset={0.128} stopColor="#3771c8"></stop>
                <stop offset={1} stopColor="#60f" stopOpacity={0}></stop>
              </radialGradient>
            </defs>
          </g>
        </svg>
      </a>
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
