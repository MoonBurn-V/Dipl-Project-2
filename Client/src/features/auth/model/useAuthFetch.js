import { useAuth } from '@/providers/AuthContext'
import { jwtDecode } from 'jwt-decode'

export const useAuthFetch = () => {
  const { token, logout, login } = useAuth()

  const isTokenExpired = (token) => {
    if (!token) return true
    try {
      const decoded = jwtDecode(token)
      const now = Date.now() / 1000
      return decoded.exp < now + 3
    } catch {
      return true
    }
  }

  const refreshToken = async () => {
    const r = await fetch('/api/user/refresh', {
      method: 'POST',
      credentials: 'include'
    })

    if (!r.ok) {
      logout()
      throw new Error("Refresh failed")
    }

    const data = await r.json()
    login(data.accessToken, JSON.parse(localStorage.getItem("user")))
    return data.accessToken
  }

  const authFetch = async (url, options = {}) => {
    let currentToken = token

    if (isTokenExpired(currentToken)) {
      currentToken = await refreshToken()
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${currentToken}`
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    })

    if (res.status === 401) {
      logout()
    }

    return res
  }

  return authFetch
}