"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Mail } from "lucide-react";

const InscriptionStatusPage = () => {
  const handleEmailSubmit = async (formData: FormData) => {};

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Estado de Inscripción</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            En esta página podrás verificar el estado de tu inscripción. Ingresa
            tu correo electrónico y el código de verificación para consultar.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Verificación de Correo
            </CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico para comenzar la verificación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu-correo@ejemplo.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Enviar Código de Verificación
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default InscriptionStatusPage;
