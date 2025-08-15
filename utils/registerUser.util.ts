import { RegistrationFormData } from "@/schemas/register.schema";
import { toast } from "sonner";

export const uploadVoucherImage = async (file: File) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_IMG_SERVICE}/api/v1/upload`,
      { method: "POST", body: imageFormData }
    );

    if (!response.ok) throw new Error("Error al subir la imagen.");
    return await response.json();
  } catch (error) {
    toast.error("Error de subida", {
      description:
        error instanceof Error ? error.message : "No se pudo subir el voucher.",
    });
    throw error;
  }
};

export const deleteVoucherImage = async (id: string) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_IMG_SERVICE}/api/v1/image/${id}`,
      {
        method: "DELETE",
      }
    );
  } catch {
    toast.error("Error Crítico", {
      description: `Contacta a soporte con el ID: ${id}`,
    });
  }
};

export const submitRegistration = async (
  data: RegistrationFormData,
  voucherData: any
) => {
  try {
    const registrationPayload = {
      name: data.firstName,
      lastname: data.lastName,
      dni: data.dni,
      email: data.email,
      phone: data.telephone,
      institution: data.institution,
      voucher: {
        id: voucherData.id,
        url: voucherData.url,
        urlFull: voucherData.urlFull,
      },
    };

    const response = await fetch("/api/register/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationPayload),
    });

    const result = await response.json();

    if (!response.ok)
      throw new Error(result.message || "Error en el registro.");

    toast.success("¡Éxito!", { description: result.message });
    return true;
  } catch (error) {
    toast.error("Error en el registro", {
      description: error instanceof Error ? error.message : "Ocurrió un error.",
    });
    return false;
  }
};
