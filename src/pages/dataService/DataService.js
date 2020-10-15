import React, {Component} from 'react';
import {Layout, Form, Table, Input, Button, Modal, Divider} from 'antd';

import '../../less/dataService/dataService.less';
import {mainSource} from './data.js';

const {Content} = Layout;
const FormItem = Form.Item;


export default class DataService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyVisible: false,
        }
    }

    mainColumns = [
        {
            title: '申请编号',
            dataIndex: 'NO',
            key: 'NO',
            width: '180px',
        }, {
            title: '接口名/数据源名',
            dataIndex: 'name',
            key: 'name',
            width: '180px',
        }, {
            title: '接口类型',
            dataIndex: 'type',
            key: 'type',
            width: '120px',
        }, {
            title: '用途/目标',
            dataIndex: 'target',
            key: 'target',
            width: '120px',
        }, {
            title: '申请时间',
            dataIndex: 'applyTime',
            key: 'applyTime',
            width: '150px',
        }, {
            title: '审批时间',
            dataIndex: 'approveTime',
            key: 'approveTime',
            width: '120px',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '120px',
        }, {
            title: '申请人',
            dataIndex: 'applier',
            key: 'applier',
            width: '120px',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            className: 'text-overflow',
            width: 200,
            render: (text, record) => (
                <span>
                    <a onClick={this.partitionClick}>删除</a>
                    <Divider type="vertical"/>
                    <a onClick={this.modifyClick}>修改</a>
                    <Divider type="vertical"/>
                    <a onClick={this.dataClick}>审批</a>
                </span>
            )
        }
    ];

    // modifyClick = () => {
    //     this.setState({
    //         modifyVisible: true,
    //     });
    // }

    closeModals = () => {
        this.setState({
            modifyVisible: false,
        });
    }

    render() {
        return (
            <Content className="content">
                <Form layout="inline" className="form">
                    <FormItem label="申请编号">
                        <Input type="text"/>
                    </FormItem>
                    <FormItem label="接口名/数据源名">
                        <Input type="text"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </FormItem>
                </Form>
                <Table
                    className='main-table'
                    columns={this.mainColumns}
                    dataSource={mainSource}
                />
                <Modal title="查看分区" visible={this.state.modifyVisible} onOk={this.closeModals}
                       onCancel={this.closeModals}>
                    <Form></Form>
                </Modal>
            </Content>
        );
    }
}