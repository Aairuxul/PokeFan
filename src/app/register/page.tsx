import { registerUser } from "@/actions/register";

export default async function register() {
    const result = await registerUser(new FormData())
    return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <form action="result" className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col">
                <label htmlFor="username" className="pb-1">Username:</label>
                <input type="text" id="username" name="username" placeholder="Username" className="p-1" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="pb-1">Email:</label>
                <input type="email" id="email" name="email" placeholder="Email" className="p-1" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="pb-1">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" className="p-1" />
            </div>
            <button type="submit" className="mt-4 border p-2 rounded hover:bg-gray-700">Register</button>
        </form>
    </div>
    )
}
