/**
 * Created by wzb on 2018/4/19.
 * 存储类型设置
 */
import React, {Component} from 'react';
import update from 'immutability-helper';
import {Layout, Checkbox, Icon, Select, Table, Modal, Form, Tabs, Radio, Input, Button, message, Divider} from 'antd'
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const {Content} = Layout;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;

const options = [
    {label: 'Elasticsearch', value: 'Elasticsearch'},
    {label: 'Hive', value: 'Hive'},
    {label: '数据库', value: 'database'},
    {label: 'Hbase', value: 'Hbase'}
]

const formItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 10}
};

export default class StorageType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.dataSourceType
        }
    }

    render() {
        return (
            <div className="storage-config-container" style={{padding: '10px'}}>
                <div>
                    <Form layout="inline" className="data-source-search" style={{marginBottom: '16px'}}>
                        <FormItem label="存储类型：">
                            <CheckboxGroup options={options}/>
                        </FormItem>
                        <FormItem label="存储表示：">
                            <Select style={{width: '100px'}}/>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Elasticsearch" key="1">
                            <p>Elasticsearch存储设置：</p>
                            <div style={{textAlign: 'center'}}>
                                <RadioGroup>
                                    <Radio value={1}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="新增索引目录：">
                                            <Input />
                                        </FormItem>
                                    </Radio><br/>
                                    <Radio value={0}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="选择索引目录：">
                                            <Input />
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" >浏览</Button>
                                        </FormItem>
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </TabPane>
                        <TabPane tab="Hive" key="2">
                            <p>Hive存储设置：</p>
                            <Form layout='horizontal'>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px'}}
                                    label="选择库:">
                                    <Select/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px', display: 'flex', alignItems: 'center'}}
                                    label="存储表:">
                                    <RadioGroup
                                        style={{display: 'flex'}}
                                    >
                                        <Radio value={1}>新建表</Radio>
                                        <Radio value={2}>选择表</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px'}}
                                    label="表名称:">
                                    <Input/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px'}}
                                    label="一级分区字段:">
                                    <Select/>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab="数据库" key="3">
                            <p>数据库存储设置：</p>
                            <Form layout='horizontal'>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px'}}
                                    label="选择库:">
                                    <Select/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px', display: 'flex', alignItems: 'center'}}
                                    label="存储表:">
                                    <RadioGroup style={{display: 'flex'}}>
                                        <Radio value={1}>新建表</Radio>
                                        <Radio value={2}>选择表</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px'}}
                                    label="表名称:">
                                    <Input/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px'}}
                                    label="索引列设置:">
                                    <Select/>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab="Hbase" key="4">
                            <p>Hbase存储设置：</p>
                            <Form layout='horizontal'>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px'}}
                                    label="命名空间设置:">
                                    <Select/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px', display: 'flex', alignItems: 'center'}}
                                    label="存储方式:">
                                    <RadioGroup style={{display: 'flex'}}>
                                        <Radio value={1}>新建表</Radio>
                                        <Radio value={2}>选择表</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    style={{marginBottom: '5px'}}
                                    label="表名称:">
                                    <Input/>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}