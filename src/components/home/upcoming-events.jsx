import React, { useState } from 'react';
import { Badge, Card, List } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { Text } from "@/components/text";
import { UpcomingEventsSkeleton } from "@/components";
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries";
import { useList } from "@refinedev/core";
import { getDate } from "@/utilities/helpers";
import dayjs from "dayjs";
const UpcomingEvents = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data, isLoading: eventsLoading } = useList({
        resource: "events",
        pagination: {
            pageSize: 5,
        },
        sorters: [
            {
                field: "startDate",
                order: "asc",
            },
        ],
        filters: [
            {
                field: "startDate",
                operator: "lte",
                value: dayjs().format("YYYY-MM-DD"),
            },
        ],
        meta: {
            gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
        },
    });
    return (<Card style={{ height: '100%' }} headStyle={{ padding: '8px 16px' }} bodyStyle={{ padding: '0 1rem' }} title={<div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                    <CalendarOutlined />

                    <Text size="sm" style={{ marginLeft: "0.7rem" }}>
                        Upcoming events
                    </Text>
                </div>}>
            {isLoading ? (<List itemLayout="horizontal" dataSource={Array.from({ length: 4 }).map((_, index) => ({
                id: index,
            }))} renderItem={() => <UpcomingEventsSkeleton />}/>) :
            (<List itemLayout='horizontal' dataSource={data?.data || []} renderItem={(item) => {
                    const renderDate = getDate(item.startDate, item.endDate);
                    return (<List.Item>
                                    <List.Item.Meta avatar={<Badge color={item.color}/>} title={<Text size='xs'>{renderDate}</Text>} description={<Text ellipsis={{ tooltip: true }} strong>

                                            {item.title}</Text>}/>
                                </List.Item>);
                }}/>)}
            {!isLoading && data?.data.length === 0 && (<span style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '220px'
            }}>
                    No upcoming events
                </span>)}


        </Card>);
};
export default UpcomingEvents;
