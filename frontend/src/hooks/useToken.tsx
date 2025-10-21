export default function useToken() {
    function setToken(token: string) {
        localStorage.setItem("token", JSON.stringify(token))
    }
    function getToken() {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        return token;
    }
    return {
        setToken,
        getToken
    }
}
