import { handleAuthSubmit } from "./authHandlers";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode")

describe("handleAuthSubmit", () => {
    let formData
    let login
    let closeAuth
    let setErrors

    beforeEach(() => {
        formData = {
            login: "testUser",
            email: "test@mail.com",
            password: "123456"
        };

        login = jest.fn()
        closeAuth = jest.fn()
        setErrors = jest.fn()

        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("успешный логин", async () => {
        const fakeToken = "fake.jwt.token"

        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                accessToken: fakeToken
            })
        })

        jwtDecode.mockReturnValue({
            id: 1,
            role: "USER"
        })

        await handleAuthSubmit(
            formData,
            "Вход",
            login,
            closeAuth,
            setErrors
        )

        expect(fetch).toHaveBeenCalledWith(
            "/api/user/login",
            expect.objectContaining({
                method: "POST"
            })
        )

        expect(jwtDecode).toHaveBeenCalledWith(fakeToken)

        expect(login).toHaveBeenCalledWith(fakeToken, {
            id: 1,
            role: "USER"
        })

        expect(closeAuth).toHaveBeenCalled()
    })

    test("успешная регистрация", async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                accessToken: "token"
            })
        })

        jwtDecode.mockReturnValue({
            id: 2,
            role: "ADMIN"
        })

        await handleAuthSubmit(
            formData,
            "Регистрация",
            login,
            closeAuth,
            setErrors
        )

        expect(fetch).toHaveBeenCalledWith(
            "/api/user/registration",
            expect.objectContaining({
                body: JSON.stringify({
                    name: formData.login,
                    email: formData.email,
                    password: formData.password
                })
            })
        )
    })

    test("ошибка сервера", async () => {
        fetch.mockResolvedValue({
            ok: false,
            json: async () => ({
                message: "Неверные данные"
            })
        })

        await handleAuthSubmit(
            formData,
            "Вход",
            login,
            closeAuth,
            setErrors
        )

        expect(setErrors).toHaveBeenCalled()

        const setErrorsCallback = setErrors.mock.calls[0][0]
        const result = setErrorsCallback({})

        expect(result.server).toBe("Неверные данные")

        expect(login).not.toHaveBeenCalled()
        expect(closeAuth).not.toHaveBeenCalled()
    })

    test("ошибка сети", async () => {
        fetch.mockRejectedValue(new Error("Network error"))

        await handleAuthSubmit(
            formData,
            "Вход",
            login,
            closeAuth,
            setErrors
        )

        const setErrorsCallback = setErrors.mock.calls[0][0]
        const result = setErrorsCallback({})

        expect(result.server).toBe("Ошибка сети")
    })
})