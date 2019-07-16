import * as  React from "react";
import Button from "reactstrap/lib/Button";
import { playSound_ButtonClick } from "../utils/playSound";
import { zebraOk } from "../zebra/ZebraApi";
import { CSSProperties } from 'react';
import { appState } from "../AppState";
import { show_Help } from "../pages/Help_Page";

export interface HelpButtonProps {
    small?: boolean;
};

export class HelpButton extends React.Component<HelpButtonProps, any> {
    render() {

        let className = "btn-sm";
        let smallStyle: CSSProperties = {};
        if (this.props.small)
            smallStyle = {
                padding: "0.15rem 0.15rem",
                paddingBottom: "0.25rem",
                lineHeight: 1.2,
                fontSize: 11,
            };
        return (
            <Button
                style={{ marginLeft: 10, ...smallStyle }}
                className={className}
                outline={true}
                onClick={(e: any) => {
                    playSound_ButtonClick();
                    show_Help(this.props.children);
                }}
            >
                <i className="fa fa-question" style={{ minWidth: 12 }}></i>
            </Button>
        )
    }
}