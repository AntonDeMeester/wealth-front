import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

export default function AuthRouter({ match }: RouteComponentProps) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonRouterOutlet id="main">
                    <Route
                        path={`${match.url}/login`}
                        exact
                        component={LoginPage}
                    />
                    <Route
                        path={`${match.url}/register`}
                        exact
                        component={RegisterPage}
                    />
                    {/* <Route path={`${match.url}/:name`} component={Page} /> */}
                    <Redirect
                        exact
                        from={`${match.url}`}
                        to={`${match.url}/login`}
                    />
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
    );
}
