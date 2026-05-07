export const getCheckTest = async (payload) => {
    const res = await fetch('/api/test/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const result = await res.json()
    return result
}