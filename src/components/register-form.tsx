"use client";

import { useActionState } from "react";
import { registerUser, type RegisterState } from "@/actions/register";

const initialState: RegisterState = { status: "idle" };

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState
  );

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <Field
        label="Nom d'utilisateur"
        name="username"
        type="text"
        errors={state.errors?.username}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        errors={state.errors?.email}
      />
      <Field
        label="Mot de passe"
        name="password"
        type="password"
        errors={state.errors?.password}
      />

      {state.status === "success" && (
        <p
          aria-live="polite"
          className="rounded bg-green-100 px-3 py-2 text-sm text-green-800"
        >
          {state.message}
        </p>
      )}
      {state.status === "error" && state.message && (
        <p
          aria-live="polite"
          className="rounded bg-red-100 px-3 py-2 text-sm text-red-800"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded border p-2 hover:bg-gray-100 disabled:opacity-50"
      >
        {pending ? "Création…" : "Créer le compte"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  errors,
}: {
  label: string;
  name: string;
  type: string;
  errors?: string[];
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="pb-1 text-sm font-medium">
        {label}
      </label>
      <input id={name} name={name} type={type} className="rounded border p-2" />
      {errors?.map(message => (
        <span key={message} className="pt-1 text-xs text-red-600">
          {message}
        </span>
      ))}
    </div>
  );
}
