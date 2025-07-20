import MouseMoveEffect from "@/components/MouseMoveEffect";
import { FloatingNavigation } from "./components/FloatingNavigation";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <FloatingNavigation />
      <MouseMoveEffect />
    </main>
  );
}
