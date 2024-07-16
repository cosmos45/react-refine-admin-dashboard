import React from 'react';
import { Card } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { Area } from "@ant-design/plots";
import { Text } from "@/components/text";
import { useList } from "@refinedev/core";
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries";
import { mapDealsData } from "@/utilities/helpers";
const DealsCharts = () => {
    const { data } = useList({
        resource: 'dealStages',
        filters: [
            {
                field: 'title',
                operator: 'in',
                value: ['WON', 'LOST']
            }
        ],
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY
        }
    });
    const dealData = React.useMemo(() => {
        return mapDealsData(data?.data);
    }, [data?.data]);
    const config = {
        data: dealData,
        xField: 'timeText',
        yField: 'value',
        isStack: false,
        seriesField: 'state',
        animation: true,
        startOnZero: false,
        smooth: true,
        legend: {
            offsetY: -6
        },
        yAxis: {
            tickCount: 4,
            label: {
                formatter: (v) => {
                    return `$${Number(v) / 1000}k`;
                }
            }
        },
        tooltip: {
            formatter: (data) => {
                return {
                    name: data.state,
                    value: `$${Number(data.value) / 1000}k`,
                };
            }
        }
    };
    return (<Card style={{ height: '100%' }} headStyle={{ padding: '8px 16px' }} bodyStyle={{ padding: '24px 24px 0 24px' }} title={<div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <DollarOutlined />
                <Text size="sm" style={{ marginLeft: "0.5rem" }}>
                    Deals
                </Text>

            </div>}>
            <Area {...config} height={325}/>

        </Card>);
};
export default DealsCharts;
