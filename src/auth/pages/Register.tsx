import { IonButton, IonContent } from "@ionic/react";
import { useState } from "react";

import CenteredForm from "../../shared/components/CenteredForm";
import WealthInputItem from "../../shared/components/InputItem";

export function RegisterPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    return (
        <IonContent>
            <CenteredForm centerVertically={true}>
                <WealthInputItem
                    label={"Username"}
                    value={username}
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
                    onIonChange={(e: CustomEvent) =>
                        setPassword(e.detail.value || "")
                    }
                />
                <WealthInputItem
                    value={password2}
                    label={"Password"}
                    inputmode="text"
                    name="username"
                    required={true}
                    type="password"
                    onIonChange={(e: CustomEvent) =>
                        setPassword2(e.detail.value || "")
                    }
                />
                <IonButton>Register</IonButton>
            </CenteredForm>
        </IonContent>
    );
}
