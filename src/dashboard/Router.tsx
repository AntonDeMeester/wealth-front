import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

import Menu from "./components/Menu";
import AccountsPage from "./pages/Accounts";
import OverviewPage from "./pages/Overview";

export default function BaseRouter({ match }: RouteComponentProps) {
    return (
        <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
                <Route
                    exact
                    path={`${match.url}/overview`}
                    component={OverviewPage}
                />
                <Route
                    exact
                    path={`${match.url}/accounts`}
                    component={AccountsPage}
                />
                {/* <Route path={`${match.url}/:name`} component={Page} /> */}
                <Redirect
                    exact
                    from={`${match.url}`}
                    to={`${match.url}/overview`}
                />
            </IonRouterOutlet>
        </IonSplitPane>
    );
}
