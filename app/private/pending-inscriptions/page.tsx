"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, CheckCircle, CreditCard, Mail, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageModal } from "../components/ImageModal";
import { PacmanLoader } from "react-spinners";
import { Pagination } from "../components/Pagination";

export interface Inscription {
  id: number;
  userId: string;
  voucherId: number;
  createdAt: string;
  updatedAt: string;
  inscriptionType: string;
  state: string;
  cincitEdition: string;
  user: User;
  voucher: Voucher;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  dni: string;
  institution: string;
}

export interface Voucher {
  id: number;
  path: string;
}

export interface Meta {
  total: number;
  page: number;
  pageSize: number;
  lastPage: number;
}

const PendingInscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInscriptions(currentPage);
  }, [currentPage]);

  const fetchInscriptions = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/inscription/pending?page=${page}&pageSize=5`
      );
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Error al buscar las inscripciones");
      }
      setInscriptions(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al buscar las inscripciones");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <PacmanLoader size={40} color="#3b82f6" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Inscripciones Pendientes
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona las inscripciones que están esperando aprobación
        </p>
        {meta && (
          <p className="text-sm text-muted-foreground mt-1">
            Mostrando {inscriptions.length} de {meta.total} inscripciones
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-4">
        {inscriptions.map((inscription) => (
          <Card key={inscription.id} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-lg">
                  Inscripción #{inscription.id}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200 w-fit"
                >
                  {inscription.state}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-4">
                {/* Información del usuario */}
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
                  {/* Información de la inscripción */}
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

                  {/* Información del voucher */}
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

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-2 mt-6 pt-4 border-t">
                <Button
                  disabled={actionLoading === inscription.id}
                  className="flex items-center justify-center gap-2"
                  size="sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  {actionLoading === inscription.id
                    ? "Aprobando..."
                    : "Aprobar"}
                </Button>
                <Button
                  disabled={actionLoading === inscription.id}
                  variant="destructive"
                  className="flex items-center justify-center gap-2"
                  size="sm"
                >
                  <XCircle className="h-4 w-4" />
                  {actionLoading === inscription.id
                    ? "Rechazando..."
                    : "Rechazar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {inscriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            No hay inscripciones pendientes en este momento
          </div>
        </div>
      )}

      {meta && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta.lastPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default PendingInscriptionsPage;
