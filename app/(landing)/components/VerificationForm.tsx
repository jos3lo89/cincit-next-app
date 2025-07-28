"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  EmailFormData,
  EmailFormSchema,
  OTPFormData,
  OTPFormSchema,
} from "@/schemas/register.schema";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export default function VerificationForm() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(EmailFormSchema),
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      email: email,
    },
  });

  const onEmailSubmit = async (data: EmailFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el código");
      }

      setEmail(data.email);
      otpForm.setValue("email", data.email);
      setStep("otp");
      toast.success("Código enviado a tu correo electrónico");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const onOTPSubmit = async (data: OTPFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          code: data.otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Código OTP inválido");
      }

      router.push("/register");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setError("");
    otpForm.reset();
  };

  if (step === "email") {
    return (
      <div
        id="form-register"
        className="mb-10 flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-1xl text-center md:text-2xl font-bold text-gradient mb-2">
              Verificación de Email
            </CardTitle>
            <CardDescription>
              <div className="p-4 glass rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">
                  Pasos para registrarse:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>. Ingresa tu correo electrónico</li>
                  <li>. Recibirás un código de verificación en tu correo</li>
                  <li>. Ingresa el código para validar tu correo</li>
                  <li>
                    . Completa el formulario de inscripción con tu voucher de
                    pago
                  </li>
                  <li>. Conserva tu voucher de pago como respaldo</li>
                </ul>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  autoComplete="on"
                  id="email"
                  type="email"
                  placeholder="tu-correo@ejemplo.com"
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full cursor-pointer "
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={23} />
                ) : (
                  "Enviar Código"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div id="form-register" className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verificar Código</CardTitle>
          <CardDescription>
            Ingresa el código de 4 dígitos enviado a {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={otpForm.handleSubmit(onOTPSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="otp">Código de Verificación</Label>
              <div className="flex justify-center">
                <InputOTP
                  id="otp"
                  maxLength={4}
                  pattern="^[0-9]+$"
                  {...otpForm.register("otp")}
                  onChange={(value) => otpForm.setValue("otp", value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {otpForm.formState.errors.otp && (
                <p className="text-sm text-red-500 text-center">
                  {otpForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={23} />
                ) : (
                  "Verificar Código"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent cursor-pointer"
                onClick={handleBackToEmail}
              >
                Cambiar Email
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
