import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Mail,
  Phone,
  Building2,
  CreditCard,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const getInitials = (name: string, lastname: string) => {
    return `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMINISTRATOR":
        return "destructive";
      case "INSCRIBER":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="w-full bg-transparent border-none shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user.image || undefined}
              alt={`${user.name} ${user.lastname}`}
            />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(user.name, user.lastname)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">
          {user.name} {user.lastname}
        </CardTitle>
        <CardDescription className="flex items-center justify-center gap-2">
          <Badge variant={getRoleBadgeVariant(user.role)}>
            <Shield className="w-3 h-3 mr-1" />
            {user.role}
          </Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Información Personal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                DNI
              </label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono">{user.dni}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Teléfono
              </label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Información de Contacto
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Información Institucional
          </h3>
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {user.institution.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Información de Cuenta
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Fecha de Registro
              </label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <span>{formatDate(user.createdAt)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Última Actualización
              </label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <span>{formatDate(user.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
