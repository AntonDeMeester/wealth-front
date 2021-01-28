import * as JwtInterceptors from "./auth/services/JwtInterceptor";

export function addInterceptors() {
    JwtInterceptors.addJwtHeaderInterceptor();
    JwtInterceptors.addRefreshJwtInterceptor();
}
