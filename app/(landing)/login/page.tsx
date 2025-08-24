"use client";
import { getCodeState, verifyOtp } from "@/actions/inscriptionStatus.action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { set, z } from "zod";

const sendEmailSchema = z.object({
  email: z.email(),
});

type FormSchemaSendEmailType = z.infer<typeof sendEmailSchema>;

const verifyOtpSchema = z.object({
  code: z.string().min(4, { message: "El código es requerido." }),
});

type FormSchemaVerifyCodeType = z.infer<typeof verifyOtpSchema>;

const LoginPage = () => {
  const [errorSendEmail, setErrorSendEmail] = useState<string | null>(null);
  const [isPendingSendEmail, startTransitionSendEmail] = useTransition();
  const [step, setStep] = useState<"email" | "otp">("email");
  const router = useRouter();

  const formSendCode = useForm<FormSchemaSendEmailType>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const formVerifyCode = useForm<FormSchemaVerifyCodeType>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: FormSchemaSendEmailType) => {
    startTransitionSendEmail(async () => {
      const res = await getCodeState(values.email);
      if (res.error) {
        setErrorSendEmail(res.error);
      } else {
        // formSendCode.reset();
        setErrorSendEmail(null);
        setStep("otp");
      }
    });
  };

  const onVerifyCodeSubmit = async (values: FormSchemaVerifyCodeType) => {
    startTransitionSendEmail(async () => {
      const res = await verifyOtp(formSendCode.getValues("email"), values.code);
      if (res.error) {
        setErrorSendEmail(res.error);
      } else {
        formSendCode.reset();
        formVerifyCode.reset();
        toast.success("verificación exitosa peudes entrarar");
        router.push("/inscription-state");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>
            {step === "email"
              ? "Ingresa tu email para recibir un código de verificación"
              : "Ingresa el código que enviamos a tu email"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorSendEmail && (
            <Alert variant="destructive">
              <AlertDescription>{errorSendEmail}</AlertDescription>
            </Alert>
          )}

          {step === "email" ? (
            <Form {...formSendCode}>
              <form
                onSubmit={formSendCode.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={formSendCode.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPendingSendEmail}
                >
                  {isPendingSendEmail ? "Enviando..." : "Enviar Código"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                Código enviado a:{" "}
                <span className="font-medium">
                  {formSendCode.getValues("email")}
                </span>
              </div>

              <Form {...formVerifyCode}>
                <form
                  onSubmit={formVerifyCode.handleSubmit(onVerifyCodeSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={formVerifyCode.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código de Verificación</FormLabel>
                        <FormControl>
                          {/* <Input
                            type="text"
                            placeholder="Ingresa el código"
                            {...field}
                          /> */}
                          <InputOTP
                            id="code"
                            maxLength={4}
                            pattern="^[0-9]+$"
                            {...formVerifyCode.register("code")}
                            onChange={(value) =>
                              formVerifyCode.setValue("code", value)
                            }
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPendingSendEmail}
                  >
                    {isPendingSendEmail ? "Verificando..." : "Verificar Código"}
                  </Button>
                </form>
              </Form>

              <Button
                variant="outline"
                onClick={() => {
                  setErrorSendEmail(null);
                  setStep("email");
                }}
                className="w-full"
              >
                Volver
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
