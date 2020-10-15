/**
 * Created by wzb on 2018/3/15.
 * 远程源
 */
import React, {Component} from 'react';
import {Layout, Icon, Spin, Select, Table, Modal, Form, Input, Button, Radio, message, Divider, Steps} from 'antd'
import CollectStrategy from './component/CollectStrategy'
import ConnectConfig from './component/ConnectConfig'
import DistributeStrategy from './component/DistributeStrategy'
import StorageType from './component/StorageType'
import '../../less/dataCenter.less'
const {Content} = Layout;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;

export default class RemoteSource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            dataSourceType: '远程源'
        }
    }

    stepComponents = [
        {
            index: 0,
            component: <ConnectConfig/>
        }, {
            index: 1,
            component: <StorageType/>
        }, {
            index: 2,
            component: <CollectStrategy/>
        }, {
            index: 3,
            component: <DistributeStrategy/>
        }
    ];

    stepControl = (type) => {
        // console.log(type)
        if (type === 'next') {
            this.setState({
                currentStep: this.state.currentStep + 1
            })
        } else {
            this.setState({
                currentStep: this.state.currentStep - 1
            })
        }
    };

    render() {
        const {dataSourceType, currentStep} = this.state;
        return (
            <Content className="data-center" style={{background: '#fff'}}>
                <div className="add-data-source-container">
                    <div className="add-data-source-title">
                        {dataSourceType}
                    </div>
                    <div className="add-data-source">
                        <Steps size="small" current={currentStep}>
                            <Step title="连接信息确认"/>
                            <Step title="存储类型"/>
                            <Step title="采集策略"/>
                            <Step title="分发策略"/>
                        </Steps>
                        <div className="steps-content">{this.stepComponents[currentStep].component}</div>
                    </div>
                    <div className="step-control">
                        <span style={{display: currentStep === this.stepComponents.length - 1 ? 'inline' : 'none'}}>
                            为数据源命名：
                            <Input style={{width: '152px'}}/>
                        </span>
                        <Button
                            onClick={ () => this.stepControl('back')}
                            style={{display: currentStep === 0 ? 'none' : 'inline'}}
                        >返回</Button>
                        <Button type="primary" onClick={ () => this.stepControl('next')}>
                            {currentStep === this.stepComponents.length - 1 ? '保存' : '下一步'}
                        </Button>
                    </div>
                </div>
            </Content>
        )
    }
}