"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Inscription, Meta } from "@/interfaces/inscription.interface";
import InscriptionApprovedList from "@/app/private/components/InscriptionApprovedList";

const PendingInscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInscriptions(currentPage);
  }, [currentPage]);

  const fetchInscriptions = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/inscription/approved?page=${page}&pageSize=4`
      );
      const data = await res.json();

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

  const handleAction = async (id: number, state: string) => {
    try {
      const res = await fetch(
        `/api/inscription/action?id=${id}&state=${state}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Error canbiar el estado de la inscripción"
        );
      }

      toast.success("Cambio de estado realizado exitosamente");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error en la solicitud");
      }
    } finally {
      fetchInscriptions(inscriptions.length === 1 ? 1 : currentPage);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Inscripciones Aprobados
        </h1>
        {meta && !loading && (
          <p className="text-sm text-muted-foreground mt-1">
            Mostrando {inscriptions.length} de {meta.total} inscripciones
          </p>
        )}
      </div>

      <InscriptionApprovedList
        inscriptions={inscriptions}
        handleAction={handleAction}
        loading={loading}
      />

      {meta && meta.lastPage > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            size="sm"
            variant="outline"
            className="flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={currentPage === pageNumber}
                  size="sm"
                  className="min-w-[40px]"
                >
                  {pageNumber}
                </Button>
              )
            )}
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === meta.lastPage}
            size="sm"
            variant="outline"
            className="flex items-center gap-1 cursor-pointer"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
export default PendingInscriptionsPage;
