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

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// 2. ESQUEMA PARA LA API (SIN EL CAMPO 'file')
// Usamos .omit() para crear una copia del esquema cliente sin el campo 'file'.
// Esto se usará en tu ruta API del servidor.
// export const registerSchemaApi = registrationSchema.omit({
//   voucher: true,
// });

// // También exportamos los tipos de TypeScript si los necesitas en otros lugares.
// // export type RegisterFormClient = z.infer<typeof registrationSchema>;
// export type RegisterFormApi = z.infer<typeof registerSchemaApi>;

export const registerSchemaApi = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  lastname: z.string().min(2, "El apellido es muy corto"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  email: z.email("El correo no es válido"),
  phone: z.string().length(9, "El teléfono debe tener 9 dígitos"),
  institution: z.string().min(3, "El nombre de la institución es requerido"),
  voucher: z.object({
    id: z.string(),
    url: z.string(),
    urlFull: z.string(),
  }),
});

export const EmailFormSchema = z.object({
  email: z.email("Email inválido"),
});

export const OTPFormSchema = z.object({
  email: z.email(),
  otp: z.string().length(4, "El código debe tener 4 dígitos"),
});

export type EmailFormData = z.infer<typeof EmailFormSchema>;
export type OTPFormData = z.infer<typeof OTPFormSchema>;
