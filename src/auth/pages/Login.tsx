import { IonButton, IonContent } from "@ionic/react";
import { useState } from "react";

import CenteredForm from "../../shared/components/CenteredForm";
import WealthInputItem from "../../shared/components/InputItem";
import AuthService from "../services/AuthService";

export function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const authService = new AuthService();

    const isValid = () => username && password;

    async function login() {
        if (!isValid()) {
            console.log("Invalid");
            return;
        }
        await authService.login(username, password);
    }

    return (
        <IonContent>
            <CenteredForm centerVertically={true}>
                <WealthInputItem
                    value={username}
                    label={"Username"}
                    autocomplete="email"
                    inputmode="email"
                    name="username"
                    required={true}
                    type="email"
                    onIonChange={(e) => setUsername(e.detail.value || "")}
                />
                <WealthInputItem
                    value={password}
                    label={"Password"}
                    inputmode="text"
                    name="username"
                    required={true}
                    type="password"
                    onIonChange={(e) => setPassword(e.detail.value || "")}
                />
                <IonButton onClick={() => login()}>Log In</IonButton>
            </CenteredForm>
        </IonContent>
    );
}
