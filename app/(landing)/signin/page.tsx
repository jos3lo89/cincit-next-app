"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { verifyOTPCode } from "@/actions/auth.action";

const formEmailSchema = z.object({
  email: z.email("El correo no es válido"),
});

type FormEmailtype = z.infer<typeof formEmailSchema>;

const SigninPage = () => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormEmailtype>({
    resolver: zodResolver(formEmailSchema),
    defaultValues: {
      email: email,
    },
  });

  const handleSendCode = async (values: FormEmailtype) => {
    try {
      const res = await fetch("/api/request-opt", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setEmail(values.email);
      setStep("otp");
      toast.success("peticion exitosa", {
        description: result.message,
      });
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) {
        toast.error("error", {
          description: error.message,
        });
      } else {
        toast.error("error al enviar el código");
      }
    }
  };

  const handleVerifyCode = async (formData: FormData) => {
    setIsLoading(true);

    formData.append("email", email);

    const result = await verifyOTPCode(formData);

    if (result.success) {
      toast.success("verificacion exitosa", {
        description: result.message,
      });
      router.refresh();
    } else {
      toast.error("Error de verificación", {
        description: result.message,
      });
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setStep("email");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {step === "email" ? "Iniciar Sesión" : "Verificar Código"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === "email" ? (
            <form onSubmit={handleSubmit(handleSendCode)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="tu-correo@ejemplo.com"
                  required
                  autoComplete="on"
                  disabled={formState.isSubmitting}
                  {...register("email")}
                />
                {formState.errors.email && (
                  <p className="text-sm text-red-500 text-center">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? (
                  <ClipLoader color="#fff" size={23} />
                ) : (
                  "Enviar Código"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-400 text-center">
                Código enviado a: <strong>{email}</strong>
              </div>

              <form action={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Código de Verificación</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      id="otp"
                      maxLength={6}
                      pattern="^[0-9]+$"
                      name="otp"
                      disabled={isLoading}
                      autoComplete="off"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verificando..." : "Verificar Código"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    Cambiar Email
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
