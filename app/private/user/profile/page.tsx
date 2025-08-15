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
    <Card className="w-full max-w-2xl mx-auto bg-transparent border-none">
      <CardHeader className="text-center pb-3">
        <div className="flex justify-center mb-2">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user.image || undefined}
              alt={`${user.name} ${user.lastname}`}
            />
            <AvatarFallback className="text-sm font-semibold">
              {getInitials(user.name, user.lastname)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-lg">
          {user.name} {user.lastname}
        </CardTitle>
        <CardDescription className="flex items-center justify-center gap-2">
          <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
            <Shield className="w-3 h-3 mr-1" />
            {user.role}
          </Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Información Personal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                DNI
              </label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <CreditCard className="w-3 h-3 text-muted-foreground" />
                <span className="font-mono text-sm">{user.dni}</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Teléfono
              </label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm">{user.phone}</span>
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <Mail className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        <div>
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Institución
          </h3>
          <div className="p-2 bg-muted rounded-md">
            <div className="flex items-center gap-2">
              <Building2 className="w-3 h-3 text-muted-foreground" />
              <span className="font-medium text-sm">
                {user.institution.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        <div>
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Información de Cuenta
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Fecha de Registro
              </label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <CalendarDays className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm">{formatDate(user.createdAt)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Última Actualización
              </label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <CalendarDays className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm">{formatDate(user.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
