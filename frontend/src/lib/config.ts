const _config = {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api/v1",
}
export const config = Object.freeze(_config)
