import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

import config from "../config";

interface Headers {
    [key: string]: string;
}

const baseUrl: string = config.host;
const axiosInstance = axios.create({ baseURL: baseUrl });

class ApiService {
    public async get(
        endpoint: string,
        headers: Headers = {}
    ): Promise<AxiosResponse<any>> {
        return axiosInstance.get(endpoint, { headers: headers });
    }

    public async post(
        endpoint: string,
        data: any = {},
        headers: Headers = {}
    ): Promise<AxiosResponse<any>> {
        if (!headers["Content-Type"]) {
            headers = { ...headers, "Content-Type": "application/json" };
        }
        return axiosInstance.post(endpoint, data, { headers: headers });
    }

    public addRequestInterceptor(
        interceptor: (request: AxiosRequestConfig) => AxiosRequestConfig,
        errorInterceptor?: (error: AxiosError) => Promise<AxiosRequestConfig>
    ): number {
        return axiosInstance.interceptors.request.use(
            interceptor,
            errorInterceptor
        );
    }

    public removeRequestInterceptor(interceptorId: number) {
        axiosInstance.interceptors.request.eject(interceptorId);
    }

    public addResponseInterceptor(
        interceptor: (response: AxiosResponse) => AxiosResponse,
        errorInterceptor?: (error: AxiosError) => Promise<AxiosResponse>
    ): number {
        return axiosInstance.interceptors.response.use(
            interceptor,
            errorInterceptor
        );
    }

    public removeResponseInterceptor(interceptorId: number) {
        axiosInstance.interceptors.response.eject(interceptorId);
    }
}

export default ApiService;
