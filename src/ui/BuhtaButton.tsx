import * as  React from "react";
import Button from "reactstrap/lib/Button";
import { playSound_ButtonClick } from "../utils/playSound";
import { zebraOk } from "../zebra/ZebraApi";
import { CSSProperties } from 'react';

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
};

export class BuhtaButton extends React.Component<BuhtaButtonProps, any> {
    render() {
        let className = this.props.className || "";
        if (!this.props.big)
            className += " btn-sm";
        let smallStyle: CSSProperties = {};
        if (this.props.small)
            smallStyle = {
                padding: "0.15rem 0.15rem",
                paddingBottom: "0.25rem",
                lineHeight: 1.2,
                fontSize:11,
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
                onClick={(e: any) => { playSound_ButtonClick(); if (!zebraOk()) this.props.onClick(e) }}
                onTouchStart={(e: any) => { playSound_ButtonClick(); if (zebraOk()) this.props.onClick(e) }}
            >
                {this.props.children}
            </Button>
        )
    }
}