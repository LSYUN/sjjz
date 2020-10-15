import React, {Component} from 'react'
import {Layout} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom'

import MainContent from 'src/containers/MainContent'
// import Login from "pages/login/Login"
import NotFound from 'src/NotFound'
// import Iframe from 'pages/Iframe'
import Home from 'pages/home/Home'
// import DataConnectManage from 'pages/dataConnect/DataConnectManage'
import DataSourceManage from 'pages/dataSource/DataSourceManage'
// import RemoteSource from 'pages/dataSource/RemoteSource'
// import DataSourceDetail from 'pages/dataSource/DataSourceDetail'
// import LocalSource from 'pages/dataSource/LocalSource'
// import MetaManage from 'pages/metaData/MetaManage'
// import DataService from 'pages/dataService/DataService'
// import DataGenerator from 'pages/dataGenerator/DataGenerator'
// import SystemManage from 'pages/systemManage/SystemManage'

const {Content} = Layout;

//App入口主路由
class AppRoutes extends Component {
    render() {
        return (
            <Switch>
                <Redirect exact from="/" to={'/sjjz'}/>
                <Route path="/sjjz/login" component={Login}/>
                <Route path="/sjjz" component={MainContent}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}

//主要内容路由
class MainRoutes extends Component {
    render() {
        //数据源管理 子路由
        const DataSourceRoutes = ({match}) => (
            <Switch>
                <Redirect exact from="/sjjz/telecom/dataCenter/dataSource"
                          to={'/sjjz/telecom/dataCenter/dataSource/manage'}/>
                <Route path="/sjjz/telecom/dataCenter/dataSource/manage" component={DataSourceManage}/>
                {/*<Route path="/sjjz/telecom/dataCenter/dataSource/localSource" component={LocalSource}/>*/}
                {/*<Route path="/sjjz/telecom/dataCenter/dataSource/remoteSource" component={RemoteSource}/>*/}
                {/*<Route path="/sjjz/telecom/dataCenter/dataSource/dataSourceDetail" component={DataSourceDetail}/>*/}
                <Route component={NotFound}/>
            </Switch>
        );



        return (
            <Content style={{overflowY: 'auto', position: 'relative'}}>
                <Switch>
                    <Redirect exact from="/sjjz" to={'/sjjz/telecom/dataCenter/home'}/>
                    <Route path="/sjjz/telecom/dataCenter/home" component={Home}/>
                    {/*<Route path="/sjjz/telecom/dataGenerator" component={DataGenerator}/>*/}
                    {/*<Route path="/sjjz/telecom/systemManage" component={SystemManage}/>*/}
                    {/*<Route path="/sjjz/telecom/dataCenter/dataConnect" component={DataConnectManage}/>*/}
                    {/*<Route path="/sjjz/telecom/dataCenter/dataSource" component={DataSourceRoutes}/>*/}
                    {/*<Route path="/sjjz/telecom/dataCenter/metaData" component={MetaManage}/>*/}
                    {/*<Route path="/sjjz/telecom/dataCenter/dataService" component={DataService}/>*/}
                    {/*<Route path="/sjjz/iframe" component={Home}/>*/}
                    {/*<Route Path="/telecom/dataCenter/systemService" component={Iframe} />*/}
                    {/*<Route component={NotFound} />*/}
                </Switch>
            </Content>
        )
    }
}
export {AppRoutes, MainRoutes};
