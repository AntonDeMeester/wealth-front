import {
    IonButton,
    IonContent,
    IonFooter,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
} from "@ionic/react";
import { fileTrayFull, logOutOutline, businessOutline, homeOutline } from "ionicons/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import AuthService from "src/auth/services/AuthService";

import "./Menu.scss";

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: "Overview",
        url: "/app/overview",
        iosIcon: homeOutline,
        mdIcon: homeOutline,
    },
    {
        title: "Accounts",
        url: "/app/accounts",
        iosIcon: businessOutline,
        mdIcon: businessOutline,
    },
];

const authService = new AuthService();

const Menu: React.FC = () => {
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        authService.logout();
        history.push("/auth");
    };

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>
                        <div className="menu-header-container">
                            <IonIcon ios={fileTrayFull} md={fileTrayFull} />
                            <p>John Doe</p>
                        </div>
                    </IonListHeader>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    className={location.pathname === appPage.url ? "selected" : ""}
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                >
                                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>
            <IonFooter>
                <IonButton fill="clear" color="dark" onClick={() => logout()}>
                    <IonIcon slot="start" icon={logOutOutline} />
                    Log out
                </IonButton>
            </IonFooter>
        </IonMenu>
    );
};

export default Menu;
