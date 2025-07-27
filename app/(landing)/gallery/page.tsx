"use client";

import { useState } from "react";
import { X } from "lucide-react";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      id: 1,
      src: "https://i.pinimg.com/1200x/f8/d7/25/f8d725d05aa9c8ee66a54d59ce9fe10d.jpg",
    },
    {
      id: 2,
      src: "https://i.pinimg.com/736x/3d/be/40/3dbe40e21f2ab6c4514c24d9e8a04d45.jpg",
    },
    {
      id: 3,
      src: "https://i.pinimg.com/1200x/5e/84/ce/5e84ce0aa2ca3d63a0112c482265ad48.jpg",
    },
    {
      id: 4,
      src: "https://i.pinimg.com/1200x/2d/44/ed/2d44ed42d959cbbe9aeb7ccc7f20f18e.jpg",
    },
    {
      id: 5,
      src: "https://i.pinimg.com/736x/95/c8/fe/95c8fec0d77b140ae68d69b160dda036.jpg",
    },
    {
      id: 6,
      src: "https://i.pinimg.com/1200x/f8/d7/25/f8d725d05aa9c8ee66a54d59ce9fe10d.jpg",
    },
    {
      id: 7,
      src: "https://i.pinimg.com/736x/3d/be/40/3dbe40e21f2ab6c4514c24d9e8a04d45.jpg",
    },
    {
      id: 8,
      src: "https://i.pinimg.com/1200x/5e/84/ce/5e84ce0aa2ca3d63a0112c482265ad48.jpg",
    },
  ];

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="min-h-screen mb-16">
      <header className="text-center py-16 px-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-block mb-6">
            <div
              className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 bg-clip-text"
              style={{
                textShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            >
              CINCIT
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-500 mb-4">
            Explora Nuestra Trayectoria Visual
          </h2>

          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Descubre la evolución y los momentos más destacados a través de esta
            colección de imágenes que narran nuestra historia y crecimiento
          </p>

          <div className="flex justify-center mt-8">
            <div
              className="h-1 w-32 rounded-full"
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #8b5cf6)",
                backgroundSize: "200% 100%",
                animation: "gradient-shift 3s ease infinite",
              }}
            />
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer"
              onClick={() => openModal(image.src)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div
                className="relative overflow-hidden rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500"
                style={{
                  transform: "perspective(1000px)",
                }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={`Imagen ${index + 1} de la trayectoria de Cincit`}
                  className="w-full h-[350px] object-cover object-center transition-all duration-700 group-hover:scale-110"
                  style={{
                    filter: "brightness(0.9) contrast(1.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter =
                      "brightness(1.1) contrast(1.2) saturate(1.2)";
                    e.currentTarget.parentElement!.style.transform =
                      "perspective(1000px) rotateY(5deg) rotateX(5deg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter =
                      "brightness(0.9) contrast(1.1)";
                    e.currentTarget.parentElement!.style.transform =
                      "perspective(1000px) rotateY(0deg) rotateX(0deg)";
                  }}
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))",
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300"
                    style={{
                      /* CSS personalizado para botón flotante */
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <svg
                      className="w-8 h-8 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            /* CSS personalizado para backdrop blur */
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Imagen ampliada"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              style={{
                /* CSS personalizado para imagen modal */
                maxHeight: "90vh",
                animation: "modalZoom 0.3s ease-out",
              }}
            />

            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute -top-1 -right-0 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors duration-200"
              style={{
                /* CSS personalizado para botón cerrar */
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <X className="w-4 h-4 text-gray-800" />
            </button>
          </div>
        </div>
      )}

      {/* CSS personalizado embebido */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes modalZoom {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
