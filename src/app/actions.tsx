'use server'
import { revalidatePath, revalidateTag } from "next/cache";
import { addCollectionProps, addColorProps, addProductProps, loginProps } from "@/types/types";
import Cookies from "js-cookie";

const baseUrl = "https://lanie-backend-mongodb.onrender.com/"
const token = Cookies.get('token')

export async function deleteProduct(id: string) {

    const res = await fetch(`${baseUrl}api/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },

    })
    /*    revalidatePath("/dashboard/products") */
    revalidateTag('product');
    const data = await res.json()
    return data
}

export async function addProduct(body: addProductProps) {

    const res = await fetch(`${baseUrl}api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    })
    /*    revalidatePath("/dashboard/products") */
    revalidateTag('product');
    const data = await res.json();
    return data
}

export async function updateProduct(id: string, body: addProductProps) {

    const res = await fetch(`${baseUrl}api/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    })
    /*    revalidatePath("/dashboard/products") */
    revalidateTag('product');
    const data = await res.json();
    return data
}

export async function deleteColor(id: string) {

    const res = await fetch(`${baseUrl}api/colors/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    /*   revalidatePath("/dashboard/colors") */
    revalidateTag('color');
    const data = await res.json()
    return data
}



export async function addColor(body: addColorProps) {

    const res = await fetch(`${baseUrl}api/colors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    /*   revalidatePath("/dashboard/colors") */
    revalidateTag('color');
    const data = await res.json();
    return data
}

export async function login(body: loginProps) {

    const res = await fetch(`${baseUrl}api/auth/sign-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    return data
}

export async function deleteCollection(id: string) {

    const res = await fetch(`${baseUrl}api/collections/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },

    })
    revalidatePath("/dashboard/collections")
    const data = await res.json()
    return data
}

export async function addCollection(body: addCollectionProps) {

    const res = await fetch(`${baseUrl}api/collections`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    })
    revalidatePath("/dashboard/collections")
    const data = await res.json();
    return data
}