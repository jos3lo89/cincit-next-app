"use client";

import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search, User, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface User {
  id: string;
  dni: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  institution: string;
  role: "ADMINISTRATOR" | "PARTICIPANT" | "INSCRIBER";
  emailVerified: any;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

const formSchema = z.object({
  dni: z.string().min(8).max(8),
});

type FormData = z.infer<typeof formSchema>;

const formRoleSchema = z.object({
  role: z.enum(["ADMINISTRATOR", "PARTICIPANT", "INSCRIBER"]),
});

type FormRoleData = z.infer<typeof formRoleSchema>;

const roleLabels = {
  ADMINISTRATOR: "Administrador",
  PARTICIPANT: "Participante",
  INSCRIBER: "Inscriptor",
};

const roleColors = {
  ADMINISTRATOR: "destructive",
  PARTICIPANT: "default",
  INSCRIBER: "secondary",
} as const;

const ChangeRolePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);

  const {
    register,
    handleSubmit,
    reset: resetSearch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: "",
    },
  });

  const {
    handleSubmit: handleSubmitRole,
    setValue: setRoleValue,
    watch: watchRole,
    formState: { errors: roleErrors },
  } = useForm<FormRoleData>({
    resolver: zodResolver(formRoleSchema),
    defaultValues: {
      role: "PARTICIPANT",
    },
  });

  const selectedRole = watchRole("role");

  // Actualizar el rol seleccionado cuando cambie el usuario
  useEffect(() => {
    if (user) {
      setRoleValue("role", user.role);
    }
  }, [user, setRoleValue]);

  const fetchUser = async (values: FormData) => {
    setIsSearching(true);
    try {
      const res = await fetch(`/api/user/change-role/search/${values.dni}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Usuario no encontrado");
        }
        throw new Error("No se pudo obtener el usuario");
      }
      const data = await res.json();
      setUser(data);
      toast.success("Usuario encontrado", {
        description: `${data.name} ${data.lastname}`,
      });
    } catch (error) {
      console.error(error);
      setUser(null);
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
        });
      } else {
        toast.error("Error al obtener el usuario");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const submitRole = async (values: FormRoleData) => {
    if (!user) {
      toast.error("Seleccione un usuario");
      return;
    }

    if (user.role === values.role) {
      toast.info("El usuario ya tiene ese rol asignado");
      return;
    }

    setIsChangingRole(true);
    try {
      const res = await fetch(`/api/user/change-role/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: values.role,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo cambiar el rol");
      }

      const previousRole = user.role;
      const newRole = values.role;

      toast.success("Rol cambiado exitosamente", {
        description: `${user.name} ${user.lastname}: ${roleLabels[previousRole]} → ${roleLabels[newRole]}`,
      });

      // Reset completo
      resetSearch();
      setUser(null);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
        });
      } else {
        toast.error("Error al cambiar el rol");
      }
    } finally {
      setIsChangingRole(false);
    }
  };

  const handleReset = () => {
    resetSearch();
    setUser(null);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Cambiar Rol de Usuario</h1>
          <p className="text-muted-foreground">
            Busca un usuario por DNI y modifica su rol en el sistema
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar Usuario
            </CardTitle>
            <CardDescription>
              Ingresa el DNI del usuario que deseas modificar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(fetchUser)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  type="text"
                  placeholder="12345678"
                  maxLength={8}
                  {...register("dni")}
                  className={errors.dni ? "border-destructive" : ""}
                />
                {errors.dni && (
                  <p className="text-sm text-destructive">
                    {errors.dni.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isSearching} className="flex-1">
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Buscar Usuario
                    </>
                  )}
                </Button>
                {user && (
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Limpiar
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Información del usuario */}
        {user && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Usuario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    DNI
                  </Label>
                  <p className="font-mono">{user.dni}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Nombre Completo
                  </Label>
                  <p>
                    {user.name} {user.lastname}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Email
                  </Label>
                  <p>{user.email}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Teléfono
                  </Label>
                  <p>{user.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Institución
                  </Label>
                  <p>{user.institution}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Rol Actual
                  </Label>
                  <div>
                    <Badge variant={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Formulario de cambio de rol */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Cambiar Rol</h3>
                </div>

                <form
                  onSubmit={handleSubmitRole(submitRole)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="role">Nuevo Rol</Label>
                    <Select
                      value={selectedRole}
                      onValueChange={(value) =>
                        setRoleValue("role", value as FormRoleData["role"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMINISTRATOR">
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive" className="text-xs">
                              Administrador
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="PARTICIPANT">
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="text-xs">
                              Participante
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="INSCRIBER">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              Inscriptor
                            </Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {roleErrors.role && (
                      <p className="text-sm text-destructive">
                        {roleErrors.role.message}
                      </p>
                    )}
                  </div>

                  {selectedRole !== user.role && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Cambio:</span>{" "}
                        <Badge variant={roleColors[user.role]} className="mx-1">
                          {roleLabels[user.role]}
                        </Badge>
                        →
                        <Badge
                          variant={roleColors[selectedRole]}
                          className="mx-1"
                        >
                          {roleLabels[selectedRole]}
                        </Badge>
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isChangingRole || selectedRole === user.role}
                    className="w-full"
                  >
                    {isChangingRole ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cambiando Rol...
                      </>
                    ) : (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Cambiar Rol
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
export default ChangeRolePage;
