import {Badge, List, Skeleton} from "antd";

const UpcomingEventSkeleton = () => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Badge color="transparent "/>}
                               title={
                                   <Skeleton.Button
                                       active
                                       style={{
                                           height: '14px',

                                       }}


                                   />}

                               description={
                                   <Skeleton.Button
                                       active
                                       style={{
                                           width: "300px",
                                           marginTop: '8px',
                                           height: '16',

                                       }}
                                   />
                               }
                />

                    </List.Item>
                    )
                };
    export default UpcomingEventSkeleton