import { Text } from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { AuthenticateInterface } from "../interfaces/authenticate.interface";
import { request } from "../entities/constants";
import Cookies from "js-cookie";

const SignIn: FC = () => {
    const [formData, setFormData] = useState<AuthenticateInterface>({
        email: "",
        password: "",
    });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [errors, setErrors] = useState([]);
    const [responseData, setResponseData] = useState({ message: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    useEffect(() => {
        const anyEmpty = Object.values(formData).some((value) => value === "");

        setIsDisabled(anyEmpty);
    }, [formData]);

    const signIn = async (e: ChangeEvent<HTMLFormElement>) => {
        setErrors([]);
        setResponseData(Object({}));
        e.preventDefault();

        try {
            const response = await request.post("/users/login", formData);

            console.log(response.data);

            if (response.data.errors && response.data.errors.length > 0) {
                setErrors(response.data.errors);
            } else {
                setResponseData(response.data);
                Cookies.set("access_token", response.data.access_token);
                navigate("/home");
                setErrors([]);
            }
        } catch (error: any) {
            const response = error?.response;

            setErrors(response.data.errors);
            console.log(response.data);
            
        }
    };

    return (
        <div className={styles.signIn}>
            <form onSubmit={signIn} className={styles.formData} action="#">
                <h1>Sign In</h1>
                <div className={styles.socialContainer}>
                    <Link to="#" className={styles.social}>
                        <FaFacebookF />
                    </Link>
                    <Link to="#" className={styles.social}>
                        <FaGooglePlusG />
                    </Link>
                </div>
                <Text>or use your account</Text>
                <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                />
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <Link to="#">Forgot your password?</Link>
                {errors.length > 0 && (
                    <Text color={"red"}>
                        {Array.isArray(errors) ? errors[0] : errors}
                    </Text>
                )}
                {responseData && responseData.message && (
                    <Text color={"green"}>{responseData.message}</Text>
                )}
                <button
                    disabled={isDisabled}
                    className={
                        styles.signInButton + " " + styles.formButtonSignIn
                    }
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
