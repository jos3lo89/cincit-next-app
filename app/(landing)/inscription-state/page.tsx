import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import {
  Building,
  CalendarDays,
  CreditCard,
  FileText,
  Mail,
  Phone,
  User,
} from "lucide-react";

const InscriptionStatePage = async () => {
  const session = await auth();
  const user = session?.user;

  const inscriptionState = await prisma.inscription.findFirst({
    where: { userId: user?.id },
    include: {
      voucher: true,
      user: true,
    },
  });

  if (!inscriptionState) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              No se encontró información de inscripción
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStateText = (state: string) => {
    switch (state) {
      case "pending":
        return "Pendiente";
      case "approved":
        return "Aprobada";
      case "rejected":
        return "Rechazada";
      default:
        return state;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto p-6 space-y-6 mb-20">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Estado de Inscripción CINCIT</h1>
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`text-lg px-6 py-2 ${getStateColor(
              inscriptionState.state
            )}`}
          >
            {getStateText(inscriptionState.state)}
          </Badge>
        </div>
        <p className="text-muted-foreground">Edición: 2025 • Tipo: General</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Participante
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={inscriptionState.user.image || undefined} />
                <AvatarFallback className="text-lg">
                  {inscriptionState.user.name.charAt(0)}
                  {inscriptionState.user.lastname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">
                  {inscriptionState.user.name} {inscriptionState.user.lastname}
                </h3>
                <p className="text-muted-foreground">
                  DNI: {inscriptionState.user.dni}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{inscriptionState.user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{inscriptionState.user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {inscriptionState.user.institution}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Comprobante de Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <img
                src={inscriptionState.voucher.urlfull || "/placeholder.svg"}
                alt="Comprobante de pago"
                className="w-full max-w-sm mx-auto rounded-lg border shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subido:</span>
                <span className="text-sm">
                  {formatDate(inscriptionState.voucher.createdAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detalles de la Inscripción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Fecha de Inscripción
              </p>
              <p className="text-sm flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(inscriptionState.createdAt)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Última Actualización
              </p>
              <p className="text-sm">
                {formatDate(inscriptionState.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {inscriptionState.state === "pending" && (
            <div className="text-center space-y-2">
              <p className="text-yellow-700">
                Tu inscripción está siendo revisada por nuestro equipo.
              </p>
              <p className="text-sm text-muted-foreground">
                Te notificaremos por correo electrónico cuando tengamos una
                respuesta.
              </p>
            </div>
          )}
          {inscriptionState.state === "approved" && (
            <div className="text-center space-y-2">
              <p className="text-green-700 font-medium">
                ¡Felicitaciones! Tu inscripción ha sido aprobada.
              </p>
              <p className="text-sm text-muted-foreground">
                Recibirás más información sobre el evento próximamente.
              </p>
            </div>
          )}
          {inscriptionState.state === "rejected" && (
            <div className="text-center space-y-2">
              <p className="text-red-700">
                Tu inscripción no pudo ser aprobada.
              </p>
              <p className="text-sm text-muted-foreground">
                Si tienes dudas, contacta con el equipo organizador.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InscriptionStatePage;
