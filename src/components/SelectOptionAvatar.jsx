import CustomAvatar from "@/components/layout/custom-avatar";
import { Text } from "@/components/text";
export const SelectOptionWithAvatar = ({ avatarUrl, name, shape }) => {
    return (<div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
        }}>
    <CustomAvatar shape={shape} name={name} src={avatarUrl}/>
    <Text>{name}</Text>
    </div>);
};
