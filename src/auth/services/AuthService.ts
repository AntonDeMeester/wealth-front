import { AxiosResponse } from "axios";
import { CreateUser, LoginResponse, LoginUser, RefreshResponse, UserResponse } from "src/auth/models";
import ApiService from "../../core/ApiService";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

class AuthService {
    private apiService: ApiService;
    private routes = {
        login: 'auth/login',
        register: 'auth/user',
        refresh: 'auth/refresh',
    }

    constructor() {
        this.apiService = new ApiService();
    }

    public async login(loginUser: LoginUser): Promise<boolean>{
        const response = await this.apiService.post<LoginResponse>(this.routes.login, loginUser);
        if(response.status !== 200) {
            return false
        }
        this.setAccessToken(response.data.accessToken);
        this.setRefreshToken(response.data.refreshToken);
        return true
    }

    public async register(user: CreateUser): Promise<AxiosResponse<UserResponse>> {
        return this.apiService.post<UserResponse>(this.routes.register, user)
    }

    public async refreshToken(): Promise<AxiosResponse<RefreshResponse>> {
        const refreshToken = this.getRefreshToken()
        const headers =  {Authorization: `Bearer ${refreshToken}`}
        const response = await this.apiService.post<RefreshResponse>(this.routes.refresh, {}, headers);
        if(response.status === 200) {
            this.setAccessToken(response.data.accessToken)
        } else {
            this.resetTokens();
        }
        return response
    }
    
    public getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN) ?? null;
    }

    public setAccessToken(token: string) {
        if(!token) {
            return
        }
        localStorage.setItem(ACCESS_TOKEN, token);
    }

    public resetAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN)
    }

    public getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN) ?? null;
    }

    public setRefreshToken(token: string) {
        if(!token) {
            return
        }
        localStorage.setItem(REFRESH_TOKEN, token);
    }

    public resetRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN)
    }

    public resetTokens() {
        this.resetAccessToken();
        this.resetRefreshToken()
    }

    public isLoggedIn() {
        return !!this.getAccessToken()
    }

}

export default AuthService;