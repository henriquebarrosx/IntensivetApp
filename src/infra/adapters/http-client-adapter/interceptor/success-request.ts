import { SessionRepository } from "../../../repositories/session"

export function requestInterceptor() {
    async function onSuccess(request: any) {
        const accessToken = await getAccessToken()

        if (request.headers) {
            request.headers.Authorization = accessToken
        }

        return request
    }

    async function getAccessToken(): Promise<string> {
        const sessionInstance = new SessionRepository()
        const session = await sessionInstance.get()
        return session?.current_account.access_token!
    }

    return { onSuccess }
}