import { yupResolver } from "@hookform/resolvers/yup";
import { IonButton, IonContent } from "@ionic/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { CreateUser } from "src/auth/models";
import AuthService from "src/auth/services/AuthService";

import CenteredForm from "../../shared/components/CenteredForm";
import WealthInputItem from "../../shared/components/InputItem";

export function RegisterPage() {
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
        const result = await authService.register(user);
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
            </CenteredForm>
        </IonContent>
    );
}
