import { abortRegistration } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";

const AbortRegistrationButton = () => {
  return (
    <form
      action={abortRegistration}
      className="my-4 max-w-md mx-auto text-center "
    >
      <Button variant="destructive" type="submit" className="cursor-pointer">
        Cancelar y Salir
      </Button>
    </form>
  );
};
export default AbortRegistrationButton;
