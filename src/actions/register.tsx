"use server"

export async function registerUser(formData: FormData) {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!username || !email || !password) {
        return "All fields are required to register your account"
    }
    if (password.length < 8) {
        return "Password must be at least 8 characters long"
    }
    if( !email.includes('@') ) {
        return "Please enter a valid email address"
    }
    
    return {
        username,
        email,
        password
    }
}