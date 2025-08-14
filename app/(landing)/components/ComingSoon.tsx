import { CardHeader, CardTitle } from "@/components/ui/card";
import { Hourglass } from "lucide-react";

const ComingSoon = () => {
  return (
    <div>
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full  text-amber-700  dark:text-amber-300 ring-1 ring-amber-200/70">
          <Hourglass
            className="h-6 w-6 animate-spin"
            style={{
              animationDuration: "3s",
            }}
            aria-hidden="true"
          />
        </div>

        <CardTitle className="mt-3 text-2xl md:text-3xl">
          <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent animate-pulse">
            Muy pronto
          </span>
        </CardTitle>
        <p className="mt-2 text-muted-foreground">
          Estamos preparando todo para compartirte el cronograma definitivo.
        </p>
      </CardHeader>
    </div>
  );
};

export default ComingSoon;
