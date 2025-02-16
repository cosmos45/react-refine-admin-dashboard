import { useForm, useSelect } from "@refinedev/antd";
import { FlagOutlined } from "@ant-design/icons";
import { Checkbox, Form, Select, Space } from "antd";
import { AccordionHeaderSkeleton } from "@/components";
import { TASK_STAGES_SELECT_QUERY } from "@/graphql/queries";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";
export const StageForm = ({ isLoading }) => {
    const { formProps } = useForm({
        queryOptions: {
            enabled: false,
        },
        autoSave: {
            enabled: true,
            debounce: 0,
        },
        meta: {
            gqlMutation: UPDATE_TASK_MUTATION,
        },
    });
    const { selectProps } = useSelect({
        resource: "taskStages",
        filters: [
            {
                field: "title",
                operator: "in",
                value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
            },
        ],
        sorters: [
            {
                field: "createdAt",
                order: "asc",
            },
        ],
        meta: {
            gqlQuery: TASK_STAGES_SELECT_QUERY,
        },
    });
    if (isLoading) {
        return <AccordionHeaderSkeleton />;
    }
    return (<div style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}>
            <Form layout="inline" style={{
            justifyContent: "space-between",
            alignItems: "center",
        }} {...formProps}>
                <Space size={5}>
                    <FlagOutlined />
                    <Form.Item noStyle name={["stageId"]} initialValue={formProps?.initialValues?.stage?.id}>
                        <Select {...selectProps} popupMatchSelectWidth={false} options={selectProps.options?.concat([
            {
                label: "Unassigned",
                value: null,
            },
        ])} bordered={false} showSearch={false} placeholder="Select a stage" onSearch={undefined} size="small"/>
                    </Form.Item>
                </Space>
                <Form.Item noStyle name="completed" valuePropName="checked">
                    <Checkbox>Mark as complete</Checkbox>
                </Form.Item>
            </Form>
        </div>);
};
