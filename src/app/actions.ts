"use server";

export async function login(formData: FormData) {
    const username: string = formData.get("username")?.toString() ?? "";
    const password: string = formData.get("password")?.toString() ?? "";
    console.log(username, password);
}
