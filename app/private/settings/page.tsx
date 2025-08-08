import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SettingsForm from "../components/SettingsForm";
import prisma from "@/lib/prisma";

const SettingsPage = async () => {
  let currentValue = false;

  try {
    const value = await prisma.settings.findUnique({
      where: { key: "showSpeakersPage" },
    });
    currentValue = value?.value === "true" ? true : false;
  } catch (e) {
    currentValue = false;
  }
  return (
    <main className="container mx-auto max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Configuración</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm initialValue={currentValue ? "true" : "false"} />
        </CardContent>
      </Card>
    </main>
  );
};

export default SettingsPage;
