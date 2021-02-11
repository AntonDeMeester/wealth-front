import React from "react";

import "./CenteredForm.scss";

interface CenteredFormProps {
    children: React.ReactNode;
    centerVertically: boolean;
    [key: string]: any;
}

function CenteredForm({
    children,
    centerVertically,
    ...props
}: CenteredFormProps) {
    return (
        <div
            className="container"
            style={centerVertically ? { justifyContent: "center" } : {}}
        >
            <form className="form" {...props}>
                {children}
            </form>
        </div>
    );
}

export default CenteredForm;
