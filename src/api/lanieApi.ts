import Cookies from "js-cookie";

const baseUrl = "https://lanie-backend-mongodb.onrender.com/"
// const baseUrl = "http://localhost:8080/"

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
    const res = await fetch(`${baseUrl}api/products?search=${search}&limit=100`, {
        next: { tags: ['product'] },
        cache: "no-store",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json();
    return data
}

export async function getAccounts() {
    const res = await fetch(`${baseUrl}api/users`, {
        next: { tags: ['users'] },
        cache: "no-store",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json();
    return data
}

export async function getOrders() {
    const res = await fetch(`${baseUrl}api/orders`, {
        next: { tags: ['orders'] },
        cache: "no-store",
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
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    })
    const data = await res.json();
    return data
}

export async function getOneOrder(id: string) {
    const res = await fetch(`${baseUrl}api/orders/${id}`, {
        method: "GET",
        cache: "no-store",
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

export async function changeStatusOrder(id: string, body: {
    status: string;
}) {
    const res = await fetch(`${baseUrl}api/orders/${id}`, {
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
