import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const registrationSchema = z.object({
  firstName: z.string().min(2, "El nombre es requerido"),
  lastName: z.string().min(2, "El apellido es requerido"),
  institution: z.string().min(3, "La institución es requerida"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  email: z.email("El correo electrónico no es válido"),
  telephone: z.string().length(9, "El teléfono debe tener 9 dígitos"),

  voucher: z
    .any()
    .refine((files) => files?.length == 1, "El voucher de pago es requerido.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `El tamaño máximo del archivo es 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Solo se permiten formatos .jpg, .jpeg, .png y .webp"
    ),
});

// Extraemos el tipo de TypeScript a partir del schema de Zod
export type RegistrationFormData = z.infer<typeof registrationSchema>;
