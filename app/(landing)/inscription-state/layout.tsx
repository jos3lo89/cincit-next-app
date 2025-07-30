import { FloatingNavigation } from "../components/FloatingNavigation";
import Navbar from "@/components/Navbar";

export default function InscriptionStateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
