import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import { Redirect, Route } from "react-router-dom";

/* React Vis: Nice graphs */
import "react-vis/dist/style.css";

import AuthRouter from "./auth/Router";
import { addInterceptors } from "./interceptors";
import BasePage from "./pages/Base";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
    addInterceptors();
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main">
                    <Route path="/auth" component={AuthRouter} />
                    <Route path="/app" component={BasePage} />
                    <Redirect exact from="/" to="/app" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
