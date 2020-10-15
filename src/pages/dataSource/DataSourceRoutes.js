/**
 * Created by wzb on 2018/4/19.
 * 数据源模块的路由
 */
import React, { Component } from 'react'
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom'

import DataSourceManage from './DataSourceManage'
import LocalSource from './LocalSource'
import RemoteSource from './RemoteSource'
import DataSourceDetail from './DataSourceDetail'
import NotFound from '../../NotFound'

const { Content } = Layout;

export default class DataSourceRoutes extends Component {
    render() {
        return (
            <Content  style={{overflowY: 'auto'}}>
                <Switch>
                    <Redirect exact from="/sjjz/telecom/dataCenter/dataSource" to={'/sjjz/telecom/dataCenter/dataSource/manage'} />
                    <Route path="/sjjz/telecom/dataCenter/dataSource/manage" component={DataSourceManage} />
                    <Route path="/sjjz/telecom/dataCenter/dataSource/localSource" component={LocalSource} />
                    <Route path="/sjjz/telecom/dataCenter/dataSource/remoteSource" component={RemoteSource} />
                    <Route path="/sjjz/telecom/dataCenter/dataSource/dataSourceDetail" component={DataSourceDetail} />
                    <Route component={NotFound} />
                </Switch>
            </Content>
        )
    }
}