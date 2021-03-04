import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";

import ApiService from "src/core/ApiService";

const apiService = new ApiService();

function Callback() {
    const history = useHistory();
    const queryParams = new URLSearchParams(useLocation().search);
    const code = queryParams.get("code");

    useEffect(() => {
        if (!code) {
            return;
        }
        const processTinkCode = async () => {
            await apiService.post("tink/authorize", { code });
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
