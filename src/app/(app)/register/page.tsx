import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="mb-6 text-2xl font-bold">Créer un compte</h1>
      <RegisterForm />
    </div>
  );
}
