/**
 * Created by wzb on 2018/3/15.
 * 数据源类型模态框
 */

import React, {Component} from 'react';
import update from 'immutability-helper';
import {Layout, Icon, Select, Table, Modal, Form, Input, Button, message, Divider} from 'antd'
const dataConnectList = require('../../data/dataConnectList.json');
const {Content} = Layout;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;
const formItemLayout = {
    labelCol: {span: 12},
    wrapperCol: {span: 12},
};

const localSourceType = [
    {
        id: 1,
        type: 'database',
        bgPosition: '-200px'
    }
];

export default class DataSourceType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localSource: {
                type: ''
            },
            remoteSource: {
                id: '',
                connectName: '',
                connectType: ''
            }
        };
    }

    // 选择本地数据源类型
    selectLocalSourceType = (type, e) => {
        if (type) {
            let localSource = this.state.localSource;
            this.setState({
                localSource: update(localSource, {type: {$set: localSource.type ? '' : type}})
            })
        }
    };

     // 选择远程数据源类型
    selectRemoteSourceType = (id, e) => {
        if (id) {
            let remoteSource = this.state.remoteSource;
            this.setState({
                remoteSource: update(remoteSource, {id: {$set: remoteSource.id ? '' : id}})
            })
        }
    };

    // 本地源列表
    loopLocalSource = (sourceTypes) => sourceTypes.map((item, index) => {
        let dataSourceTypeClass = 'data-source-type-cell';
        return (
            <li
                key={item.id}
                onClick={(e) => this.selectLocalSourceType(item.type, e)}
                className={item.type === this.state.localSource.type ? dataSourceTypeClass + ' selected' : dataSourceTypeClass}>
                <span
                    className={item.type === this.state.localSource.type ? dataSourceTypeClass + ' selected' : dataSourceTypeClass}
                    style={{backgroundPositionX: item.bgPosition}}
                >
                </span>
            </li>
        )
    });

    // 连接类型显示
    viewDataConnectType = (type) => {
        switch (type) {
            case '1':
                return 'Sybase';
            case '2':
                return 'Oracle';
            case '3':
                return 'FTP';
            default:
                return 'Mysql'
        }
    }

    // 已有远程连接列表
    loopDataConnect = (dataConnects) => dataConnects.map((item, index) => {
        let dataConnectTypeClass = 'data-source-type';
        return (
            <li key={item.id}
                className='data-source-type-container'>
                <span
                    onClick={(e) => this.selectRemoteSourceType(item.id, e)}
                    className={item.id === this.state.remoteSource.id ? dataConnectTypeClass + ' selected' : dataConnectTypeClass}
                >
                    {this.viewDataConnectType(item.type)}
                </span>
                <span className="data-source-name">{item.name}</span>
            </li>
        )
    });

    render() {
        const {visible, onCancel, onCreate} = this.props;
        const {localSource, remoteSource} = this.state;

        return (
            <Modal
                wrapClassName="data-source-type"
                visible={visible}
                title={'数据源类型选择'}
                okText={'确定'}
                cancelText="返回"
                onCancel={onCancel}
                onOk={(e) => onCreate(localSource,remoteSource, e)}
                width={1000}
            >
                <div className="local-source-type-container">
                    <p >本地源</p>
                    <div className="local-source-type">
                        <ul style={{display: 'flex'}}>
                            {this.loopLocalSource(localSourceType)}
                        </ul>
                    </div>
                </div>
                <div className="remote-source-type-container">
                    <p>远程源</p>
                    <Form layout={'inline'}>
                        <FormItem
                            {...formItemLayout}
                            label="远程连接名称：">
                            <Input />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="连接类型：">
                            <Select style={{width: '100px'}}>
                                <Option value="mysql">MySQL</Option>
                                <Option value="oracle">Oracle</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </div>

                <div className="data-connect-list">
                    <ul style={{display: 'flex', flexWrap: 'wrap'}}>
                        {this.loopDataConnect(dataConnectList.data.list)}
                    </ul>
                </div>

            </Modal>
        )
    }
}