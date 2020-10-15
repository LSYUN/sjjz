import React, { Component } from 'react'
import update from 'immutability-helper';
import { Breadcrumb, Input, Button, DatePicker, Col, Row, Modal, Icon, Spin, message } from 'antd'
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, ResponsiveContainer, ComposedChart } from 'recharts'
import { http } from 'http'
import 'less/userPortrait/portraitDetails.less'
import echarts from "echarts";
import moment from 'moment';
import api from 'src/api'
const { RangePicker } = DatePicker, { error } = Modal, { loading } = message;

export default class PortraitDetails extends Component {
    constructor() {
        super()
        this.state = {
            mode: ['month', 'month'],
            searchParams: {     // 查询输入框的相关参数
                accessNum: '',  // 接入号
                start: moment().subtract(1, 'years').format('YYYY-MM'),      // 开始月份(yyyy-MM)
                end: moment().format('YYYY-MM'),        // 结束月份(yyyy-MM)
            },
            detailData: null,             // 存放查询完的数据
        }
    }


    onChange = accessNum => e => {
        this.setState(update(this.state, {
            searchParams: {
                accessNum: { $set: e.target.value }
            }
        }))
    }

    // 时间选择器变化时
    changeDateRange = (value, mode) => {
        this.setState(update(this.state, {
            searchParams: {
                start: { $set: value[0].format('YYYY-MM') },
                end: { $set: value[1].format('YYYY-MM') },
            },
            mode: {
                $set: [
                    mode[0] === 'date' ? 'month' : mode[0],
                    mode[1] === 'date' ? 'month' : mode[1],
                ]
            },
        }))
    }

    // 查询请求
    onSearch = () => {
        const { accessNum, start, end } = this.state.searchParams;
        if (accessNum && start && end) {
            const hide = loading('数据正在加载中，请稍候...', 0);
            http.GET(api.userPortrait.getPortraitDetail, this.state.searchParams)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            detailData: json.data,
                        }, this.drawGuage)
                        hide()
                    } else {
                        error({ title: json.msg })
                    }
                })
        } else {
        }
    }

    option = {
        series: [{
            name: '速度',
            type: 'gauge',
            min: 0,
            max: 12,
            splitNumber: 6,
            center: ['20%', '50%'],
            radius: '60%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 3,
                    color: [
                        [0.51, {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#04F628' // 0% 处的颜色
                            }, {
                                offset: 0.03, color: '#2887DF' // 0% 处的颜色
                            }, {
                                offset: 0.05, color: '#2887DF' // 100% 处的颜色
                            }, {
                                offset: 0.2, color: '#EA3431' // 100% 处的颜色
                            }, {
                                offset: 1, color: '#EA3431' // 100% 处的颜色
                            }]
                        }],
                        [1, {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#04F628' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#00FFB1' // 100% 处的颜色
                            }]
                        }]
                    ]
                }
            },
            axisTick: {            // 坐标轴小标记
                show: false,
            },
            splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#4C86C6',
                    opacity: 0.3
                },
            },
            axisLabel: {
                distance: -35,
                color: '#474747',
            },
            itemStyle: {
                color: '#4C86C6',
                opacity: 0.3
            },
            data: [{ value: 10, name: '平均下载速率' }],
            title: {
                color: '#404040',
                fontSize: 12,
                offsetCenter: [0, '100%']
            },
            detail: {
                fontSize: 18,
                formatter: '{value} Mbps',
                fontWeight: 'bold',
                offsetCenter: [0, '80%']
            }
        }, {
            name: '速度',
            type: 'gauge',
            min: 0,
            max: 12,
            splitNumber: 6,
            radius: '60%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 3,
                    color: [
                        [0.51, {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#04F628' // 0% 处的颜色
                            }, {
                                offset: 0.03, color: '#2887DF' // 0% 处的颜色
                            }, {
                                offset: 0.05, color: '#2887DF' // 100% 处的颜色
                            }, {
                                offset: 0.2, color: '#EA3431' // 100% 处的颜色
                            }, {
                                offset: 1, color: '#EA3431' // 100% 处的颜色
                            }]
                        }],
                        [1, {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#04F628' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#00FFB1' // 100% 处的颜色
                            }]
                        }]
                    ]
                }
            },
            axisTick: {            // 坐标轴小标记
                show: false,
            },
            splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#4C86C6',
                    opacity: 0.3
                },
            },
            axisLabel: {
                distance: -35,
                color: '#474747',
            },
            itemStyle: {
                color: '#4C86C6',
                opacity: 0.3
            },
            data: [{ value: 10, name: '平均下载速率' }],
            title: {
                color: '#404040',
                fontSize: 12,
                offsetCenter: [0, '100%']
            },
            detail: {
                fontSize: 18,
                formatter: '{value} Mbps',
                fontWeight: 'bold',
                offsetCenter: [0, '80%']
            }
        }, {
            name: '速度',
            type: 'gauge',
            center: ['80%', '50%'],
            min: 0,
            max: 12,
            splitNumber: 6,
            radius: '60%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 3,
                    color: [
                        [0.51, {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#04F628' // 0% 处的颜色
                            }, {
                                offset: 0.03, color: '#2887DF' // 0% 处的颜色
                            }, {
                                offset: 0.05, color: '#2887DF' // 100% 处的颜色
                            }, {
                                offset: 0.2, color: '#EA3431' // 100% 处的颜色
                            }, {
                                offset: 1, color: '#EA3431' // 100% 处的颜色
                            }]
                        }],
                        [1, {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#04F628' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#00FFB1' // 100% 处的颜色
                            }]
                        }]
                    ]
                }
            },
            axisTick: {            // 坐标轴小标记
                show: false,
            },
            splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#4C86C6',
                    opacity: 0.3
                },
            },
            axisLabel: {
                distance: -35,
                color: '#474747',
            },
            itemStyle: {
                color: '#4C86C6',
                opacity: 0.3
            },
            data: [{ value: 10, name: '平均下载速率' }],
            title: {
                color: '#404040',
                fontSize: 12,
                offsetCenter: [0, '100%']
            },
            detail: {
                fontSize: 18,
                formatter: '{value} Mbps',
                fontWeight: 'bold',
                offsetCenter: [0, '80%']
            }
        }
        ]
    };

    drawGuage = () => {
        if (this.gaugeChartDom) {
            this.state.detailData.perception.forEach((obj, key) => {
                this.option.series[key].data = [obj]
            })
            echarts.init(this.gaugeChartDom).setOption(this.option)
        }
    }

    componentDidMount() {
        const { accessNum } = this.props.match.params;
        if (accessNum) {
            this.setState(update(this.state, {
                searchParams: {
                    accessNum: { $set: accessNum }
                }
            }), this.onSearch)
        }
    }

    render() {
        const { searchParams: { accessNum, start, end }, detailData } = this.state
        return (
            <div className="broadband-page portrait-details">
                <Breadcrumb>
                    <Breadcrumb.Item>用户画像</Breadcrumb.Item>
                    <Breadcrumb.Item>画像详情</Breadcrumb.Item>
                </Breadcrumb>
                <p className="title">画像详情</p>
                <div className="inquire-form">
                    <Input
                        style={{ width: 160 }}
                        placeholder="接入号"
                        value={accessNum}
                        onChange={this.onChange('accessNum')}
                    />
                    <RangePicker
                        style={{ width: 230 }}
                        format="YYYY-MM"
                        mode={['month', 'month']}
                        value={[moment(start), moment(end)]}
                        onPanelChange={this.changeDateRange}
                        allowClear={false}
                    />
                    <Button
                        type="primary"
                        onClick={this.onSearch}
                    >查询</Button>
                </div>
                {detailData && (
                    <div>
                        <div className="user-details">
                            <Row>
                                <Col span={4}>
                                    <Icon type="user" className="user-icon" />
                                </Col>
                                <Col span={8} className="user-base-info">
                                    <p>当前得分：<span style={{ color: '#F56A01', fontSize: 20 }}>{detailData.baseInfo.score}分</span></p>
                                    <p>用户名称：{detailData.baseInfo.name}</p>
                                    <p>接入套餐：{detailData.baseInfo.product}</p>
                                    <p>接入带宽：{detailData.baseInfo.accessSpeed}</p>
                                    <p>入网时长：{detailData.baseInfo.accessLength}</p>
                                    <p>终端个数：{detailData.baseInfo.devCount}</p>
                                </Col>
                                <Col span={12} className="recent-behavior">
                                    <p>最近30天行为记录：</p>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>浏览竞争网站：</td>
                                                <td>{detailData.recentBehavior.browseWeb}次</td>
                                                <td>上网流量：</td>
                                                <td>{detailData.recentBehavior.onlineKb}kb/天</td>
                                            </tr>
                                            <tr>
                                                <td>搜索敏感关键字次数：</td>
                                                <td>{detailData.recentBehavior.searchCount}次</td>
                                                <td>发帖数量：</td>
                                                <td>{detailData.recentBehavior.postCount}条</td>
                                            </tr>
                                            <tr>
                                                <td>上网终端个数：</td>
                                                <td>{detailData.recentBehavior.devCount}个</td>
                                                <td>上网感知：</td>
                                                <td>{detailData.recentBehavior.perception}</td>
                                            </tr>
                                            <tr>
                                                <td>在线时长：</td>
                                                <td>{detailData.recentBehavior.onlineCount}小时/天</td>
                                                <td>离网原因：</td>
                                                <td>{detailData.recentBehavior.leavingReason}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </div>
                        <div className="user-chart">
                            <Row gutter={14} style={{ marginBottom: 14 }}>
                                <Col span={8}>
                                    <div className="charts-box">
                                        <p className="charts-title">网址访问分析</p>
                                        <div className="charts-container">
                                            {detailData.browseAnalyse ? (<ResponsiveContainer>
                                                <LineChart data={detailData.browseAnalyse}
                                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                    <XAxis dataKey="name" padding={{ left: 30 }} />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="linear" dataKey="移动主页" stroke="#13C2C2" fill='#13C2C2' dot={{ strokeWidth: 0 }} />
                                                    <Line type="linear" dataKey="联通首页" stroke="#82ca9d" fill='#82ca9d' dot={{ strokeWidth: 0 }} />
                                                    <Line type="linear" dataKey="联通主页" stroke="#975FE4" fill='#975FE4' dot={{ strokeWidth: 0 }} />
                                                </LineChart>
                                            </ResponsiveContainer>) : '暂无数据'
                                            }
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="charts-box">
                                        <p className="charts-title">用户登录网站次数Top5</p>
                                        <div className="charts-container">
                                            <ResponsiveContainer>
                                                <BarChart data={[
                                                    { name: '腾讯网', value: 100 },
                                                    { name: '新浪微博', value: 88 },
                                                    { name: '知乎', value: 73 },
                                                    { name: '网易博客', value: 47 },
                                                    { name: '爱奇艺', value: 10 },
                                                ]}
                                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                    <XAxis dataKey="name" padding={{ left: 30 }} />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="value" name='次数' fill='#13C2C2' />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="charts-box">
                                        <p className="charts-title">圈子内容分析</p>
                                        <div className="charts-container">
                                            {
                                                detailData.circleAnalyse ? (
                                                    <ResponsiveContainer>
                                                        <BarChart data={detailData.circleAnalyse}
                                                            margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Bar type="linear" dataKey="搜索次数" fill='#3FA0FF' />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                ) : '暂无数据'
                                            }
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={14} style={{ marginBottom: 14 }}>
                                <Col span={16}>
                                    <div className="charts-box">
                                        <p className="charts-title">上网感知分析</p>
                                        <div className="charts-container" ref={ref => { this.gaugeChartDom = ref }}>

                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="charts-box">
                                        <p className="charts-title">用户得分趋势图</p>
                                        <div className="charts-container">
                                            {detailData.scoreTrend ? (<ResponsiveContainer>
                                                <LineChart data={detailData.scoreTrend}
                                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                    <XAxis dataKey="name" padding={{ left: 30 }} />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="linear" dataKey="得分" stroke="#13C2C2" fill='#13C2C2' dot={{ strokeWidth: 0 }} />
                                                </LineChart>
                                            </ResponsiveContainer>) : '暂无数据'
                                            }
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={14}>
                                <Col span={8}>
                                    <div className="charts-box">
                                        <p className="charts-title">上网趋势图</p>
                                        <div className="charts-container">
                                            <ResponsiveContainer>
                                                <ComposedChart data={detailData.onlineTrend}>
                                                    <Tooltip />
                                                    <XAxis dataKey="name" />
                                                    <YAxis yAxisId="left" orientation="left" />
                                                    <YAxis yAxisId="right" orientation="right" />
                                                    <Bar yAxisId="left" dataKey='online_kb' fill='#3FA0FF' />
                                                    <Line yAxisId="right" dataKey='online_minutes' stroke='#FAD344' />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="charts-box">
                                        <p className="charts-title">离网原因排行</p>
                                        <div className="charts-container">
                                            <ResponsiveContainer>
                                                <BarChart
                                                    data={detailData.reasonRanking}
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
                            </Row>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}