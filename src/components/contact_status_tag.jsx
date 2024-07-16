import React from "react";
import { CheckCircleOutlined, MinusCircleOutlined, PlayCircleFilled, PlayCircleOutlined, } from "@ant-design/icons";
import { Tag } from "antd";
export const ContactStatusTag = ({ status }) => {
    let icon = null;
    let color = undefined;
    switch (status) {
        case "NEW":
        case "CONTACTED":
        case "INTERESTED":
            icon = <PlayCircleOutlined />;
            color = "cyan";
            break;
        case "UNQUALIFIED":
            icon = <PlayCircleOutlined />;
            color = "red";
            break;
        case "QUALIFIED":
        case "NEGOTIATION":
            icon = <PlayCircleFilled />;
            color = "green";
            break;
        case "LOST":
            icon = <PlayCircleFilled />;
            color = "red";
            break;
        case "WON":
            icon = <CheckCircleOutlined />;
            color = "green";
            break;
        case "CHURNED":
            icon = <MinusCircleOutlined />;
            color = "red";
            break;
        default:
            break;
    }
    return (<Tag color={color} style={{ textTransform: "capitalize" }}>
    {icon} {status.toLowerCase()}
    </Tag>);
};
