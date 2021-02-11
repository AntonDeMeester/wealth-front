import { IonButton, IonContent } from "@ionic/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { LoginUser } from "src/auth/models";

import CenteredForm from "../../shared/components/CenteredForm";
import WealthInputItem from "../../shared/components/InputItem";
import AuthService from "../services/AuthService";

export function LoginPage() {
    const { control, handleSubmit, errors } = useForm<LoginUser>();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const authService = new AuthService();

    const isValid = () => username && password;

    async function login() {
        if (!isValid()) {
            console.log("Invalid");
            return;
        }
        await authService.login({ email: username, password });
    }

    return (
        <IonContent>
            <CenteredForm centerVertically={true}>
                <WealthInputItem
                    label={"Username"}
                    autocomplete="email"
                    inputmode="email"
                    name="username"
                    required={true}
                    type="email"
                    control={control}
                />
                <WealthInputItem
                    label={"Password"}
                    inputmode="text"
                    name="username"
                    required={true}
                    type="password"
                    control={control}
                />
                <IonButton onClick={() => login()}>Log In</IonButton>
            </CenteredForm>
        </IonContent>
    );
}
