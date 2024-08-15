import { createContext, FC, ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "../typings/UserData";
import Cookies from "js-cookie";
import axios from "axios";

interface AuthContextType {
    auth: UserData | undefined;
    isLoading: boolean;
    error: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetchUserData = async (): Promise<UserData> => {
    const response = await axios.post("http://localhost:8080/api/users/authenticate", {
        access_token: Cookies.get("access_token")
    });
    if (!response) {
        throw new Error("Network response was not ok");
    }
    return response.data;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isLoading, error } = useQuery<UserData, Error>({
        queryKey: ["userData"],
        queryFn: fetchUserData,
    });

    return (
        <AuthContext.Provider value={{ auth: data, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export default AuthProvider;
