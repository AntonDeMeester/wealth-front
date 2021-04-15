import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

import AccountsPagedRedesigned from "src/kristof/pages/AccountsPage";
import DashboardPage from "src/kristof/pages/DashboardPage";

import "./Router.scss";
import Menu from "./components/Menu";
import AccountsPage from "./pages/Accounts";
import Callback from "./pages/Callback";
import OverviewPage from "./pages/Overview";

export default function BaseRouter({ match }: RouteComponentProps) {
    return (
        <IonSplitPane contentId="main" className="dashboard-router-container">
            <Menu />
            <div id="main" className="dashboard-router-content">
                <IonRouterOutlet className="dashboard-router-outlet">
                    <Route exact path={`${match.url}/overview`} component={OverviewPage} />
                    <Route exact path={`${match.url}/kristof`} component={DashboardPage} />
                    <Route exact path={`${match.url}/accounts`} component={AccountsPage} />
                    <Route exact path={`${match.url}/accounts-2`} component={AccountsPagedRedesigned} />
                    <Route exact path={`${match.url}/tink/callback`} component={Callback}></Route>
                    {/* <Route path={`${match.url}/:name`} component={Page} /> */}
                    <Redirect exact from={`${match.url}`} to={`${match.url}/overview`} />
                </IonRouterOutlet>
            </div>
        </IonSplitPane>
    );
}
