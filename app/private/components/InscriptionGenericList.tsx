"use client";

import { Badge } from "@/components/ui/badge";
import { Building, CheckCircle, CreditCard, Mail, XCircle, Search, X, LayoutGrid, List } from "lucide-react";
import { ImageModal } from "./ImageModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
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

// Simple debounce utility
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const InscriptionGenericList = ({
                                   inscriptions,
                                   handleAction,
                                   loading,
                                 }: InscriptionListProps) => {
  const [loadingActions, setLoadingActions] = useState<LoadingActions>({
    approving: null,
    rejecting: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInscriptions, setFilteredInscriptions] = useState(inscriptions);
  const [viewMode, setViewMode] = useState<"card" | "list">("list");

  // Filter inscriptions based on search query
  const filterInscriptions = (query: string) => {
    const lowercaseQuery = query.toLowerCase().trim();
    if (!lowercaseQuery) {
      setFilteredInscriptions(inscriptions);
      return;
    }

    const filtered = inscriptions.filter((inscription) =>
        [
          inscription.id.toString(),
          `${inscription.user.name} ${inscription.user.lastname}`,
          inscription.user.email,
          inscription.user.institution,
          inscription.inscriptionType,
        ].some((field) => field.toLowerCase().includes(lowercaseQuery))
    );
    setFilteredInscriptions(filtered);
  };

  // Debounced filter function
  const debouncedFilter = debounce(filterInscriptions, 300);

  // Update filtered inscriptions when search query or inscriptions change
  useEffect(() => {
    debouncedFilter(searchQuery);
  }, [searchQuery, inscriptions]);

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
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground font-medium">
            No hay inscripciones pendientes en este momento.
          </p>
        </div>
    );
  }

  return (
      <div className="w-full p-4">
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Buscar por ID, nombre, email, institución o tipo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
            />
            {searchQuery && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Lista</span>
            </Button>
            <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("card")}
                className="flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Cartas</span>
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
            <div className="w-full overflow-x-auto">
              <div className="min-w-[800px] border rounded-lg shadow-sm">
                <div className="grid grid-cols-12 gap-4 bg-gray-800 p-4 font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-2">Usuario</div>
                  <div className="col-span-2">Email</div>
                  <div className="col-span-2">Institución</div>
                  <div className="col-span-2">Tipo</div>
                  <div className="col-span-1">Estado</div>
                  <div className="col-span-2 text-right">Acciones</div>
                </div>
                {filteredInscriptions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No se encontraron inscripciones que coincidan con la búsqueda.
                    </div>
                ) : (
                    filteredInscriptions.map((inscription) => (
                        <div
                            key={inscription.id}
                            className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-950 transition-colors duration-200"
                        >
                          <div className="col-span-1 font-medium">
                            #{inscription.id}
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span>
                      {inscription.user.name} {inscription.user.lastname}
                    </span>
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground truncate">
                      {inscription.user.email}
                    </span>
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">{inscription.user.institution}</span>
                          </div>
                          <div className="col-span-2">
                            <span>{inscription.inscriptionType}</span>
                            <div className="text-xs text-muted-foreground">
                              {new Date(inscription.createdAt).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                          <div className="col-span-1">
                            <Badge
                                variant={
                                  inscription.state === "rejected" ? "destructive" : "success"
                                }
                                className="flex items-center gap-1"
                            >
                              {inscription.state === "approved" ? (
                                  <CheckCircle className="h-3 w-3" />
                              ) : (
                                  <XCircle className="h-3 w-3" />
                              )}
                              {inscription.state.charAt(0).toUpperCase() +
                                  inscription.state.slice(1)}
                            </Badge>
                          </div>
                          <div className="col-span-2 flex items-center justify-end gap-2">
                            <ImageModal
                                imagePath={inscription.voucher.path}
                                altText={`Voucher de pago - Inscripción #${inscription.id}`}
                            />
                            {inscription.state === "pending" && (
                                <>
                                  <Button
                                      variant="default"
                                      size="sm"
                                      onClick={() => onAction(inscription.id, "approved")}
                                      disabled={loadingActions.approving === inscription.id}
                                      className="flex items-center gap-1"
                                  >
                                    {loadingActions.approving === inscription.id ? (
                                        <PacmanLoader size={10} color="#ffffff" />
                                    ) : (
                                        <CheckCircle className="h-3 w-3" />
                                    )}
                                    <span className="hidden sm:inline">Aprobar</span>
                                  </Button>
                                  <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => onAction(inscription.id, "rejected")}
                                      disabled={loadingActions.rejecting === inscription.id}
                                      className="flex items-center gap-1"
                                  >
                                    {loadingActions.rejecting === inscription.id ? (
                                        <PacmanLoader size={10} color="#ffffff" />
                                    ) : (
                                        <XCircle className="h-3 w-3" />
                                    )}
                                    <span className="hidden sm:inline">Rechazar</span>
                                  </Button>
                                </>
                            )}
                          </div>
                        </div>
                    ))
                )}
              </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredInscriptions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground col-span-full">
                    No se encontraron inscripciones que coincidan con la búsqueda.
                  </div>
              ) : (
                  filteredInscriptions.map((inscription) => (
                      <Card
                          key={inscription.id}
                          className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <CardTitle className="text-xl font-bold">
                              Inscripción #{inscription.id}
                            </CardTitle>
                            <Badge
                                variant={
                                  inscription.state === "approved" ? "success" : "default"
                                }
                                className="flex items-center gap-1"
                            >
                              {inscription.state === "approved" ? (
                                  <CheckCircle className="h-3 w-3" />
                              ) : (
                                  <XCircle className="h-3 w-3" />
                              )}
                              {inscription.state.charAt(0).toUpperCase() +
                                  inscription.state.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                                Información del Usuario
                              </h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                  <CreditCard className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  <span className="font-medium">
                            {inscription.user.name} {inscription.user.lastname}
                          </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  <span className="text-muted-foreground break-all">
                            {inscription.user.email}
                          </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <CreditCard className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  <span>DNI: {inscription.user.dni}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Building className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  <span>{inscription.user.institution}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-4">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                                  Detalles de Inscripción
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="font-medium">Tipo:</span>{" "}
                                    {inscription.inscriptionType}
                                  </div>
                                  <div>
                                    <span className="font-medium">Fecha:</span>{" "}
                                    {new Date(inscription.createdAt).toLocaleDateString(
                                        "es-ES",
                                        {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        }
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                                  Voucher de Pago
                                </h4>
                                <ImageModal
                                    imagePath={inscription.voucher.path}
                                    altText={`Voucher de pago - Inscripción #${inscription.id}`}
                                />
                              </div>
                            </div>
                          </div>
                          {inscription.state === "pending" && (
                              <div className="flex justify-end gap-3 mt-6">
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => onAction(inscription.id, "approved")}
                                    disabled={loadingActions.approving === inscription.id}
                                    className="flex items-center gap-2"
                                >
                                  {loadingActions.approving === inscription.id ? (
                                      <PacmanLoader size={12} color="#ffffff" />
                                  ) : (
                                      <>
                                        <CheckCircle className="h-4 w-4" />
                                        Aprobar
                                      </>
                                  )}
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onAction(inscription.id, "rejected")}
                                    disabled={loadingActions.rejecting === inscription.id}
                                    className="flex items-center gap-2"
                                >
                                  {loadingActions.rejecting === inscription.id ? (
                                      <PacmanLoader size={12} color="#ffffff" />
                                  ) : (
                                      <>
                                        <XCircle className="h-4 w-4" />
                                        Rechazar
                                      </>
                                  )}
                                </Button>
                              </div>
                          )}
                        </CardContent>
                      </Card>
                  ))
              )}
            </div>
        )}
      </div>
  );
};

export default InscriptionGenericList;