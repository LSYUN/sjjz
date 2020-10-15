import React, {Component} from 'react';
import {Layout, Collapse, Row, Col, List, Card} from 'antd';

import '../../less/metaData/metaData.less';

import {relationship} from './data.js';
const {Content} = Layout;

export default class Relationship extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Content className="relationship-content">
                <img src={require('./images/relationship1.png')}/>
            </Content >
        )
    }
}