import { PropsWithChildren } from "react";

import "./BasePage.scss";

interface BasePageProps {
    title: string;
}

function BasePage({ title, children }: PropsWithChildren<BasePageProps>) {
    return (
        <div className="base-page-container">
            <div className="base-page-title-container">
                <h1>{title}</h1>
            </div>
            <div className="base-page-children">{children}</div>
        </div>
    );
}

export default BasePage;
