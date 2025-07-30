import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { handleSignOut } from "@/actions/auth.action";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="p-3 sticky rounded-b-lg shadow-lg max-w-xl mx-auto mt-6 flex justify-between items-center">
      <Link href="/">
        <p className="text-xl font-medium">CINCIT</p>
      </Link>
      {!session ? (
        <div className="flex gap-2 justify-center">
          <Link href="/signin">
            <Button variant="default">Iniciar sesión</Button>
          </Link>
        </div>
      ) : (
        <form action={handleSignOut}>
          <Button variant="default" type="submit" className="cursor-pointer">
            Cerrar sesión
          </Button>
        </form>
      )}
    </nav>
  );
};
export default Navbar;
