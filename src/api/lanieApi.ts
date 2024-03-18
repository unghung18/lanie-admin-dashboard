import Cookies from "js-cookie";

const baseUrl = "https://lanie-backend-mongodb.onrender.com/"
const token = Cookies.get('token')

export async function getProfile() {
    const res = await fetch(`${baseUrl}api/auth/get-profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json();
    return data
}

export async function updateUser(id: string, body: {
    name: string;
    email: string;
}) {
    const res = await fetch(`${baseUrl}api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    return data
}

export async function getColors(search: string) {
    const res = await fetch(`${baseUrl}api/colors?search=${search}`, {
        next: { tags: ['color'] },
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json();
    return data
}

export async function getProducts(search: string) {
    const res = await fetch(`${baseUrl}api/products?search=${search}`, {
        next: { tags: ['product'] },
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json();
    return data
}
export async function getOneProduct(id: string) {
    const res = await fetch(`${baseUrl}api/products/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json();
    return data
}

export async function getCollections() {
    const res = await fetch(`${baseUrl}api/collections`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json();
    return data
}
