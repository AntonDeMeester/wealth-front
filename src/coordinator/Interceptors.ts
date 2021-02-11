import * as JwtInterceptors from "src/auth/services/JwtInterceptor";

export function addInterceptors() {
    JwtInterceptors.addJwtHeaderInterceptor();
    JwtInterceptors.addRefreshJwtInterceptor();
}
