/**
 * Created by wzb on 2018/4/19.
 * 采集策略
 */
import React, {Component} from 'react';
import '../../../less/dataCenter.less'
import update from 'immutability-helper';
import {Layout, Icon, Select, Table, Modal, Form, Input, Button, message, Divider, Switch, Row, Col, Radio, Checkbox, DatePicker} from 'antd'
const {Content} = Layout;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;

const formItemLayout = {
    labelCol: {span: 12},
    wrapperCol: {span: 10},
};
const formItemLayout2 = {
    labelCol: {span: 2},
    wrapperCol: {span: 10},
};

export default class CollectStrategy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.dataSourceType
        }
    }

    // 表格表头字段
    columns = [
        {
            title: '数据源名称',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            className: 'text-overflow',
        }, {
            title: '业务类型',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            className: 'text-overflow',
        }, {
            title: '存储表名',
            dataIndex: 'table',
            key: 'table',
            width: 120,
            className: 'text-overflow',
        }, {
            title: '采集连接类型',
            dataIndex: 'connType',
            key: 'connType',
            width: 120,
            className: 'text-overflow',
        }, {
            title: '采集周期',
            dataIndex: 'cycle',
            key: 'cycle',
            width: 120,
            className: 'text-overflow',
        }, {
            title: '源文件名',
            dataIndex: 'fileFormat',
            key: 'fileFormat',
            className: 'text-overflow',
            width: 120,
        }, {
            title: '采集量',
            dataIndex: 'inSize',
            key: 'inSize',
            className: 'text-overflow',
            width: 120,
        }, {
            title: '数据源应用类型',
            dataIndex: 'busiType',
            key: 'busiType',
            className: 'text-overflow',
            width: 120,
        }, {
            title: '存储类型',
            dataIndex: 'store',
            key: 'store',
            className: 'text-overflow',
            width: 180,
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            className: 'text-overflow',
            width: 180,
        }, {
            title: '状态原因',
            key: 'statusReason',
            dataIndex: 'statusReason',
            className: 'text-overflow',
            width: 180,
        }
    ];

    data = [];

    render() {
        return (
            <div className="collect-strategy-container" style={{padding: '10px', overflowY: 'auto', height: '100%'}}>
                <FormItem
                    {...formItemLayout2}
                    style={{marginBottom: '5px'}}
                    label="采集策略设置：">
                    <Switch defaultChecked/>
                </FormItem>
                {/*<div>*/}
                    {/*<Form >*/}
                        {/*<FormItem*/}
                            {/*{...formItemLayout2}*/}
                            {/*style={{marginBottom: '5px'}}*/}
                            {/*label="选择连接:">*/}
                            {/*<Select style={{width: '100px'}}/>*/}
                        {/*</FormItem>*/}
                        {/*<FormItem*/}
                            {/*{...formItemLayout2}*/}
                            {/*style={{marginBottom: '5px'}}*/}
                            {/*label="连接类型:">*/}
                            {/*<Select style={{width: '100px'}}/>*/}
                        {/*</FormItem>*/}
                    {/*</Form>*/}
                    {/*<Table*/}
                        {/*pagination={false}*/}
                        {/*className='data-source-list-table'*/}
                        {/*columns={this.columns}*/}
                        {/*dataSource={this.data}*/}
                    {/*/>*/}
                {/*</div>*/}
                <div style={{margin: '10px 0'}}>
                    <Row style={{margin: '10px 0'}}>
                        <Col span={4}>传输时间设置：</Col>
                        <Col span={20}>
                            <RadioGroup style={{display: 'flex', flexDirection: 'column'}}>
                                <Radio value={1} style={{display: 'flex'}}>传输一次
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <FormItem>
                                            <Radio value={2}>立即</Radio>
                                        </FormItem>
                                        <FormItem>
                                            <Radio value={2}>定时</Radio>
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="时间:">
                                            <Input/>
                                        </FormItem>
                                    </div>
                                </Radio>
                                <Radio value={2} style={{display: 'flex'}}>周期性传输
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{display: 'flex', margin: '5px 0'}}>
                                            <Select style={{width: '100px'}}/>
                                            <Input style={{width: '100px'}}/>日
                                            <Input style={{width: '100px'}}/>分
                                            <Input style={{width: '100px'}}/>秒
                                            <Input defaultValue='cron表达式' style={{width: '100px'}}/>
                                        </div>
                                        <div style={{margin: '5px 0'}}>
                                            <Col span={4}>生效时间：</Col>
                                            <Col  span={6}>
                                                <DatePicker />
                                            </Col>
                                            <Col  span={4}>失效时间：</Col>
                                            <Col  span={6}>
                                                <DatePicker />
                                            </Col>
                                        </div>
                                    </div>
                                </Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row style={{margin: '10px 0'}}>
                        <Col span={4}>下载设置：</Col>
                        <Col span={20}>
                            <Row>
                                <Col span={6}>
                                    <FormItem
                                        {...formItemLayout}
                                        style={{marginBottom: '5px', textAlign: 'center'}}
                                        label="文件格式:">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem
                                        {...formItemLayout}
                                        style={{marginBottom: '5px', textAlign: 'center'}}
                                        label="批次格式:">
                                        <Input />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Checkbox >循环下载</Checkbox>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <FormItem
                                        {...formItemLayout}
                                        style={{marginBottom: '5px'}}
                                        label="次数:">
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem
                                        {...formItemLayout}
                                        style={{marginBottom: '5px'}}
                                        label="每次间隔时长（秒）:">
                                        <Input />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{margin: '10px 0'}}>
                        <Col span={4}>存储操作：</Col>
                        <Col span={20}>
                            <RadioGroup >
                                <Radio value={1}>传输一次</Radio>
                                <Radio value={2}>周期性传输</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}