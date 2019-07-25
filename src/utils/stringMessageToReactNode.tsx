import * as  React from "react";

export function stringMessageToReactNode(message: React.ReactNode) {
    if (typeof message == "string") {
        let strList = message.split("\r");
        if (strList.length == 1)
            return message;
        else
            return strList.map((str: string) => <div>{str}</div>);
    }
    else
        return message;
}