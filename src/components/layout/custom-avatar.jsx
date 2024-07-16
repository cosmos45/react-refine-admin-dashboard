import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { getNameInitials } from "@/utilities";
const CustomAvatar = ({ name, style, ...rest }) => {
    return (<AntdAvatar alt={name} size="small" style={{
            backgroundColor: '#2F807F',
            display: 'flex',
            alignItems: 'center',
            border: 'None',
            ...style
        }} {...rest}>
            {getNameInitials(name || '')}
        </AntdAvatar>);
};
export default CustomAvatar;
