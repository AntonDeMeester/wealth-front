import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { Route, RouteComponentProps } from "react-router-dom";

/* React Vis: Nice graphs */
import "react-vis/dist/style.css";

import Menu from "../components/Menu";
import OverviewPage from "./Overview";

export default function BasePage({ match }: RouteComponentProps) {
    return (
        <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
                <Route
                    exact
                    path={`${match.url}/overview`}
                    component={OverviewPage}
                />
                {/* <Route path={`${match.url}/:name`} component={Page} /> */}
                {/* <Redirect
                    exact
                    from={`${match.url}`}
                    to={`${match.url}/overview`}
                /> */}
            </IonRouterOutlet>
        </IonSplitPane>
    );
}
