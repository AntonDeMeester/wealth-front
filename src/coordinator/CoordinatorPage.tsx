import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import AuthRouter from "src/auth/Router";
import AuthService from "src/auth/services/AuthService";
import BaseRouter from "src/dashboard/Router";

import Callback from "./Callback";
import { addInterceptors } from "./Interceptors";

export const CoordinatorPage = () => {
    addInterceptors();
    const authService = new AuthService();

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main">
                    <Route path="/auth" component={AuthRouter} />
                    <Route
                        path="/app"
                        render={(props) =>
                            authService.isLoggedIn() ? (
                                <BaseRouter {...props} />
                            ) : (
                                <Redirect to={{ pathname: "/auth" }} />
                            )
                        }
                    />
                    <Route path="/callback" component={Callback}></Route>
                    <Redirect exact from="/" to="/app" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};
