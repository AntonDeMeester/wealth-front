import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import AuthRouter from "src/auth/Router";
import AuthService from "src/auth/services/AuthService";
import DashboardRouter from "src/dashboard/Router";

import { addInterceptors } from "./Interceptors";

export const CoordinatorPage = () => {
    addInterceptors();
    const authService = new AuthService();

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main">
                    <Route
                        path="/auth"
                        render={(props) =>
                            !authService.isLoggedIn() ? (
                                <AuthRouter {...props} />
                            ) : (
                                <Redirect to={{ pathname: "/" }} />
                            )
                        }
                    />
                    <Route
                        path="/app"
                        render={(props) =>
                            authService.isLoggedIn() ? (
                                <DashboardRouter {...props} />
                            ) : (
                                <Redirect to={{ pathname: "/auth" }} />
                            )
                        }
                    />
                    <Redirect exact from="/" to="/app/overview" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};
