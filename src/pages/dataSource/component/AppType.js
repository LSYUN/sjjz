/**
 * Created by wzb on 2018/4/20.
 * 本地源类型：本地应用或者分发应用
 */
import React, {Component} from 'react';
import update from 'immutability-helper';
import {Layout, Icon, Select, Table, Modal, Form, Input, Button, message, Divider} from 'antd'
const {Content} = Layout;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;

const appTypes = [
    {
        id: 1,
        name: '采集应用',
        bgPosition: '0'
    }, {
        id: 2,
        name: '分发应用',
        bgPosition: '-192px'
    }
];

export default class AppType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appType: ''
        }
    }

    // 应用类型
    selectAppType = (id, e) => {
        if (id) {
            let appType = this.state.appType;
            this.setState({
                appType: appType? '' : id
            })
        }
    };

    // 应用类型
    loopAppType = (appTypes) =>  appTypes.map((item, index) => {
        let appTypeClass = 'app-type-cell';
        return (
            <li
                key={item.id}
                onClick={(e) => this.selectAppType(item.id, e)}
                className={item.id === this.state.appType ? appTypeClass + ' selected' : appTypeClass}
                style={{backgroundPositionX: item.bgPosition}}>
            </li>
        )
    });

    render() {
        return (
            <div className="app-type-container">
                <ul>
                    {this.loopAppType(appTypes)}
                </ul>
            </div>
        )

    }
}