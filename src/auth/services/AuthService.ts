import { AxiosResponse } from "axios";
import ApiService from "../../core/ApiService";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

class AuthService {
    private apiService: ApiService;
    private routes = {
        login: 'auth/jwt/login',
        register: 'auth/register',
        refresh: 'auth/jwt/refresh',
    }

    constructor() {
        this.apiService = new ApiService();
    }

    public async login(username: string, password: string): Promise<boolean>{
        // Needs to be form URL encoded according to OAth Specs
        const data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);
        data.append('grant_type', 'password');
        const response = await this.apiService.post(this.routes.login, data, {'Content-Type': 'application/x-www-form-urlencoded'});
        if(response.status !== 200) {
            return false
        }
        this.setAccessToken(response.data.access_token);
        this.setRefreshToken(response.data.refresh_token);
        return true
    }

    public async register(username: string, password: string): Promise<AxiosResponse> {
        const data = { username , password }
        return this.apiService.post(this.routes.register, data)
    }

    public async refreshToken(refreshToken: string): Promise<AxiosResponse> {
        return this.apiService.post(this.routes.refresh, {refresh_token: refreshToken});
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

}

export default AuthService;