import * as  React from "react";
import Button from "reactstrap/lib/Button";
import { playSound_ButtonClick } from "../utils/playSound";
import { zebraOk } from "../zebra/ZebraApi";
import { CSSProperties } from 'react';
import { appState } from "../AppState";

export interface BuhtaButtonProps {
    style?: React.CSSProperties;
    className?: string;
    outline?: boolean;
    active?: boolean;
    block?: boolean;
    color?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<any>;
    big?: boolean;
    small?: boolean;
    accessRasdel?: string;
    hidden?: boolean;
};

export class BuhtaButton extends React.Component<BuhtaButtonProps, any> {
    render() {

        if (this.props.hidden)
            return null;
        if (this.props.accessRasdel && !appState.isUsersHasAccessToRasdel(this.props.accessRasdel))
            return null;
        let className = this.props.className || "";
        if (!this.props.big)
            className += " btn-sm";
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
                style={{ ...this.props.style, ...smallStyle }}
                className={className}
                outline={this.props.outline}
                active={this.props.active}
                block={this.props.block}
                color={this.props.color}
                disabled={this.props.disabled}
                onClick={(e: any) => { playSound_ButtonClick(); if (this.props.onClick) this.props.onClick(e) }}
            //    onTouchStart={(e: any) => { if (zebraOk()) playSound_ButtonClick(); }}

            // onClick={(e: any) => { playSound_ButtonClick(); if (!zebraOk()) this.props.onClick(e) }}
            // onTouchStart={(e: any) => { playSound_ButtonClick(); if (zebraOk()) this.props.onClick(e) }}
            >
                {this.props.children}
            </Button>
        )
    }
}