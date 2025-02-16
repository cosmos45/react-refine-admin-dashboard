import {Col, Form, Input, InputNumber, Row, Select} from 'antd'
import {Edit, useForm, useSelect} from "@refinedev/antd";
import {UPDATE_COMPANY_MUTATION} from "@/graphql/mutations";
import CustomAvatar from "@/components/layout/custom-avatar";
import {getNameInitials} from "@/utilities";
import {SelectOptionWithAvatar} from "@/components/SelectOptionAvatar";
import {GetFieldsFromList} from "@refinedev/nestjs-query";
import {UsersSelectQuery} from "@/graphql/types";
import {USERS_SELECT_QUERY} from "@/graphql/queries";
import {businessTypeOptions, companySizeOptions, industryOptions} from "@/constants";
import {CompanyContactsTable} from "@/pages/company/contacts-table";

const EditPage = () => {
    const  { saveButtonProps, formLoading,formProps, queryResult } = useForm({
        redirect : false,
        meta : {
            gqlMutation: UPDATE_COMPANY_MUTATION
        }
    })
    const { avatarUrl, name } = queryResult?.data?.data || {};

    const { selectProps, queryResult: queryResultUsers } = useSelect<
        GetFieldsFromList<UsersSelectQuery>
    >({
        resource: "users",
        meta: {
            gqlQuery: USERS_SELECT_QUERY,
        },
        optionLabel: "name",
        pagination: {
            mode: "off"
        }
    });

    return (
       <div>
           <Row gutter = {[32, 32]}>
               <Col xs={24} sm={24} xl={12}>
                   <Edit
                   isLoading={formLoading}
                   saveButtonProps={saveButtonProps}
                   breadcrumb={false}>
                       <Form {...formProps} layout='vertical'>
                           <CustomAvatar
                               shape="square"
                               src={avatarUrl}
                               name={getNameInitials(name || "")}
                               style={{
                                   width: 96,
                                   height: 96,
                                   marginBottom: "24px",
                               }}
                           />
                           <Form.Item
                               label="Sales owner"
                               name="salesOwnerId"
                               initialValue={formProps?.initialValues?.salesOwner?.id}
                           >
                               <Select
                                   {...selectProps}
                                   options={
                                       queryResultUsers.data?.data?.map(({ id, name, avatarUrl }) => ({
                                           value: id,
                                           label: (
                                               <SelectOptionWithAvatar
                                                   name={name}
                                                   avatarUrl={avatarUrl ?? undefined}
                                               />
                                           ),
                                       })) ?? []
                                   }
                               />
                           </Form.Item>
                           <Form.Item label="Company size" name="companySize">
                               <Select options={companySizeOptions} />
                           </Form.Item>
                           <Form.Item label="Total revenue" name="totalRevenue">
                               <InputNumber
                                   autoFocus
                                   addonBefore={"$"}
                                   min={0}
                                   placeholder="0,00"
                                   formatter={(value) =>
                                       `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                   }
                               />
                           </Form.Item>
                           <Form.Item label="Industry" name="industry">
                               <Select options={industryOptions} />
                           </Form.Item>
                           <Form.Item label="Business type" name="businessType">
                               <Select options={businessTypeOptions} />
                           </Form.Item>
                           <Form.Item label="Country" name="country">
                               <Input placeholder="Country" />
                           </Form.Item>
                           <Form.Item label="Website" name="website">
                               <Input placeholder="Website" />
                           </Form.Item>
                       </Form>
                   </Edit>
               </Col>
               <Col xs={24} sm={24} xl={12}>
                   <CompanyContactsTable />
               </Col>
           </Row>
       </div>
    )
}
export default EditPage
