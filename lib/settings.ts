import prisma from "./prisma";

export const getSettings = async (key: string, defaultValue: boolean) => {
  try {
    const setting = await prisma.settings.findUnique({
      where: {
        key,
      },
    });

    return setting ? setting.value === "true" : defaultValue;
  } catch (error) {
    console.error("Error getting settings", error);
    return defaultValue;
  }
};
