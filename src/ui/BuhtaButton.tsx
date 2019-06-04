import * as  React from "react";
import Button from "reactstrap/lib/Button";
import { playSound_ButtonClick } from "../utils/playSound";
import { zebraOk } from "../zebra/ZebraApi";

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
};

export class BuhtaButton extends React.Component<BuhtaButtonProps, any> {
    render() {
        let className = this.props.className || "";
        if (!this.props.big)
            className += " btn-sm";

        return (
            <Button
                style={this.props.style}
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