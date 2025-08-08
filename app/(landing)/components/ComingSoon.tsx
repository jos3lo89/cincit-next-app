import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Hourglass, Sparkles } from "lucide-react";

const ComingSoon = () => {
  return (
    <div>
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full  text-amber-700  dark:text-amber-300 ring-1 ring-amber-200/70">
          <Hourglass className="h-6 w-6" aria-hidden="true" />
        </div>
        <Badge
          variant="secondary"
          className="mx-auto w-fit gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {"Próximamente"}
        </Badge>
        <CardTitle className="mt-3 text-2xl md:text-3xl">
          <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
            Muy pronto
          </span>
        </CardTitle>
        <p className="mt-2 text-muted-foreground">
          Estamos preparando todo para compartirte el cronograma definitivo.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col items-center pb-8">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg border bg-background/60 px-4 py-3 text-sm">
          <CalendarDays className="h-4 w-4 text-amber-600" aria-hidden="true" />
          <span className="font-medium">Publicación estimada</span>
          <span className="text-muted-foreground">•</span>
          <span className="tabular-nums">
            {new Date("2025-10-15T09:00:00").toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </CardContent>
    </div>
  );
};

export default ComingSoon;
