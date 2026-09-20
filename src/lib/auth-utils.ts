
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
};

export const requireAdmin = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return session;
};


export const redirectIfAuthenticated = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }
}

