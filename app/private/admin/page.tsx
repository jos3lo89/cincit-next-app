import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Phone,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export const revalidate = 0;

async function getInscriptionStats() {
  const total = await prisma.inscription.count();

  const [pending, approved, rejected] = await Promise.all([
    prisma.inscription.count({ where: { state: "pending" } }),
    prisma.inscription.count({ where: { state: "approved" } }),
    prisma.inscription.count({ where: { state: "rejected" } }),
  ]);

  return { total, pending, approved, rejected };
}

export default async function AdminPage() {
  const inscriptionStats = await getInscriptionStats();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          <Link href="/private/attendance-call" className="group">
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-3  shadow-sm hover:shadow-md"
            >
              <Phone className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium whitespace-normal text-center">
                Llamar Asistencia
              </span>
            </Button>
          </Link>

          <Link href="/private/attendance-control" className="group">
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-3  shadow-sm hover:shadow-md"
            >
              <CheckCircle className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium whitespace-normal text-center">
                Activar Llamada
              </span>
            </Button>
          </Link>

          <Link href="/private/reports" className="group">
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-3  shadow-sm hover:shadow-md"
            >
              <FileText className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium whitespace-normal text-center">
                Reportes
              </span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/private/inscriptions/all" className="group">
            <Card className="shadow-sm hover:shadow-lg border-0 hover:border-blue-200 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">
                  Total Inscritos
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {inscriptionStats.total}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/private/inscriptions/approved" className="group">
            <Card className="shadow-sm hover:shadow-lg border-0 hover:border-blue-200 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">
                  Aprobados
                </CardTitle>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-green-500" />
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {inscriptionStats.approved}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/private/inscriptions/pending" className="group">
            <Card className="shadow-sm hover:shadow-lg border-0 hover:border-blue-200 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">
                  Pendientes
                </CardTitle>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {inscriptionStats.pending}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/private/inscriptions/rejected" className="group">
            <Card className="shadow-sm hover:shadow-lg border-0 hover:border-blue-200 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">
                  Rechazados
                </CardTitle>
                <div className="flex items-center gap-2">
                  <UserX className="h-5 w-5 text-red-500" />
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {inscriptionStats.rejected}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
