"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createUserSchema } from "@/lib/validation";
import { addUser } from "@/lib/users-store";

export type RegisterState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  // Validation côté serveur avec Zod.
  const parsed = createUserSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Veuillez corriger les erreurs ci-dessous.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  // Mutation : ajout de l'utilisateur au store.
  const user = addUser({
    username: parsed.data.username,
    email: parsed.data.email,
  });

  // Revalidation du cache de la liste des utilisateurs après la mutation.
  revalidatePath("/users");

  return {
    status: "success",
    message: `Compte créé pour ${user.username} (#${user.id}).`,
  };
}
