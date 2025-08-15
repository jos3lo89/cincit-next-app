"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Eye } from "lucide-react";
import Image from "next/image";
import MyImage from "@/components/MyImage";

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
          <Button
            onClick={closeModal}
            variant="destructive"
            size="sm"
            className="absolute top-6 right-6 z-20 "
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="relative z-10 max-w-4xl max-h-[90vh] mx-4">
            <MyImage altText={altText} imagePath={imagePath} />
          </div>
        </div>
      )}
    </>
  );
}
