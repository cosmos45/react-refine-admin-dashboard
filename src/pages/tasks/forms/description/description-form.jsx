import { useForm } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Space } from "antd";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";
export const DescriptionForm = ({ initialValues, cancelForm }) => {
    const { formProps, saveButtonProps } = useForm({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        onMutationSuccess: () => {
            cancelForm();
        },
        meta: {
            gqlMutation: UPDATE_TASK_MUTATION,
        },
    });
    return (<>
            <Form {...formProps} initialValues={initialValues}>
                <Form.Item noStyle name="description">
                    <MDEditor preview="edit" data-color-mode="light" height={250}/>
                </Form.Item>
            </Form>
            <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            marginTop: "12px",
        }}>
                <Space>
                    <Button type="default" onClick={cancelForm}>
                        Cancel
                    </Button>
                    <Button {...saveButtonProps} type="primary">
                        Save
                    </Button>
                </Space>
            </div>
        </>);
};
