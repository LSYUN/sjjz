import React, { Component } from 'react';
import { Layout, Form, Table, Icon, Input, Button, Radio, Modal } from 'antd';

import '../../less/metaData/metaData.less';

import { mainSource, partitionSource, structureSource, dataSource } from './data.js';

const { Content } = Layout;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class HiveData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partitionVisible: false,
            structureVisible: false,
            dataVisible: false,
        }
    }
    mainColumns = [
        {
            title: '表名',
            dataIndex: 'TableName',
            key: 'TableName',
            width: '80px',
        }, {
            title: '所属数据源名',
            dataIndex: 'sourceName',
            key: 'sourceName',
            width: '110px',
        }, {
            title: '数据库',
            dataIndex: 'database',
            key: 'database',
            width: '100px',
        }, {
            title: '是否为压缩表',
            dataIndex: 'isCompress',
            key: 'isCompress',
            width: '110px',
        }, {
            title: '表类型',
            dataIndex: 'type',
            key: 'type',
            width: '100px',
        }, {
            title: '大小',
            dataIndex: 'size',
            key: 'size',
            width: '100px',
        }, {
            title: '是否分区',
            dataIndex: 'isPartition',
            key: 'isPartition',
            width: '100px',
        }, {
            title: '分桶数',
            dataIndex: 'count',
            key: 'count',
            width: '80px',
        }, {
            title: '输入格式',
            dataIndex: 'input',
            key: 'input',
            width: '100px',
        }, {
            title: '输出格式',
            dataIndex: 'output',
            key: 'output',
            width: '100px',
        }, {
            title: '存储位置',
            dataIndex: 'position',
            key: 'position',
            width: '100px',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '100px',
        }, {
            title: '创建linux用户',
            dataIndex: 'linuxUser',
            key: 'linuxUser',
            width: '110px',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            className: 'text-overflow',
            width: 110,
            render: (text, record) => (
                <span>
                    <a onClick={this.partitionClick}>查看分区</a>
                    <br />
                    <a onClick={this.structureClick}>查看表结构</a>
                    <br />
                    <a onClick={this.dataClick}>查看数据</a>
                </span>
            )
        }
    ];

    partitionColumns = [
        {
            title: '分区关键字',
            dataIndex: 'keyward',
            key: 'keyward',
            width: '80px'
        }, {
            title: '录入时间',
            dataIndex: 'time',
            key: 'time',
            width: '100px'
        }, {
            title: '存储大小',
            dataIndex: 'size',
            key: 'size',
            width: '100px'
        }
    ];

    structureColumns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: '80px',
        }, {
            title: '字段名',
            dataIndex: 'fieldName',
            key: 'fieldName',
            width: '100px',
        }, {
            title: '字段类型',
            dataIndex: 'fieldType',
            key: 'fieldType',
            width: '100px',
        }, {
            title: '字段别名',
            dataIndex: 'fieldAlias',
            key: 'fieldAlias',
            width: '100px',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: '100px',
        }
    ];

    dataColumns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: '50px',
        }, {
            title: 'kb_hx_iptv_user_info_m.userid',
            dataIndex: 'userid',
            key: 'userid',
            width: '180px',
        }, {
            title: 'kb_hx_iptv_info_m.widthid',
            dataIndex: 'widthid',
            key: 'widthid',
            width: '180px',
        }, {
            title: 'kb_hx_iptv_user_info_m.sum_month',
            dataIndex: 'sum_month',
            key: 'sum_month',
            width: '180px',
        }, {
            title: 'kb_hx_iptv_user_info_m.jk_d_times',
            dataIndex: 'times',
            key: 'times',
            width: '180px',
        }
    ];

    closeModals = () => {
        this.setState({
            partitionVisible: false,
            structureVisible: false,
            dataVisible: false
        });
    };

    partitionClick = () => {
        this.setState({ partitionVisible: true });
    };

    structureClick = () => {
        this.setState({ structureVisible: true });
    };

    dataClick = () => {
        this.setState({ dataVisible: true });
    };

    render() {
        return (
            <Content className="content">
                <Form layout="inline" className="form">
                    <div className="center">
                        <FormItem label="表名">
                            <Input type="text" />
                        </FormItem>
                        <FormItem label="库名">
                            <Input type="text" />
                        </FormItem>
                        <FormItem label="数据源名">
                            <Input type="text" />
                        </FormItem>
                        <FormItem>
                            <RadioGroup onChange={this.onChange} defaultValue="1">
                                <RadioButton value="1">无数据源使用</RadioButton>
                                <RadioButton value="2">数据源使用中</RadioButton>
                            </RadioGroup>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </FormItem>
                    </div>

                </Form>
                <Table
                    className='main-table'
                    columns={this.mainColumns}
                    dataSource={mainSource}
                />
                <Modal title="查看分区" width={800} visible={this.state.partitionVisible} onOk={this.closeModals} onCancel={this.closeModals}>
                    <Table
                        className='partition-table'
                        columns={this.partitionColumns}
                        dataSource={partitionSource}
                    />
                </Modal>
                <Modal title="查看结构" width={800} visible={this.state.structureVisible} onOk={this.closeModals} onCancel={this.closeModals}>
                    <Table
                        className='structure-table'
                        columns={this.structureColumns}
                        dataSource={structureSource}
                    />
                </Modal>
                <Modal title="查看数据" width={850} visible={this.state.dataVisible} onOk={this.closeModals} onCancel={this.closeModals}>
                    <Table
                        className='data-table'
                        columns={this.dataColumns}
                        dataSource={dataSource}
                    />
                </Modal>
            </Content>
        );
    }
}