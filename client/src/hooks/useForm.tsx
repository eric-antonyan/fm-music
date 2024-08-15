import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { ErrorType } from "../typings/ErrorType";

interface useFetchIntarface {
    location: string;
    details: {
        method: "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
        body?: any;
        headers?: Record<string, string>;
    };
}

export const useFetch = async (
    location: string,
    details: useFetchIntarface["details"]
) => {
    const [data, setData] = useState<any>();
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState<boolean>(true);
    const url = `http://localhost:8080/${location}`;

    const config: AxiosRequestConfig = {
        method: details.method,
        data: details.body,
        headers: details.headers
            ? details.headers
            : { "Content Type": "application/json" },
    };

    try {
        const response = await axios(url, config);
        setLoading(false)
        setData(response.data);
    } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error) && error.response) {
            const typedError: ErrorType = { response: error.response };

            console.log("Error Fetching data:", typedError);
            throw typedError
        } else {
            console.error("An unexpected error occurred:", error);
            throw error;
        }
    }

    return {
        data,
        error,
        loading
    }
};
