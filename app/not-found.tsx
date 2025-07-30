import { Home } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-slate-200 select-none">
            404
          </h1>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-400 sm:text-4xl">
              Página no encontrada
            </h2>
            <p className="text-lg text-slate-500 max-w-sm mx-auto">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-slate-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-slate-900 border border-transparent rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
