"use server";

import { auth } from "@/lib/auth";

export const signInDemoAdmin = async () => {
  try {
    await auth.api.signInEmail({
      body: {
        email: process.env.DEMO_ADMIN_EMAIL!,
        password: process.env.DEMO_ADMIN_PASSWORD!,
      },
    });

    return {
      success: true as const,
    };
  } catch (error) {
    console.error("Error al iniciar sesión como administrador:", error);

    return {
      success: false as const,
      message: "No se pudo iniciar la sesión como administrador.",
    };
  }
};