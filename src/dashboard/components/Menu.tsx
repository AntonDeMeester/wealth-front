import {
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
} from "@ionic/react";
import {
    trendingUp,
    trendingUpSharp,
    fileTrayFull,
    fileTrayFullSharp,
} from "ionicons/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import AuthService from "src/auth/services/AuthService";

import "./Menu.css";

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
        iosIcon: trendingUp,
        mdIcon: trendingUpSharp,
    },
    {
        title: "Accounts",
        url: "/app/accounts",
        iosIcon: fileTrayFull,
        mdIcon: fileTrayFullSharp,
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
                    <IonListHeader>Wealth Overview</IonListHeader>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    className={
                                        location.pathname === appPage.url
                                            ? "selected"
                                            : ""
                                    }
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                >
                                    <IonIcon
                                        slot="start"
                                        ios={appPage.iosIcon}
                                        md={appPage.mdIcon}
                                    />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
                <IonButton onClick={() => logout()}>Log out</IonButton>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
