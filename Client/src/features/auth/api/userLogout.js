export const userLogout = async () => {
    const res = await fetch('/api/user/logout', {
        method: 'POST',
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error("Logout failed")
    }

    return await res.json()
}