import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

import "./Router.scss";
import Menu from "./components/Menu";
import AccountsPage from "./pages/AccountsPage";
import BanksPage from "./pages/BanksPage";
import Callback from "./pages/Callback";
import DashboardPage from "./pages/DashboardPage";

export default function BaseRouter({ match }: RouteComponentProps) {
    return (
        <IonSplitPane contentId="main" className="dashboard-router-container">
            <Menu />
            <div id="main" className="dashboard-router-content">
                <IonRouterOutlet className="dashboard-router-outlet">
                    <Route exact path={`${match.url}/overview`} component={DashboardPage} />
                    <Route exact path={`${match.url}/accounts`} component={AccountsPage} />
                    <Route exact path={`${match.url}/banks`} component={BanksPage} />
                    <Route exact path={`${match.url}/tink/callback`} component={Callback}></Route>
                    {/* <Route path={`${match.url}/:name`} component={Page} /> */}
                    <Redirect exact from={`${match.url}`} to={`${match.url}/overview`} />
                </IonRouterOutlet>
            </div>
        </IonSplitPane>
    );
}
