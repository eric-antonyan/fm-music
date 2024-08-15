import { FC, useEffect } from "react";
import Header from "../components/Header";
import AuthComponent from "../components/AuthComponent";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";
import { UserData } from "../typings/UserData";

const Auth: FC = () => {
    const {auth} = useAuth()

    return (
        <div>
            <Header authenticated={auth ? true : false} user={auth as UserData} />
            <AuthComponent />
        </div>
    );
};

export default Auth;
