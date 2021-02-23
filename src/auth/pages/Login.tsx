import { yupResolver } from "@hookform/resolvers/yup";
import { IonButton, IonContent, IonText } from "@ionic/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as yup from "yup";

import { LoginUser } from "src/auth/models";

import CenteredForm from "../../shared/components/CenteredForm";
import WealthInputItem from "../../shared/components/InputItem";
import AuthService from "../services/AuthService";
import "./Login.scss";

export function LoginPage() {
    const history = useHistory();
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const { control, handleSubmit, errors, formState } = useForm<LoginUser>({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    const authService = new AuthService();

    async function login(user: LoginUser) {
        setFormErrors([]);
        try {
            const result = await authService.login(user);
        } catch (e) {
            if (e.response?.status === 401) {
                setFormErrors([e.response.text?.detail || "Login failed"]);
                return;
            } else {
                throw e;
            }
        }
        setFormErrors([]);
        history.push("/app");
    }

    return (
        <IonContent>
            <CenteredForm
                centerVertically={true}
                onSubmit={handleSubmit(login)}
            >
                <WealthInputItem
                    label={"Email"}
                    autocomplete="email"
                    inputmode="email"
                    name="email"
                    required={true}
                    type="email"
                    control={control}
                    errors={errors}
                />
                <WealthInputItem
                    label={"Password"}
                    inputmode="text"
                    name="password"
                    required={true}
                    type="password"
                    control={control}
                    errors={errors}
                />
                <IonButton
                    type="submit"
                    expand="block"
                    disabled={!formState.isValid}
                >
                    Log In
                </IonButton>
                {formErrors.map((error) => (
                    <IonText className="formError">{error}</IonText>
                ))}
            </CenteredForm>
        </IonContent>
    );
}
