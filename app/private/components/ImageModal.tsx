"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Eye } from "lucide-react";

interface ImageModalProps {
  imagePath: string;
  altText: string;
}

export function ImageModal({ imagePath, altText }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button
        onClick={openModal}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 bg-transparent"
      >
        <Eye className="h-4 w-4" />
        Ver Imagen
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-10 max-w-4xl max-h-[90vh] mx-4">
            <div className="relative rounded-lg shadow-2xl overflow-hidden">
              <Button
                onClick={closeModal}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 z-20 "
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="p-4">
                <img
                  src={imagePath}
                  alt={altText}
                  className="w-full h-auto max-h-[80vh] object-contain rounded"
                />
              </div>

              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground text-center">
                  {altText}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
