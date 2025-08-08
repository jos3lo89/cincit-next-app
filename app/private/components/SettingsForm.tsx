"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const formSchema = z.object({
  showSpeakersPage: z.enum(["true", "false"]),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  initialValue?: "true" | "false";
};

export default function SettingsForm({ initialValue = "false" }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { showSpeakersPage: initialValue },
  });

  useEffect(() => {
    form.reset({ showSpeakersPage: initialValue });
  }, [initialValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/settings/schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "showSpeakersPage",
          value: data.showSpeakersPage,
        }),
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg?.message || "Error al actualizar la configuración");
      }

      toast.success("Configuración actualizada", {
        description: `Mostrar página de oradores: ${data.showSpeakersPage}`,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error al actualizar la configuración";
      toast.error("Error", {
        description: message,
      });
    }
  };

  const checked = form.watch("showSpeakersPage") === "true";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Mostrar página de oradores
        </Label>
        <div className="flex items-center justify-between rounded-md border p-4">
          <div className="flex flex-col">
            <span className="text-sm">Control de visibilidad</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={checked ? "default" : "secondary"}>
              {checked ? "Activo" : "Inactivo"}
            </Badge>

            <Controller
              control={form.control}
              name="showSpeakersPage"
              render={({ field }) => (
                <Switch
                  checked={field.value === "true"}
                  onCheckedChange={(next) => {
                    field.onChange(next ? "true" : "false");
                  }}
                  aria-label="Alternar página de oradores"
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Actualizando..." : "Actualizar"}
        </Button>
      </div>
    </form>
  );
}
