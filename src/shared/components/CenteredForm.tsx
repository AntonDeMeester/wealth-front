import React from "react";

import "./CenteredForm.scss";

interface CenteredFormProps {
    children: React.ReactNode;
    centerVertically: boolean;
}

function CenteredForm({ children, centerVertically }: CenteredFormProps) {
    return (
        <div
            className="container"
            style={centerVertically ? { justifyContent: "center" } : {}}
        >
            <div className="form">{children}</div>
        </div>
    );
}

export default CenteredForm;
