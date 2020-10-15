/**
 * Created by wzb on 2018/3/12.
 * 连接参数配置
 */
import React, {Component} from 'react';
import {Layout, Icon, Select, Table, Row, Col, Modal, Form, Input, Button, message, Divider, Spin} from 'antd'
import {api} from 'src/api'
import {http} from 'http'

const FormItem = Form.Item, {confirm, error} = Modal;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
};
const inlineFormItemLayout = {
    labelCol: {span: 12},
    wrapperCol: {span: 12}
};

// 表格表头字段
const columns = [
    {
        title: '数据源名称',
        dataIndex: 'connectionName',
        width: 100,
        className: 'text-overflow',
    }, {
        title: '创建人',
        dataIndex: 'ipAddress',
        width: 120,
        className: 'text-overflow',
    }, {
        title: '创建时间',
        dataIndex: 'port',
        width: 120,
        className: 'text-overflow',
    }, {
        title: '数据源状态',
        dataIndex: 'connectType',
        width: 170,
        className: 'text-overflow',
    }, {
        title: '使用类型',
        dataIndex: 'connectUserName',
        width: 120,
        className: 'text-overflow',
    }
];
// 静态数据
const data = [];

class DataConnectField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validIP: null
        }
    }

    //连接类型显示
    viewConnectType = (type) => {
        switch (type) {
            case 1:
                return 'Mysql';
            case 2:
                return 'Oracle';
            case 3:
                return 'SQL-Server';
            case 4:
                return 'hive';
            case 5:
                return 'ftp';
        }
    };

    //连接状态显示
    viewConnectStatus = (type) => {
        switch (type) {
            case '1':
                return '可用';
            case '2':
                return '新建';
            case '0':
                return '不可用';
            default:
                return '新建';
        }
    };

    // 端口默认设置
    viewPort = (type) => {
        switch (type) {
            case 1:
                return 3306;
            case 2:
                return 1521;
            case 3:
                return 1433;
            case 4:
                return '';
            case 5:
                return 22;
            default:
                return '';
        }
    };

    //校验IP合法
    isValidIP = (ip) => {
        var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        this.setState({
            validIP: reg.test(ip)
        })
    };

    render() {
        const {visible, modalSpinning, checkResult, onCancel, onCreate, onTest, back, form, connectType, connectDetail, operate, checkConnectName, connectIcon} = this.props,
            {getFieldDecorator} = form;
        let {validIP} = this.state;
        // console.log(validIP)
        let oldName = connectDetail.name;
        let newName = form.getFieldValue('name');
        const isValid = (item) => {
            if (item !== null) {
                if (item) {
                    return true
                }
            }
            return false
        };
        return (
            <Modal
                className="data-connect-config-detail"
                visible={visible}
                title={operate === 'modify' ? '修改连接参数': '新增连接参数'}
                footer={null}
                onCancel={onCancel}
                width={1000}
            >
                <Spin spinning={modalSpinning}>
                    <Row gutter={12}>
                        <Col span={ operate === 'modify' ? 14 : 24}>
                            <Form layout={'vertical'}>
                                <FormItem
                                    {...formItemLayout}
                                    label="连接名称"
                                    validdateStatus={isValid(checkResult) ? 'success' : 'error'}
                                    hasFeedback
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{required: true, message: '请输入连接名称!'}],
                                        initialValue: connectDetail.name || ''
                                    })(<Input
                                        placeholder="连接名称"
                                        onBlur={(e) => checkConnectName(e, newName, oldName, operate)}
                                        id={isValid(checkResult) ? 'success' : 'error'}/>)}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="连接类型">
                                    {getFieldDecorator('type', {
                                        rules: [{required: true}],
                                        initialValue: this.viewConnectType(connectDetail.type) || this.viewConnectType(connectType)
                                    })(<Input disabled/>)}
                                </FormItem>
                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            {...inlineFormItemLayout}
                                            label="连接IP"
                                        >
                                            {getFieldDecorator('ip', {
                                                rules: [
                                                    {type: 'regexp', message: 'IP格式不正确', pattern: new RegExp('/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/')},
                                                    {required: true, message: '请输入IP!'}],
                                                initialValue: connectDetail.ip || ''
                                            })(<Input
                                                onChange={(e) => this.isValidIP(e.target.value)}
                                                id="error"/>)}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem
                                            {...inlineFormItemLayout}
                                            label="端口">
                                            {getFieldDecorator('port', {
                                                rules: [{required: true, message: '请输入端口号!'}],
                                                initialValue: connectDetail.port || this.viewPort(connectType)
                                            })(<Input type="number"/>)}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <FormItem
                                    {...formItemLayout}
                                    label="用户名">
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: '请输入用户名!'}],
                                        initialValue: connectDetail.username || ''
                                    })(<Input />)}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="密码">
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码!'}],
                                        initialValue: connectDetail.password || ''
                                    })(<Input type="password"/>)}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="数据库名称">
                                    {getFieldDecorator('database', {
                                        rules: [],
                                        initialValue: connectDetail.database || ''
                                    })(<Input />)}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{display: connectType === 5 ? 'block' : 'none'}}
                                    label="根目录">
                                    {getFieldDecorator('rootDir', {
                                        rules: [],
                                        initialValue: connectDetail.rootDir || ''
                                    })(<Input />)}
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span={10} style={{display: connectDetail.id ? 'block' : 'none'}}>
                            <Form layout={'vertical'}>
                                <FormItem
                                    {...formItemLayout}
                                    label="连接状态">
                                    {getFieldDecorator('status', {
                                        initialValue: this.viewConnectStatus(connectDetail.status) || ''
                                    })(<Input disabled/>)}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="状态描述">
                                    <ul>
                                        <li>{connectDetail.statusReason}</li>
                                    </ul>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                    <div className="using-data-source-list" style={{display: operate === 'modify' ? 'block' : 'none'}}>
                        <p>使用数据源列表</p>
                        <Table
                            pagination={false}
                            className='data-connect-list-table'
                            columns={columns}
                            dataSource={data}
                        />
                    </div>
                    <MyModalFooter
                        connectDetail={connectDetail}
                        testConnect={onTest}
                        saveDataConnect={onCreate}
                        back={back}
                        connectIcon={connectIcon}
                    />
                </Spin>
            </Modal>
        )
    }
}
const DataConnectConfig = Form.create()(DataConnectField);

class MyModalFooter extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {testConnect, back, saveDataConnect, connectDetail, connectIcon} = this.props;

        return (
            <div className="my-modal-footer">
                <div>
                    <Button type="primary" onClick={testConnect}
                            style={{display: connectDetail.id ? 'none' : 'inline'}}
                            icon={connectIcon.type}
                            loading={connectIcon.loading}
                    >测试连接</Button>
                    <Button onClick={back}>返回</Button>
                    <Button type="primary" onClick={saveDataConnect} disabled={connectIcon.loading}>保存</Button>
                </div>
            </div>
        )
    }

}

export default DataConnectConfig;