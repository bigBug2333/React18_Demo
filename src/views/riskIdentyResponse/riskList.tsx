import './riskList.scss'
import { Tree, Form, Input, Select, Row, Col, Button, Space, Table, Pagination } from 'antd';
import {
    SearchOutlined,
    ClearOutlined,
} from '@ant-design/icons';
import type { DataNode, TreeProps } from 'antd/es/tree';
import getEntTreeData from '../../mock/riskIdentyResponse/getEntTree.json'
import queryTaskListData from '../../mock/riskIdentyResponse/queryTaskList.json'

const View = () => {
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
    const convertToAntdTree = (data: any) => {
        return data.map((item: any) => {
            const antdNode = {
                title: item.title,
                key: item.fcode,
                value: item.value,
                children: [],
            };

            if (item.children && item.children.length > 0) {
                antdNode.children = convertToAntdTree(item.children);
            }

            return antdNode;
        });
    }
    let treeData: DataNode[] = convertToAntdTree(getEntTreeData.data);
    type FieldType = {
        fName?: string;
        fStatus?: string;
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    console.log(getEntTreeData.data, queryTaskListData.rows)

    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '任务名称',
            dataIndex: 'fName',
            key: 'fName',
        },
        {
            title: '税款所属期',
            dataIndex: 'fpreiod',
            key: 'fpreiod',
        },
        {
            title: '执行状态',
            dataIndex: 'fstatusname',
            key: 'fstatusname',
        },
        {
            title: '应对完成度',
            dataIndex: 'completeRate',
            key: 'completeRate',
        },
        {
            title: '操作',
            dataIndex: 'handle',
            key: 'handle',
        },


    ];
    return (
        <div className='home tax-full tax-flex-column'>
            <div className='box tax-flex-item tax-flex ivu-mt-16 mg8'>
                {/* 左侧树 */}

                <div className="tax-layout-item tree-container ivu-mr-16 tax-relative" >
                    <div className="tax-full-position tax-overflow-y bgcBasic">
                        <div className="tax-title tax-flex-vertical pd12">
                            <div className="split"></div>
                            <span className="title">常用工具</span>
                        </div>
                        <Tree
                            // checkable={}
                            defaultExpandedKeys={[treeData[0].key]}
                            defaultSelectedKeys={[treeData[0].key]}
                            defaultCheckedKeys={[treeData[0].key]}
                            onSelect={onSelect}
                            onCheck={onCheck}
                            treeData={treeData}
                        />
                    </div>
                </div >

                {/* 右侧表 */}
                <div className="tax-flex-item tax-flex  mll8 tax-flex-column formTable">

                    <div className='searchForm bgcBasic'>
                        <Form
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            className='pdl12 pdt12'
                        >
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item<FieldType>
                                        label="任务名称"
                                        name="fName"
                                        rules={[{ required: true, message: '任务名称' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item<FieldType>
                                        label="执行状态"
                                        name="fStatus"
                                        rules={[{ required: true, message: '执行状态' }]}
                                    >
                                        <Select
                                            onChange={handleChange}
                                            options={[
                                                { value: 0, label: '待执行' },
                                                { value: 1, label: '执行中' },
                                                { value: 3, label: '已执行待推送' },
                                                { value: 4, label: '已推送' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                </Col>
                                <Col span={6} >
                                    <Space wrap className='flr pdr12'>
                                        <Button type="primary">
                                            <SearchOutlined />
                                        </Button>
                                        <Button>
                                            <ClearOutlined />
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>

                        </Form>
                    </div>
                    <div className='searchTable bgcBasic pda12 tax-flex tax-column-reverse '>
                        <div
                            className='paginationHeight'
                        >
                            <Pagination
                                showSizeChanger
                                showQuickJumper
                                pageSizeOptions={['10', '20', '30']}
                                total={dataSource.length} // 设置总数据量
                                className='flr'

                            />
                        </div>
                        <Table dataSource={queryTaskListData.rows} columns={columns} pagination={false} className='tax-flex-item' />

                    </div>
                </div >
            </div >
        </div >
    )
}

export default View