import React, { Component } from 'react'
import update from 'immutability-helper';
import moment from 'moment';
import 'less/forecast/statisticalanalysis.less'
import { Breadcrumb, Table, DatePicker, Button, Icon, Spin, Row, Col } from 'antd'
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from 'recharts'
import { http } from 'http'
import { Link } from 'react-router-dom'
import api from 'src/api'
import echarts from 'echarts'
import 'echarts-wordcloud'
const { RangePicker } = DatePicker;

export default class StatisticalAnalysis extends Component {
    constructor() {
        super()
        this.state = {
            showType: '',
            dateFormat: 'YYYY-MM',
            mode: ['month', 'month'],
            dateValue: [moment().subtract(1, 'years'), moment()],
            pagination: {  // 表格分页专用
                showSizeChanger: true,
                showQuickJumper: true,
                current: 1,
                pageSize: 10,
                total: 0,
            },
            loading: true,
            dataSource: [],
            chartsData: {},
        }
    }

    columns = [
        {
            title: '接入号',
            dataIndex: 'username',
        },
        {
            title: '接入时间',
            dataIndex: 'accessTime',
        },
        {
            title: '接入套餐',
            dataIndex: 'product',
        },
        {
            title: '入网时长',
            dataIndex: 'accessLength',
        },
        {
            title: '客户名称',
            dataIndex: 'name',
        },
        {
            title: '客户电话',
            dataIndex: 'phone',
        },
        {
            title: '上网总流量',
            dataIndex: 'onlineKb',
        },
        {
            title: '上网感知 ',
            dataIndex: 'perception',
            render: text => <span style={{ color: text == '良好' ? '#3BBD7D' : text == '差' ? '#F56A01' : '#FFBF02' }}>{text}</span>
        },
        {
            title: '潜在离网原因',
            dataIndex: 'prtentialReason',
        },
        {
            title: '得分',
            dataIndex: 'score',
        },
    ]

    changeDateRange = (value, mode) => {
        this.setState({
            dateValue: value,
            mode: [
                mode[0] === 'date' ? 'month' : mode[0],
                mode[1] === 'date' ? 'month' : mode[1],
            ],
        })
    }

    componentDidUpdate() {
        const locationChanged = this.state.showType !== this.props.match.params.type
        locationChanged && this.showContent()
    }

    componentDidMount() {
        this.showContent()
    }

    // 导出按钮函数
    exportData = e => {

    }

    showContent() {
        const showType = this.props.match.params.type || 'list'
        this.setState({
            showType,
            loading: true,
            pagination: {  // 表格分页专用
                showSizeChanger: true,
                showQuickJumper: true,
                current: 1,
                pageSize: 10,
                total: 0,
            },
            dataSource: [],
        })
        showType === 'list' ? this.getTableList() : this.getChartsData()
    }

    // 获取表格数据
    getTableList = e => {
        const { pagination: { current, pageSize }, dateFormat, dateValue } = this.state;
        http.POST(`${api.statisticalAnalysis.getTableList}/${current}/${pageSize}`, {
            endMonth: dateValue[1].format(dateFormat),
            startMonth: dateValue[0].format(dateFormat),
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState(update(this.state, {
                        dataSource: { $set: json.datas },
                        pagination: {
                            total: { $set: json.total }
                        },
                        loading: { $set: false }
                    }))
                }
            })
    }

    // 分页、排序、筛选变化时触发
    tableChange = (pagination, filters, sorter) => {
        this.setState({
            pagination,
            loading: true
        }, this.getTableList)
    }

    // 获取图表数据函数
    getChartsData = e => {
        const { dateFormat, dateValue } = this.state;
        http.POST(`${api.statisticalAnalysis.getChartData}`, {
            endMonth: dateValue[1].format(dateFormat),
            startMonth: dateValue[0].format(dateFormat),
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        chartsData: json.data,
                        loading: false
                    }, this.initWordCloud)
                }
            })
    }

    initWordCloud = e => {
        const { keywordCount } = this.state.chartsData
        if (keywordCount) {
            let chart = echarts.init(this.wordcloud)
            this.wordcloudOption.series.data = keywordCount
            chart.setOption(this.wordcloudOption)
        }
    }

    wordcloudOption = {
        tooltip: {},
        series: {
            type: 'wordCloud',
            shape: 'triangle',
            width: '95%',
            height: '95%',
            left: 'center',
            top: 'center',
            drawOutOfBound: false,
            sizeRange: [12, 30],
            rotationRange: [0, 0],
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 150),
                            Math.round(Math.random() * 150),
                            Math.round(Math.random() * 150)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: []
        }
    }

    render() {
        const { dateFormat, dateValue, pagination, dataSource, mode, showType, loading, chartsData } = this.state;
        return (
            <div className="forecast-statistical-analysis broadband-page">
                <Breadcrumb>
                    <Breadcrumb.Item>离网预测</Breadcrumb.Item>
                    <Breadcrumb.Item>统计分析</Breadcrumb.Item>
                </Breadcrumb>
                <p className="title">统计分析</p>
                <div>
                    <RangePicker
                        disabledDate={this.disabledDate}
                        format={dateFormat}
                        value={dateValue}
                        mode={mode}
                        onPanelChange={this.changeDateRange}
                        allowClear={false}
                    />
                    <Button type='primary' onClick={showType === 'list' ? this.getTableList : this.getChartsData}>查询</Button>
                    <Button onClick={this.exportData}><Icon type="upload" />导出</Button>
                </div>
                <Link to='/tygq/offgridForecast/statisticalAnalysis/list'><Icon type="bars" /></Link>
                <Link to='/tygq/offgridForecast/statisticalAnalysis/charts'><Icon type="appstore-o" /></Link>
                {
                    showType === 'list' ? (
                        <Table
                            dataSource={dataSource}
                            columns={this.columns}
                            rowKey='id'
                            size="middle"
                            pagination={pagination}
                            onChange={this.tableChange}
                            loading={loading}
                        />
                    ) : (
                            <Spin spinning={loading} tip='数据加载中，请稍后...'>
                                <Row gutter={14}>
                                    <Col span={8}>
                                        <div className="charts-box">
                                            <p className="charts-title">登陆各类竞争网站总次数</p>
                                            <div className="charts-container">
                                                <ResponsiveContainer>
                                                    <BarChart data={chartsData.competitveUrlCount}
                                                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                        <XAxis dataKey="date" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="联通首页" fill='#3FA0FF' />
                                                        <Bar dataKey="移动主页" fill='#975FE4' />
                                                        <Bar dataKey="移动宽带业务主页" fill='#13C2C2' />
                                                        <Bar dataKey="联通主页" fill='#FAD344' />
                                                        <Bar dataKey="移动宽带报装" fill='#F2637B' />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="charts-box">
                                            <p className="charts-title">关键字检索</p>
                                            <div className="charts-container" ref={ref => { this.wordcloud = ref }}>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="charts-box">
                                            <p className="charts-title">登陆竞争网站时常/流量趋势图</p>
                                            <div className="charts-container">
                                                暂无数据
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={14}>
                                    <Col span={8}>
                                        <div className="charts-box">
                                            <p className="charts-title">上网感知</p>
                                            <div className="charts-container">
                                                <ResponsiveContainer>
                                                    <BarChart data={chartsData.perception}
                                                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                        <XAxis dataKey="date" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="良好" fill='#13C2C2' />
                                                        <Bar dataKey="一般" fill='#FAD344' />
                                                        <Bar dataKey="差" fill='#F2637B' />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="charts-box">
                                            <p className="charts-title">离网原因排名</p>
                                            <div className="charts-container">
                                                <ResponsiveContainer>
                                                    <BarChart
                                                        data={chartsData.reasonRank}
                                                        layout="vertical"
                                                        margin={{ top: 20, right: 20, left: 30, bottom: 5 }}>
                                                        <XAxis type="number" hide={true} />
                                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                                                        <Tooltip />
                                                        <Bar dataKey="value" fill='#13C2C2' />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="charts-box">
                                            <p className="charts-title">离网用户数对比图</p>
                                            <div className="charts-container">
                                                暂无数据
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={14}>
                                    <Col span={8}>
                                        <div className="charts-box">
                                            <p className="charts-title">离网原因趋势图</p>
                                            <div className="charts-container">
                                                <ResponsiveContainer>
                                                    <LineChart data={chartsData.reasonTendency}
                                                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                        <XAxis dataKey="date" padding={{ left: 30 }} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="linear" dataKey="套餐不匹配" stroke="#3FA0FF" fill='#3FA0FF' dot={{ strokeWidth: 0 }} />
                                                        <Line type="linear" dataKey="网速慢" stroke="#975FE4" fill='#975FE4' dot={{ strokeWidth: 0 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="charts-box">
                                            <p className="charts-title">用户数量趋势图</p>
                                            <div className="charts-container">
                                                <ResponsiveContainer>
                                                    <LineChart data={chartsData.userCompare}
                                                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                        <XAxis dataKey="date" padding={{ left: 30 }} />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="linear" dataKey="新增用户" stroke="#975FE4" fill='#975FE4' dot={{ strokeWidth: 0 }} />
                                                        <Line type="linear" dataKey="活跃用户" stroke="#3FA0FF" fill='#3FA0FF' dot={{ strokeWidth: 0 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Spin>
                        )
                }
            </div>
        )
    }
}