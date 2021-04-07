import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";

import ApiService from "src/core/ApiService";

const apiService = new ApiService();

function Callback() {
    const history = useHistory();
    const queryParams = new URLSearchParams(useLocation().search);
    const code = queryParams.get("code");
    const credentialsId = queryParams.get("credentials_id");

    useEffect(() => {
        if (!code && !credentialsId) {
            return;
        }
        const processTinkCode = async () => {
            await apiService.post("tink/callback", { code, credentialsId });
            history.push("/app");
        };
        processTinkCode();
    }, [history, code]);

    if (!code) {
        return <div>Something went wrong</div>;
    }

    return <div>Loading</div>;
}

export default Callback;
