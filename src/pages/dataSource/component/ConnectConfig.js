/**
 * Created by wzb on 2018/4/19.
 * 连接信息
 */

import React, {Component} from 'react';
import update from 'immutability-helper';
import {Layout, Icon, Row, Tabs, Col, Checkbox, Radio, Select, Table, Modal, Form, Input, Button, message, Divider} from 'antd'
const {Content} = Layout;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;

const formItemLayout = {
    labelCol: {span: 2},
    wrapperCol: {span: 10},
};
const formItemLayout2 = {
    labelCol: {span: 14},
    wrapperCol: {span: 10},
};

export default class ConnectConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.dataSourceType
        }
    }

    // 表头字段
    columns = [
        {
            title: '连接名称',
            dataIndex: 'name'
        }, {
            title: '地址',
            dataIndex: 'ip'
        }, {
            title: '数据库名',
            dataIndex: 'database'
        }, {
            title: '根目录',
            dataIndex: 'rootDir'
        }, {
            title: '端口',
            dataIndex: 'port'
        }, {
            title: '用户名',
            dataIndex: 'username'
        }, {
            title: '创建组织',
            dataIndex: 'cg'
        }, {
            title: '创建人',
            dataIndex: 'cu'
        }, {
            title: '创建时间',
            dataIndex: 'ct'
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => {
                switch (text) {
                    case '1':
                        return (
                            <span>可用</span>
                        );
                    case '2':
                        return (
                            <span>新建</span>
                        );
                    case '0':
                        return (
                            <span>不可用</span>
                        )
                }
            }
        }, {
            title: '状态说明',
            dataIndex: 'statusReason',
            width: 150
        }, {
            title: '状态更新时间',
            dataIndex: 'statusTime'
        }
    ];

    // 已选数据库和表单表头字段
    databaseAndTableColumns = [
        {
            title: '数据库名称',
            dataIndex: 'databaseName'
        }, {
            title: '表单名称',
            dataIndex: 'tableName'
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span onClick={(e) => this.deleteConnect(record, e)}>删除</span>
            )
        }
    ];

    // 表单关联表头字段
    tableRelationColumns = [
        {
            title: '规则',
            dataIndex: 'rule'
        }, {
            title: '库表名称',
            dataIndex: 'tableName1',
            render: (text, record) => (
                <Select style={{width: '50px'}}/>
            )
        }, {
            title: '字段名称',
            dataIndex: 'fieldName1',
            render: (text, record) => (
                <Select style={{width: '50px'}}/>
            )
        }, {
            title: '关联关系',
            dataIndex: 'relationShip',
            render: (text, record) => (
                <RadioGroup >
                    <Radio value={1}>内联</Radio>
                    <Radio value={2}>左联</Radio>
                </RadioGroup>
            )
        }, {
            title: '库表名称',
            dataIndex: 'tableName2',
            render: (text, record) => (
                <Select style={{width: '50px'}}/>
            )
        }, {
            title: '字段名称',
            dataIndex: 'fieldName2',
            render: (text, record) => (
                <Select style={{width: '50px'}}/>
            )
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span onClick={(e) => this.deleteConnect(record, e)}>删除</span>
            )
        }
    ];

    // 字段预览表头字段
    fieldPreviewColumns = [
        {
            title: '字段1',
            dataIndex: '1'
        }, {
            title: '字段2',
            dataIndex: '2'
        }, {
            title: '字段3',
            dataIndex: '3'
        }, {
            title: '字段4',
            dataIndex: '1'
        }, {
            title: '字段5',
            dataIndex: '5'
        }, {
            title: '字段6',
            dataIndex: '6'
        }
    ];

    data = [];

    options = [
        { label: '字段1', value: '字段1' },
        { label: '字段2', value: '字段2' },
        { label: '字段3', value: '字段3' }
    ];

    render() {
        return (
            <div style={{padding: '10px', height: '100%', overflowY: 'auto'}}>
                <div>
                    <div className="data-connect-title"
                         style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', marginBottom: '16px'}}>
                        远程连接预览
                    </div>
                    <div>
                        <Form layout='horizontal'>
                            <FormItem
                                {...formItemLayout}
                                style={{marginBottom: '5px'}}
                                label="连接名称:">
                                <Input defaultValue='CRM营业库1导出文件连接'/>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                style={{marginBottom: '5px'}}
                                label="连接类型:">
                                <Input defaultValue='MySQL'/>
                            </FormItem>
                        </Form>
                        <Table
                            rowKey='id'
                            pagination={false}
                            className='data-connect-detail'
                            columns={this.columns}
                            dataSource={this.data}
                        />
                    </div>
                </div>
                <div style={{margin: '10px 0'}}>
                    <div className="data-connect-title"
                         style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', marginBottom: '16px'}}>
                        已选数据库和表单
                    </div>
                    <Table
                        rowKey='id'
                        pagination={false}
                        className='data-connect-detail'
                        columns={this.databaseAndTableColumns}
                        dataSource={this.data}
                    />
                </div>
                <div style={{margin: '10px 0'}}>
                    <div className="data-connect-title"
                         style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', marginBottom: '16px'}}>
                        数据库表单关联
                    </div>
                    <Table
                        rowKey='id'
                        pagination={false}
                        className='data-connect-detail'
                        columns={this.tableRelationColumns}
                        dataSource={this.data}
                    />
                </div>
                <div style={{margin: '10px 0'}}>
                    <div className="data-connect-title"
                         style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', marginBottom: '16px'}}>
                        字段编辑
                    </div>
                    <div>
                        <Row>
                            <Col span={6}>
                                <div>
                                    <Checkbox >全选</Checkbox>
                                </div>
                                <CheckboxGroup options={this.options} style={{display: 'flex', flexDirection: 'column'}}/>
                            </Col>
                            <Col span={18}>
                                <p>字段名：字段1</p>
                                <CheckboxGroup  style={{display: 'flex', flexDirection: 'column'}}>
                                    <Checkbox  style={{display: 'flex', alignItems: 'center'}}>
                                        <Form layout='inline'>
                                            <FormItem
                                                {...formItemLayout2}
                                                style={{marginBottom: '5px'}}
                                                label="值映射:">
                                                <Input/>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout2}
                                                style={{marginBottom: '5px'}}
                                                label="转换成:">
                                                <Input/>
                                            </FormItem>
                                            <FormItem>
                                                <Icon type="plus-circle-o"/>
                                            </FormItem>
                                        </Form>
                                    </Checkbox>
                                    <Checkbox style={{display: 'flex', alignItems: 'center', marginLeft: 0}}>
                                        <Form layout='inline'>
                                            <FormItem
                                                {...formItemLayout2}
                                                style={{marginBottom: '5px'}}
                                                label="默认值:">
                                                <Input/>
                                            </FormItem>
                                        </Form>
                                    </Checkbox>
                                </CheckboxGroup>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={{margin: '10px 0'}}>
                    <div className="data-connect-title"
                         style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', marginBottom: '16px'}}>
                        查询条件设置
                    </div>
                    <ul style={{padding: '0'}}>
                        <li style={{listStyleType: 'none'}}>
                            <Form layout='inline'>
                                <FormItem
                                    {...formItemLayout2}
                                    style={{marginBottom: '5px'}}
                                    label="选择库表:">
                                    <Select style={{width: '80px'}}/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout2}
                                    style={{marginBottom: '5px'}}
                                    label="选择字段:">
                                    <Select style={{width: '80px'}}/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout2}
                                    style={{marginBottom: '5px'}}
                                    label="选择运算符:">
                                    <Select style={{width: '80px'}}/>
                                </FormItem>
                                <FormItem>
                                    <Select style={{width: '80px'}}/>
                                </FormItem>
                                <FormItem>
                                    <Input/>
                                </FormItem>
                                <FormItem>
                                    <Icon type="plus-circle-o"/>
                                    <Icon type="minus-circle-o"/>
                                </FormItem>
                            </Form>
                        </li>
                    </ul>
                </div>
                <div style={{margin: '10px 0'}}>
                    <div className="data-connect-title"
                         style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', marginBottom: '16px'}}>
                        FTP服务器设置
                    </div>
                    <Form layout='inline'>
                        <FormItem
                            {...formItemLayout2}
                            style={{marginBottom: '5px'}}
                            label="选择目录:">
                            <Input/>
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>浏览</Button>
                        </FormItem>
                        <FormItem
                            {...formItemLayout2}
                            style={{marginBottom: '5px'}}
                            label="文件名:">
                            <Input/>
                        </FormItem>
                    </Form>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="分割符" key="1">
                            <Button type='default'>空格</Button>
                            <Button type='default'>逗号</Button>
                            <Button type='default'>Tab</Button>
                            <span>其他符号：
                                <Input style={{display: 'inline-block', width: '80px'}}/>
                            </span>
                            <Button type='primary'>确定</Button>
                        </TabPane>
                        <TabPane tab="特定格式" key="2">特定格式</TabPane>
                    </Tabs>

                </div>
                <Table
                    rowKey='id'
                    pagination={false}
                    className='data-connect-detail'
                    columns={this.fieldPreviewColumns}
                    dataSource={this.data}
                />
            </div>
        )
    }
}