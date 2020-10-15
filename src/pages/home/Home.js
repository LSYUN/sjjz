import React, {Component} from 'react';
import {Row, Col, Tabs, Table, Icon, Button, Card, Avatar} from 'antd';
import echarts from 'echarts';
import 'less/home/Home.less';

import {data, logoPie, quantityPie, quantityBar, recordPie, recordBar, exceptionPie, exceptionBar} from './data.js'

const TabPane = Tabs.TabPane;
const {Column} = Table;
const {Meta} = Card;

export default class MonitorConsole extends Component {
    constructor(props) {
        super(props);

    }

    state = {};

    date = () => {
        let today = new Date();
        let year = today.getFullYear().toString();
        let month = (today.getMonth() + 1).toString();
        let day = today.getDate().toString();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        return year + ' - ' + month + ' - ' + day;
    };

    logoPieOption = logoPie;

    quantityPieOption = quantityPie;

    quantityBarOption = quantityBar;

    recordPieOption = recordPie;

    recordBarOption = recordBar;

    exceptionPieOption = exceptionPie;

    exceptionBarOption = exceptionBar;

    quality = {
        column: [
            {
                key: 'tableName',
                title: '表名',
                dataIndex: 'tableName',
                width: '230px',
            },
            {
                key: 'sourceName',
                title: '数据源名',
                dataIndex: 'sourceName',
                width: '230px',
            },
            {
                key: 'quantity',
                title: '采集量',
                dataIndex: 'quantity',
                width: '100px',
            },
            {
                key: 'date',
                title: '数据日期',
                dataIndex: 'date',
                width: '120px',
            },
            {
                key: 'chain',
                title: '环比',
                dataIndex: 'chain',
                width: '100px',
                render: (text, index) => this.percentRender(text, index)
            },
            {
                key: 'sameAs',
                title: '同比',
                dataIndex: 'sameAs',
                width: '100px',
                render: (text, index) => this.percentRender(text, index)
            },
            {
                key: 'updateTime',
                title: '更新时间',
                dataIndex: 'updateTime',
                width: '200px',
            },
        ],
    };
    collection = {
        column: [
            {
                key: 'tableName',
                title: '表名',
                dataIndex: 'tableName',
                width: '230px',
            },
            {
                key: 'sourceName',
                title: '数据源名',
                dataIndex: 'sourceName',
                width: '230px',
            },
            {
                key: 'date',
                title: '数据日期',
                dataIndex: 'date',
                width: '100px',
            },
            {
                key: 'error',
                title: '错误原因',
                dataIndex: 'error',
                width: '180px',
            },
            {
                key: 'detail',
                title: '查看',
                dataIndex: 'detail',
                width: '180px',
                render: (text, index) => {
                    return (<a>{text}</a>)
                }
            },
        ],
    };
    unCollectingTask = {
        column: [
            {
                key: 'tableName',
                title: '表名',
                dataIndex: 'tableName',
                width: '220px',
            },
            {
                key: 'sourceName',
                title: '数据源名',
                dataIndex: 'sourceName',
                width: '220px',
            },
            {
                key: 'period',
                title: '运行周期',
                dataIndex: 'period',
                width: '180px',
            },
            {
                key: 'latestBatch',
                title: '最新数据批次',
                dataIndex: 'latestBatch',
                width: '120px',
            },
        ],
    };
    basic = {
        column: [
            {
                key: 'tableName',
                title: '基础表名',
                dataIndex: 'tableName',
                width: '200px',
            },
            {
                key: 'sourceName',
                title: '数据源名',
                dataIndex: 'sourceName',
                width: '200px',
            },
            {
                key: 'average',
                title: '数据总量/近X日平均量',
                dataIndex: 'average',
                width: '280px',
            },
            {
                key: 'collection',
                title: '采集',
                dataIndex: 'collection',
                width: '120px',
            },
            {
                key: 'chain',
                title: '环比',
                dataIndex: 'chain',
                width: '100px',
                render: (text, index) => this.percentRender(text, index)
            },
            {
                key: 'sameAs',
                title: '同比',
                dataIndex: 'sameAs',
                width: '100px',
                render: (text, index) => this.percentRender(text, index)
            },
            {
                key: 'alarm',
                title: '预警',
                dataIndex: 'alarm',
                width: '100px',
                render: (text, index) => {
                    return (<Icon type="bell" className={(text === '1') ? 'green' : 'red'}/>)
                }
            },
            {
                key: 'updateTime',
                title: '更新时间',
                dataIndex: 'updateTime',
                width: '200px',
            },
        ],
    };
    condition = {
        column: [
            {
                key: 'tableName',
                title: '基础表名',
                dataIndex: 'tableName',
                width: '200px',
            },
            {
                key: 'sourceName',
                title: '数据源名',
                dataIndex: 'sourceName',
                width: '200px',
            },
            {
                key: 'average',
                title: '数据总量/近X日平均量',
                dataIndex: 'average',
                width: '280px',
            },
            {
                key: 'collection',
                title: '采集',
                dataIndex: 'collection',
                width: '120px',
            },
            {
                key: 'chain',
                title: '环比',
                dataIndex: 'chain',
                width: '100px',
                render: (text, index) => this.percentRender(text, index)
            },
            {
                key: 'sameAs',
                title: '同比',
                dataIndex: 'sameAs',
                width: '100px',
                render: (text, index) => this.percentRender(text, index)
            },
            {
                key: 'alarm',
                title: '预警',
                dataIndex: 'alarm',
                width: '100px',
                render: (text, index) => {
                    return (<Icon type="bell" className={(text === '1') ? 'green' : 'red'}/>)
                }
            },
            {
                key: 'updateTime',
                title: '更新时间',
                dataIndex: 'updateTime',
                width: '200px',
            },
        ],
    };

    percentRender(text, index) {
        text = parseFloat(text);
        if (isNaN(text)) {
            return '无异常';
        } else {
            if (text === 0) return '无异常';
            let icon = (text > 0) ? 'arrow-up' : 'arrow-down';
            let className = (text > 0) ? 'green' : 'red';
            let percent = Math.abs(text);
            return (
                <span className={className}><Icon type={icon}/>{percent}%</span>
            )
        }
    };

    qualityMonitorTabClick(key) {
        key = parseInt(key);
        if (key === 2) {
            let interval = setInterval(() => {
                if (this.refs.recordChart) {
                    echarts.init(this.refs.recordChart).setOption(this.recordPieOption);
                    clearInterval(interval);
                }
            }, 100);
        }
    };

    componentDidMount() {
        this.logoChart = echarts.init(this.refs.logoChart).setOption(this.logoPieOption);
        this.quantityChart = echarts.init(this.refs.quantityChart).setOption(this.quantityPieOption);
        this.exceptionChart = echarts.init(this.refs.exceptionChart).setOption(this.exceptionPieOption);
    };

    render() {
        return (
            <div className="container">
                <Row gutter={16} className="top">
                    <Col span={16} className="top-left">
                        <div className="left">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="数据采集质量" key="1" className="tab-pane">
                                    <Table columns={this.quality.column}
                                           dataSource={data.quality.dataSource}
                                           pagination={true}
                                    ></Table>
                                </TabPane>
                                <TabPane tab="采集任务" key="2" className="tab-pane">
                                    <Table columns={this.collection.column}
                                           dataSource={data.collection.dataSource}
                                           pagination={true}
                                    ></Table>
                                </TabPane>
                                <TabPane tab="运行失败任务" key="3" className="tab-pane">
                                    <Table columns={this.unCollectingTask.column}
                                           dataSource={data.unCollectingTask.dataSource}
                                           pagination={true}
                                    ></Table>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col span={8} className="top-right">
                        <div className="right">
                            <Row>
                                <div className="news">
                                    <span>
                                        <img src={require('./images/bell.png')}/>
                                        <span className="notice">公告</span>
                                        <span className="close">×</span>
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <p className="date">{this.date()}</p>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="info-contanier">
                                        <div className="info">
                                            <span>
                                                <p className="p-1">今日天气</p>
                                                <p className="p-2">23</p>
                                            </span>
                                        </div>
                                        <div className="info">
                                            <span>
                                                <p className="p-1">平台天气</p>
                                                <p className="p-2">156</p>
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12} className="logo">
                                    <div ref="logoChart" className="logo-chart"></div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className="bottom">
                    <div className="bottom-container">
                        <div className="buttons">
                            <span>监控周期</span>
                            <Button type="default">今日</Button>
                            <Button type="default">本周</Button>
                            <Button type="default">本月</Button>
                            <Button type="default">昨日</Button>
                            <Button type="default">近7日</Button>
                            <Button type="default">近30日</Button>
                            <Button type="default">自定义</Button>
                        </div>
                        <Row gutter={16} className="bottom-top">
                            <Col span={12}>
                                <div className="quarter">
                                    <div className="situation">
                                        <div>
                                            <img src={require("./images/collection.png")}/>
                                            <span>
                                                <p className="p-1">采集数据量</p>
                                                <p className="p-2">500G</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="situation">
                                        <div>
                                            <img src={require("./images/record.png")}/>
                                            <span>
                                                <p className="p-1">存储数据记录数</p>
                                                <p className="p-2">1832万条</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="situation">
                                        <div>
                                            <img src={require("./images/serveTimes.png")}/>
                                            <span>
                                                <p className="p-1">数据服务次数</p>
                                                <p className="p-2">100次</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="situation">
                                        <div>
                                            <img src={require("./images/quantity.png")}/>
                                            <span>
                                                <p className="p-1">生产数据量</p>
                                                <p className="p-2">200G</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="quarter">
                                    <Tabs defaultActiveKey="1" onChange={this.qualityMonitorTabClick.bind(this)}>
                                        <TabPane tab="数据量" key="1">
                                            <div ref="quantityChart" className="chart"></div>
                                        </TabPane>
                                        <TabPane tab="记录数" key="2">
                                            <div ref="recordChart" className="chart"></div>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={16} className="bottom-bottom">
                            <Col span={12} className="bottom-quarter">
                                <div className="quarter">
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="基础表" key="1" className="tab-pane">
                                            <Table columns={this.basic.column}
                                                   dataSource={data.basic.dataSource}
                                                   pagination={true}
                                            ></Table>
                                        </TabPane>
                                        <TabPane tab="宽表" key="2" className="tab-pane">
                                            <Table columns={this.condition.column}
                                                   dataSource={data.condition.dataSource}
                                                   pagination={true}
                                            ></Table>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="quarter">
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="系统异常" key="1">
                                            <div ref="exceptionChart" className="chart"></div>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </div>
        );
    }
}