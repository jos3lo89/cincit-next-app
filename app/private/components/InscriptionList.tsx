"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, CheckCircle, CreditCard, Mail, XCircle } from "lucide-react";
import { ImageModal } from "./ImageModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { Inscription } from "@/interfaces/inscription.interface";

type InscriptionListProps = {
  inscriptions: Inscription[];
  handleAction: (id: number, state: string) => Promise<void>;
  loading: boolean;
};

interface LoadingActions {
  approving: number | null;
  rejecting: number | null;
}

const InscriptionList = ({
  handleAction,
  inscriptions,
  loading,
}: InscriptionListProps) => {
  const [loadingActions, setLoadingActions] = useState<LoadingActions>({
    approving: null,
    rejecting: null,
  });

  const onAction = async (id: number, state: "approved" | "rejected") => {
    if (state === "approved") {
      setLoadingActions({ ...loadingActions, approving: id });
    } else {
      setLoadingActions({ ...loadingActions, rejecting: id });
    }

    await handleAction(id, state);

    setLoadingActions({ approving: null, rejecting: null });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <PacmanLoader size={40} color="#3b82f6" />
      </div>
    );
  }

  if (inscriptions.length === 0) {
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-muted-foreground">
          No hay inscripciones pendientes en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-4">
      {inscriptions.map((inscription) => (
        <Card key={inscription.id} className="w-full">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="text-lg">
                Inscripción #{inscription.id}
              </CardTitle>
              <Badge
                variant={
                  inscription.state === "approved" ? "default" : "destructive"
                }
              >
                {inscription.state}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Información del Usuario
                </h4>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">
                    {inscription.user.name} {inscription.user.lastname}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-all">
                    {inscription.user.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    DNI: {inscription.user.dni}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    {inscription.user.institution}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Detalles de Inscripción
                  </h4>
                  <div className="space-y-2">
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium">Tipo:</span>{" "}
                      {inscription.inscriptionType}
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium">Fecha:</span>{" "}
                      {new Date(inscription.createdAt).toLocaleDateString(
                        "es-ES"
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Voucher de Pago
                  </h4>
                  <div className="space-y-2">
                    <ImageModal
                      imagePath={inscription.voucher.path}
                      altText={`Voucher de pago - Inscripción #${inscription.id}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-6 pt-4 border-t">
              <Button
                onClick={() => onAction(inscription.id, "approved")}
                disabled={
                  loadingActions.approving === inscription.id ||
                  loadingActions.rejecting === inscription.id
                }
                className="flex items-center justify-center gap-2 cursor-pointer"
                size="sm"
              >
                <CheckCircle className="h-4 w-4" />
                {loadingActions.approving === inscription.id
                  ? "Aprobando..."
                  : "Aprobar"}
              </Button>
              <Button
                onClick={() => onAction(inscription.id, "rejected")}
                disabled={
                  loadingActions.approving === inscription.id ||
                  loadingActions.rejecting === inscription.id
                }
                variant="destructive"
                className="flex items-center justify-center gap-2 cursor-pointer"
                size="sm"
              >
                <XCircle className="h-4 w-4" />
                {loadingActions.rejecting === inscription.id
                  ? "Rechazando..."
                  : "Rechazar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InscriptionList;
