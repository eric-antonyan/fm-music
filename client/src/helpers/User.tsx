import Cookies from "js-cookie"
import { FC } from "react"


export const onLogout = (navigate: (path: string) => void) => {
    Cookies.remove("access_token")
    navigate("/")
}