import { PropsWithChildren } from "react";

import "./BigCard.scss";

function BigCard({ children }: PropsWithChildren<{}>) {
    return <div className="card-wrapper">{children}</div>;
}

export default BigCard;
