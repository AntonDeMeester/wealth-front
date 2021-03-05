import { yupResolver } from "@hookform/resolvers/yup";
import { IonButton, IonContent, IonToast } from "@ionic/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as yup from "yup";

import { CreateUser } from "src/auth/models";
import AuthService from "src/auth/services/AuthService";

import CenteredForm from "../../shared/components/CenteredForm";
import WealthInputItem from "../../shared/components/InputItem";

export function RegisterPage() {
    const history = useHistory();
    const [showToast, setShowToast] = useState<boolean>(false);
    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        password: yup.string().required(),
        password2: yup
            .string()
            .required()
            .oneOf([yup.ref("password")], "Passwords must match"),
    });

    const { control, handleSubmit, errors, formState } = useForm<CreateUser>({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    const authService = new AuthService();

    async function register(user: CreateUser) {
        try {
            const result = await authService.register(user);
            if (result.status < 400) {
                history.push("/auth/login");
            } else {
                setShowToast(true);
            }
        } catch {
            setShowToast(true);
        }
    }

    return (
        <IonContent>
            <CenteredForm
                centerVertically={true}
                onSubmit={handleSubmit(register)}
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
                    label={"First name"}
                    autocomplete="given-name"
                    inputmode="text"
                    name="firstName"
                    required={true}
                    type="text"
                    control={control}
                    errors={errors}
                />
                <WealthInputItem
                    label={"Last name"}
                    autocomplete="family-name"
                    inputmode="text"
                    name="lastName"
                    required={true}
                    type="text"
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
                <WealthInputItem
                    label={"Password"}
                    inputmode="text"
                    name="password2"
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
                    Register
                </IonButton>
                <p>
                    Already a user? Login <a href="/auth/login">here</a>
                </p>
            </CenteredForm>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Something went wrong."
                duration={2000}
            />
        </IonContent>
    );
}
