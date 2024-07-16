import React from 'react';
import { CreateButton, DeleteButton, EditButton, FilterDropdown, getDefaultFilter, List, useTable } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { Input, Space, Table } from 'antd';
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { SearchOutlined } from "@ant-design/icons";
import CustomAvatar from "@/components/layout/custom-avatar";
import { Text } from "@/components/text";
import { currencyNumber } from "@/utilities";
const CompanyList = ({ children }) => {
    const go = useGo();
    const { tableProps, filters } = useTable({
        resource: 'companies',
        onSearch: (values) => {
            return [
                {
                    field: 'name',
                    operator: 'contains',
                    value: values.name,
                }
            ];
        },
        pagination: {
            pageSize: 12,
        },
        sorters: {
            initial: [
                {
                    field: 'createdAt',
                    order: 'desc'
                }
            ]
        },
        filters: {
            initial: [
                {
                    field: 'name',
                    operator: 'contains',
                    value: undefined
                }
            ]
        },
        meta: {
            gqlQuery: COMPANIES_LIST_QUERY
        }
    });
    return (<div>
        <List breadcrumb={false} headerButtons={() => (<CreateButton onClick={() => {
                go({
                    to: {
                        resource: 'companies',
                        action: 'create'
                    },
                    options: {
                        keepQuery: true
                    },
                    type: 'replace'
                });
            }}/>)}>
            <Table {...tableProps} pagination={{
            ...tableProps.pagination,
        }}>
                <Table.Column title="Company Title" dataIndex="name" defaultFilteredValue={getDefaultFilter('id', filters)} filterIcon={<SearchOutlined />} filterDropdown={(props) => (<FilterDropdown {...props}>
                                <Input placeholder="Search Company"/>


                            </FilterDropdown>)} render={(value, record) => (<Space>
                            <CustomAvatar shape="square" name={record.name} src={record.avatarUrl}/>
                            <Text style={{ whitespace: 'nowrap' }}>
                                {record.name}
                            </Text>
                        </Space>)}/>
                <Table.Column dataIndex="totalRevenue" title="Open deals amount" render={(value, company) => (<Text>
                            {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
                        </Text>)}/>


                <Table.Column dataIndex="id" title="Actions" fixed="right" render={(value) => (<Space>
                            <EditButton hideText size="small" recordItemId={value}/>
                            <DeleteButton hideText size="small" recordItemId={value}/>
                        </Space>)}/>



            </Table>


        </List>
    {children}
    </div>);
};
export default CompanyList;
