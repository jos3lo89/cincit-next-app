import type { ScheduleEvent } from "@/interfaces/timeLine.interface";

export const scheduleData: { [key: string]: ScheduleEvent[] } = {
  dia1: [
    {
      time: "08:00 - 09:00",
      type: "ceremonia",
      title: "Presentación del Evento",
      description: "Bienvenida oficial y presentación de CINCIT 2025",
      location: "Auditorio Principal",
    },
    {
      time: "09:00 - 11:00",
      type: "ponencia",
      title: "Fundamentos de Inteligencia Artificial en el Siglo XXI",
      description:
        "Una introducción comprensiva a los pilares fundamentales de la IA moderna y su impacto transformador.",
      speaker: {
        name: "Dr. Carlos Mendoza",
        title: "PhD en Computer Science - MIT",
        institution: "Universidad Nacional Mayor de San Marcos",
        orcid: "0000-0002-1234-5678",
        specialty: "Machine Learning y Deep Learning",
        topic:
          "Arquitecturas neuronales avanzadas y su aplicación en problemas complejos",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:00 - 13:00",
      type: "ponencia",
      title: "Procesamiento de Lenguaje Natural: Del Texto a la Comprensión",
      description:
        "Explorando las últimas técnicas en NLP y modelos de lenguaje como GPT y BERT.",
      speaker: {
        name: "Dra. Ana Fernández",
        title: "PhD in Computational Linguistics - Stanford",
        institution: "Pontificia Universidad Católica del Perú",
        orcid: "0000-0003-2345-6789",
        specialty:
          "Procesamiento de Lenguaje Natural y Lingüística Computacional",
        topic:
          "Modelos transformer y su evolución hacia la comprensión contextual avanzada",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      location: "Auditorio Principal",
    },
    {
      time: "14:00 - 18:00",
      type: "talleres",
      title: "Talleres Prácticos",
      description:
        "Sesiones hands-on con tecnologías de vanguardia en machine learning",
      location: "Laboratorios A, B y C",
    },
  ],
  dia2: [
    {
      time: "09:00 - 11:00",
      type: "ponencia",
      title: "Visión por Computadora: Viendo el Mundo a Través de Algoritmos",
      description:
        "Técnicas avanzadas en computer vision y sus aplicaciones en la industria peruana.",
      speaker: {
        name: "Dr. Roberto Silva",
        title: "PhD in Computer Vision - Carnegie Mellon",
        institution: "Universidad de Ingeniería y Tecnología (UTEC)",
        orcid: "0000-0004-3456-7890",
        specialty: "Computer Vision y Robótica",
        topic:
          "Sistemas de visión inteligente para automatización industrial y agricultura de precisión",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:00 - 11:30",
      type: "descanso",
      title: "Coffee Break",
      description: "Pausa para networking y refrigerio",
      location: "Hall Principal",
    },
    {
      time: "11:30 - 13:00",
      type: "ponencia",
      title: "IA en la Medicina: Revolucionando el Diagnóstico y Tratamiento",
      description:
        "Aplicaciones de machine learning en imagenología médica y diagnóstico asistido.",
      speaker: {
        name: "Dra. María González",
        title: "MD, PhD in Medical AI - Johns Hopkins",
        institution: "Hospital Nacional Dos de Mayo",
        orcid: "0000-0005-4567-8901",
        specialty: "Inteligencia Artificial Médica e Imagenología",
        topic:
          "Algoritmos de deep learning para detección temprana de cáncer en radiografías",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "14:00 - 18:00",
      type: "talleres",
      title: "Implementación Práctica de Soluciones de IA",
      description:
        "Talleres prácticos de implementación de algoritmos de IA en casos reales",
      location: "Laboratorios A, B y C",
    },
  ],
  dia3: [
    {
      time: "09:00 - 11:00",
      type: "ponencia",
      title: "Blockchain y Criptomonedas: La Revolución Descentralizada",
      description:
        "Fundamentos de blockchain, smart contracts y el futuro de las finanzas digitales.",
      speaker: {
        name: "Ing. Luis Vargas",
        title: "MSc in Blockchain Technology - ETH Zurich",
        institution: "Banco Central de Reserva del Perú",
        orcid: "0000-0006-5678-9012",
        specialty: "Blockchain, DeFi y Criptoeconomía",
        topic:
          "Implementación de CBDCs y su impacto en el sistema financiero peruano",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "11:00 - 11:30",
      type: "descanso",
      title: "Coffee Break",
      description: "Última pausa para networking",
      location: "Hall Principal",
    },
    {
      time: "11:30 - 13:00",
      type: "ponencia",
      title: "El Futuro de la Tecnología: Tendencias y Perspectivas 2025-2030",
      description:
        "Una mirada hacia las tecnologías emergentes que definirán la próxima década.",
      speaker: {
        name: "Dr. Jorge Ramírez",
        title: "PhD in Emerging Technologies - MIT",
        institution: "Centro de Innovación Tecnológica PUCP",
        orcid: "0000-0007-6789-0123",
        specialty: "Tecnologías Emergentes y Prospectiva Tecnológica",
        topic:
          "Quantum computing, neuromorphic chips y la siguiente revolución computacional",
        image:
          "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
      },
      location: "Auditorio Principal",
    },
    {
      time: "14:00 - 16:00",
      type: "talleres",
      title: "Sesiones Finales de Implementación",
      description: "Talleres de cierre y consolidación de conocimientos",
      location: "Laboratorios A, B y C",
    },
    {
      time: "16:00 - 17:00",
      type: "ceremonia",
      title: "Ceremonia de Clausura",
      description: "Palabras finales y entrega de certificados",
      location: "Auditorio Principal",
    },
  ],
};

export const eventDays = [
  {
    date: "15 Agosto 2025",
    day: "Día 1",
  },
  {
    date: "16 Agosto 2025",
    day: "Día 2",
  },
  {
    date: "17 Agosto 2025",
    day: "Día 3",
  },
];
