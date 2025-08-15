import { cookies } from "next/headers";
import AbortRegistrationButton from "../components/AbortRegistrationButton";
import RegistrationForm from "../components/RegistrationForm";
import { verifyToken } from "@/lib/jwt";

const RegisterPage = async () => {
  const qki = await cookies();
  const result = qki.get("registration_token");

  if (!result?.value) {
    return (
      <div>
        <h4>Registro</h4>
        <p>No hay token de registro</p>
      </div>
    );
  }

  const payload = await verifyToken<{
    email: string;
    purpose: string;
    iat: number;
    exp: number;
  }>(result.value);

  return (
    <div>
      <AbortRegistrationButton />
      <RegistrationForm email={payload.email} />
    </div>
  );
};
export default RegisterPage;
