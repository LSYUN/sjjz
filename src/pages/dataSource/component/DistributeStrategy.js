/**
 * Created by wzb on 2018/4/19.
 * 分发策略
 */
import React, {Component} from 'react';
import '../../../less/dataCenter.less'
import update from 'immutability-helper';
import {Layout, Icon, Select, Row, Col, Table, Modal, Form, Input, Button, DatePicker, message, Divider, Tabs, Switch, Radio} from 'antd'
const {Content} = Layout;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;
const TabPane = Tabs.TabPane;

const formItemLayout = {
    labelCol: {span: 2},
    wrapperCol: {span: 10},
};
const formItemLayout2 = {
    labelCol: {span: 4},
    wrapperCol: {span: 10},
};

export default class DistributeStrategy extends Component {
    constructor(props) {
        super(props);
        const panes = [
            {
                title: '策略一', content: <div>
                <Row style={{margin: '10px 0'}}>
                    <Col span={4}>传输时间设置：</Col>
                    <Col span={20}>
                        <RadioGroup style={{display: 'flex', flexDirection: 'column'}}>
                            <Radio value={1} style={{display: 'flex', flexDirection: 'row'}}>传输一次
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <FormItem>
                                        <Radio value={2}>立即</Radio>
                                    </FormItem>
                                    <FormItem>
                                        <Radio value={2}>定时</Radio>
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout2}
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
                                        <Col span={6}>
                                            <DatePicker />
                                        </Col>
                                        <Col span={4}>失效时间：</Col>
                                        <Col span={6}>
                                            <DatePicker />
                                        </Col>
                                    </div>
                                </div>
                            </Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <Row style={{margin: '10px 0'}}>
                    <Col span={4}>传输大小设置：</Col>
                    <Col span={20}>
                        <RadioGroup style={{display: 'flex'}}>
                            <Radio value={1} style={{display: 'flex'}}>全量传输
                                <div style={{margin: '5px 0'}}>
                                    <Col span={8}>全量类型：</Col>
                                    <Col span={6}>
                                        <RadioGroup>
                                            <Radio value={1}>分区</Radio>
                                            <Radio value={2}>全表</Radio>
                                        </RadioGroup>
                                    </Col>
                                </div>
                            </Radio>
                            <Radio value={2} style={{display: 'flex'}}>增量传输
                                <div style={{margin: '5px 0', display: 'flex'}}>
                                    <Col span={6}>监控表：</Col>
                                    <Col span={6}>
                                        <Select style={{width: '50px'}}/>
                                    </Col>
                                    <Col span={6}>监控列：</Col>
                                    <Col span={6}>
                                        <Select style={{width: '50px'}}/>
                                    </Col>
                                </div>
                            </Radio>
                        </RadioGroup>
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
                , key: '1'
            }
        ];
        this.state = {
            type: this.props.dataSourceType,
            activeKey: panes[0].key,
            panes
        }
    }

    onChange = (activeKey) => {
        this.setState({activeKey});
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({title: 'New Tab', content: 'New Tab Pane', key: activeKey});
        this.setState({panes, activeKey});
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({panes, activeKey});
    }

    render() {
        return (
            <div className="distribute-strategy-container" style={{padding: '10px', overflowY: 'auto'}}>
                <FormItem
                    {...formItemLayout}
                    style={{marginBottom: '5px'}}
                    label="分发策略设置：">
                    <Switch defaultChecked/>
                </FormItem>
                <div>
                    <div style={{marginBottom: 5}}>
                        <Button type='primary' onClick={this.add}>添加</Button>
                    </div>
                    <Tabs
                        hideAdd
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => <TabPane tab={pane.title}
                                                               key={pane.key}>{pane.content}</TabPane>)}
                    </Tabs>
                </div>
            </div>
        )
    }
}