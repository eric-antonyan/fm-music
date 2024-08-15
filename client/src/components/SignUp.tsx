import { Text } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SignUpComponentInterface } from "../interfaces/SignUpComponent.interface";
import { CreateUserInteface } from "../interfaces/createUser.interface";
import { request } from "../entities/constants";
import styles from "../styles/Auth.module.css";

const SignUp: FC<SignUpComponentInterface> = ({ component }) => {
    const [errors, setErrors] = useState<string | string[]>([]);
    const [isResponsed, setIsResponsed] = useState<boolean>(true);
    const [responseData, setResponseData] = useState<any>(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const formsRef = useRef<NodeListOf<HTMLFormElement> | null>(null);

    const [registerFormData, setRegisterFormData] =
        useState<CreateUserInteface>({
            name: "",
            email: "",
            password: "",
        });

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setRegisterFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const isValid =
            registerFormData.name !== "" &&
            registerFormData.email !== "" &&
            registerFormData.password !== "";

        setIsDisabled(!isValid); // Enable button when form is valid
    }, [registerFormData]);

    formsRef.current = document.querySelectorAll<HTMLFormElement>("form");

    const signUp = async (e: React.ChangeEvent<HTMLFormElement>) => {
        setIsResponsed(false);
        e.preventDefault();
        setErrors([]);
        setResponseData({});

        try {
            const response = await request.post(
                "users/create",
                registerFormData
            );

            if (response.data.errors && response.data.errors.length > 0) {
                setErrors(response.data.errors);
            } else {
                formsRef.current?.forEach((form) => {
                    form.reset();
                });
                document.documentElement.style.opacity = "0.5";
                document.documentElement.style.pointerEvents = "none";
                setTimeout(() => {
                    document.documentElement.style.opacity = "1";
                    document.documentElement.style.pointerEvents = "all";
                    component?.current?.classList.remove(
                        styles.rightPanelActive
                    );
                    setErrors([]);
                    setResponseData({});
                }, 1000);
                setResponseData(response.data);
                setErrors([]);
            }
        } catch (error: any) {
            if (error?.response) {
                setErrors(error?.response.data.message);
            } else if (error?.request) {
                setErrors("Network error. Please try again.");
            } else {
                setErrors(error.message);
            }
        } finally {
            setIsResponsed(true);
        }
    };
    return (
        <div className={styles.signUp}>
            <form className={styles.formData} onSubmit={signUp} action="#">
                <h1>Create Account</h1>
                <div className={styles.socialContainer}>
                    <Link to="#" className={styles.social}>
                        <FaFacebookF />
                    </Link>
                    <Link to="#" className={styles.social}>
                        <FaGooglePlusG />
                    </Link>
                </div>
                <Text>or use your email for registration</Text>
                <input
                    onChange={handleRegisterChange}
                    name="name"
                    type="text"
                    placeholder="Name"
                />
                <input
                    onChange={handleRegisterChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                />
                <input
                    onChange={handleRegisterChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
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
                    className={styles.formButtonSignUp}
                >
                    {isResponsed ? "Sign Up" : "Signing Up..."}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
