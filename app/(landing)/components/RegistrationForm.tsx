"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building,
  FileText,
  IdCard,
  Mail,
  Phone,
  Upload,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationFormData,
  registrationSchema,
} from "@/schemas/register.schema";
import { registerUserAction } from "@/actions/register.action";
import {useEffect, useRef, useState} from "react";


const RegistrationForm = () => {
  const [selectUniversity, setSelectUniversity] = useState<string | null>(null)
  const [universityList, setUniversityList] = useState<InstitutionUser[]>([])
  const [viewInput, setViewInput] = useState(false)
  const [newUniversity, setNewUniversity] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/institution-list")
        console.log("Cargando instituciones desde la API", res)
        const data: InstitutionUser[] = await res.json()
        setUniversityList(data)
      } catch (error) {
        console.error("Error al cargar instituciones", error)
      }
    }

    fetchInstitutions()
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'nueva') {
      setViewInput(true)
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setSelectUniversity(value)
      const selected = universityList.find((u) => u.id === value)
      setValue('institution', selected?.institution || '')
      setViewInput(false)
    }
  }

  const handleUniversityList = () => {
    if (newUniversity.trim() !== '') {
      const newId = (universityList.length + 1).toString()
      const add = { id: newId, institution: newUniversity.trim() }
      const updatedUniversityList = [...universityList, add]

      setUniversityList(updatedUniversityList)
      setSelectUniversity(newId)
      setValue('institution', add.institution)
      setNewUniversity('')
    }

    setViewInput(false)
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const voucherFile = watch("voucher");
  const voucherFileName =
    voucherFile?.[0]?.name || "Haz clic para subir tu voucher";

  const onSubmit = async (data: RegistrationFormData) => {
    const formData = new FormData();
    formData.append("name", data.firstName);
    formData.append("lastname", data.lastName);
    formData.append("dni", data.dni);
    formData.append("email", data.email);
    formData.append("institution", data.institution);
    formData.append("phone", data.telephone);

    if (data.voucher && data.voucher.length > 0) {
      formData.append("file", data.voucher[0]);
    }

    const result = await registerUserAction(formData);

    if (result.success) {
      toast.success("¡Éxito!", {
        description: result.message,
      });
      reset();
      window.scrollTo(0, 0);
    } else {
      toast.error("Error en el registro", {
        description: result.message,
      });
    }
  };

  return (
    <section
      id="form-register"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-background-secondary"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card shadow-custom-lg animate-fade-in-up">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gradient mb-2">
              Registro de Participantes
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Completa tu registro con el voucher de pago
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    <User className="inline w-4 h-4 mr-2" />
                    Nombres *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Ingresa tus nombres"
                    {...register("firstName", { required: true })}
                    className="glass border-border/30 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    <User className="inline w-4 h-4 mr-2" />
                    Apellidos *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register("lastName", { required: true })}
                    placeholder="Ingresa tus apellidos"
                    className="glass border-border/30 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="institution"
                    className="text-sm font-medium text-foreground"
                  >
                    <Building className="inline w-4 h-4 mr-2" />
                    Institución / Universidad *
                  </Label>

                  <select
                      id="university"
                      onChange={handleChange}
                      value={selectUniversity ?? ''}
                      className="w-full p-2 border rounded-md"
                  >
                    <option value="" className="bg-background text-foreground">-- Seleccionar --</option>
                    {universityList.map((option) => (
                        <option key={option.id} value={option.id} className="bg-background text-foreground">
                          {option.institution}
                        </option>
                    ))}
                    <option value="nueva" className="bg-background text-foreground">+ Agregar nueva universidad</option>
                  </select>

                  {viewInput && (
                      <Input
                          ref={inputRef}
                          type="text"
                          placeholder="Nombre de la universidad"
                          className="glass border-border/30 focus:border-primary/50 focus:ring-primary/20 mt-2"
                          value={newUniversity}
                          onChange={(e) => setNewUniversity(e.target.value)}
                          onBlur={handleUniversityList}
                      />
                  )}

                  {errors.institution && (
                    <p className="text-red-500 text-sm">
                      {errors.institution.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="dni"
                    className="text-sm font-medium text-foreground"
                  >
                    <IdCard className="inline w-4 h-4 mr-2" />
                    DNI *
                  </Label>
                  <Input
                    id="dni"
                    type="number"
                    {...register("dni", { required: true })}
                    placeholder="Ingresa tu dni"
                    className="glass border-border/30 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />

                  {errors.dni && (
                    <p className="text-red-500 text-sm">{errors.dni.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    <Mail className="inline w-4 h-4 mr-2" />
                    Correo electronico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Nombre de tu institución o universidad"
                    className="glass border-border/30 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="telephone"
                    className="text-sm font-medium text-foreground"
                  >
                    <Phone className="inline w-4 h-4 mr-2" />
                    Telefono *
                  </Label>
                  <Input
                    id="telephone"
                    type="number"
                    {...register("telephone", { required: true })}
                    placeholder="Ingresa tu telefono"
                    className="glass border-border/30 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />

                  {errors.telephone && (
                    <p className="text-red-500 text-sm">
                      {errors.telephone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="voucher"
                  className="text-sm font-medium text-foreground"
                >
                  <FileText className="inline w-4 h-4 mr-2" />
                  Voucher de Pago *
                </Label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    id="voucher"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("voucher")}
                  />
                  <label htmlFor="voucher" className="cursor-pointer">
                    <Upload className="mx-auto text-blue-500 mb-2" size={32} />
                    <p className="text-slate-600">{voucherFileName}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      PNG, JPG y WEBP (máx. 5MB)
                    </p>
                  </label>
                  {errors.voucher && (
                    <p className="text-red-500 text-sm">
                      {errors.voucher.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary cursor-pointer hover:bg-gradient-secondary text-primary-foreground font-semibold py-3 rounded-xl shadow-glow-primary hover-glow transition-all duration-300"
              >
                {isSubmitting ? "Registrando..." : "Completar Registro"}
              </Button>
            </form>

            <div className="mt-6 p-4 glass rounded-xl">
              <h4 className="font-semibold text-foreground mb-2">
                Información importante:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tu registro será validado en un máximo de 24 horas</li>
                <li>• Recibirás un email de confirmación</li>
                <li>• Conserva tu voucher de pago como respaldo</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationForm;
