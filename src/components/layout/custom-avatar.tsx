import React from 'react'
import {Avatar as AntdAvatar, AvatarProps} from 'antd'
import {getNameInitials} from "@/utilities";
type Props = AvatarProps & {
    name?: string;
}
const CustomAvatar = ({name, style, ...rest} : Props) => {
    return (
        <AntdAvatar
        alt={name}
            size="small"
            style={{
                backgroundColor: '#2F807F',
                display: 'flex',
                alignItems: 'center',
                border: 'None',
                    ...style

        }}
           {...rest}
        >
            {getNameInitials(name|| '' )}
        </AntdAvatar>
    )
}
export default CustomAvatar
