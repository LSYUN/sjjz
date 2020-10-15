import React, { Component } from 'react'
import update from 'immutability-helper';
import { Breadcrumb, Table, Input, Button, message, Icon, Rate, Modal, Divider, Form } from 'antd'
import { Link } from 'react-router-dom'
import 'less/forecast/offlist.less'

import api from "src/api";
const { TextArea } = Input, FormItem = Form.Item;

// const SearchForm = Form.create()(({ form, onSearch }) => {
//     const { getFieldDecorator } = form;
//     return (
//         <Form layout="inline" >
//             <FormItem>
//                 {getFieldDecorator('username')(<Input placeholder="接入号" />)}
//             </FormItem>
//             <FormItem>
//                 {getFieldDecorator('name')(<Input placeholder="客户名称" />)}
//             </FormItem>
//             <FormItem>
//                 {getFieldDecorator('phone')(<Input placeholder="电话号码" />)}
//             </FormItem>
//             <FormItem>
//                 <Button
//                     type="primary"
//                     onClick={onSearch}
//                 >
//                     查询
//                 </Button>
//             </FormItem>
//         </Form>
//     )
// })

export default class UsersList extends Component {
    constructor() {
        super()
        this.state = {
            searchParams: {
                username: '',   // 接入号
                name: '',       // 姓名
                phone: ''       // 电话
            },
            modalVisible: false,
            suggestion: {
                id: '',
                advice: '',
                username: '',
            },
            pagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                current: 1,
                pageSize: 10,
                total: 0,
                size: 'default',
            },
            dataSource: [],     // 表格数据
            loading: true,      // 表格加载
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
            title: '得分',
            dataIndex: 'score',
        },
        {
            title: '网络依赖度 ',
            dataIndex: 'dependency',
            render: text => <Rate
                allowHalf
                disabled
                defaultValue={text / 20}
                className="dependence-rate"
            />
        },
        {
            title: '离网概率',
            dataIndex: 'probability',
        },
        {
            title: '操作',
            render: (text, record, index) =>
                <span>
                    <Link to={`/tygq/userPortrait/portraitDetails/${record.username}`}>用户画像</Link>
                    <Divider type="vertical" />
                    <a onClick={this.giveAdvice(record.id, record.username)} > 维挽建议</a>
                </span>
        },
    ]

    // 打开建议模态框
    giveAdvice = (id, username) => e => {
        this.setState(update(this.state, {
            modalVisible: { $set: true },
            suggestion: {
                $set: {
                    id,
                    username,
                    advice: ''
                }
            }
        }))
    }

    // 编辑建议
    eidtAdvice = e => {
        this.setState(update(this.state, {
            suggestion: {
                advice: { $set: e.target.value }
            }
        }))
    }

    // 发送建议
    sendAdvice = () => {
        http.POST(api.userOfflist.giveAdvice, {
            advice: this.state.suggestion.advice,
            id: this.state.suggestion.id
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    message.success('提交成功')
                    this.setState({ modalVisible: false })
                } else {
                    message.error(json.msg)
                }
            })
    }

    // 输入框的统一改变state的函数
    onChange = type => e => {
        this.setState(update(this.state, {
            searchParams: {
                [type]: { $set: e.target.value }
            }
        }))
    }

    //  查询函数
    onSearch = e => {
        // console.log(this.searchForm.getFieldsValue())
        this.setState(update(this.state, {
            loading: { $set: true },
            pagination: {
                current: { $set: 1 }    // 页码变回第一页
            }
        }), this.getData)
    }

    // 请求后台获取数据，与查询同一个接口
    getData = () => {
        const { pagination: { current, pageSize } } = this.state;
        http.POST(`${api.userOfflist.getUserList}/${current}/${pageSize}`, this.state.searchParams)
            .then(res => res.json())
            .then(json => {
                // 做相应的处理
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
            .catch(err => console.error(err))
    }

    // 待后台修改，导出列表
    exportList = e => {
        http.GET(api.userOfflist.exportList, this.state.searchParams)
            .then(res => res.json())
            .then(json => {

            })
            .catch(err => console.error(err))
    }

    // 分页、排序、筛选变化时触发
    tableChange = (pagination, filters, sorter) => {
        this.setState({
            pagination,
            loading: true
        }, this.getData)
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const { searchParams: { username, name, phone }, modalVisible, loading, pagination, suggestion } = this.state
        return (
            <div className="forecast-offlist broadband-page">
                <Breadcrumb>
                    <Breadcrumb.Item>离网预测</Breadcrumb.Item>
                    <Breadcrumb.Item>离网名单</Breadcrumb.Item>
                </Breadcrumb>
                <p className="title">离网人员名单</p>
                {/* <SearchForm
                    wrappedComponentRef={ref => { this.searchForm = ref }}
                    onSearch={this.onSearch}
                /> */}
                <p className="inquire-form">
                    <Input
                        style={{ width: 160 }}
                        placeholder="接入号"
                        value={username}
                        onChange={this.onChange('username')}
                    />
                    <Input
                        style={{ width: 160 }}
                        placeholder="客户名称"
                        value={name}
                        onChange={this.onChange('name')}
                    />
                    <Input
                        style={{ width: 160 }}
                        placeholder="电话号码"
                        value={phone}
                        onChange={this.onChange('phone')}
                    />
                    <Button
                        type="primary"
                        onClick={this.onSearch}
                    >查询</Button>
                    <Button onClick={this.exportList} icon="upload">导出</Button>
                </p>

                <Table
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    rowKey='id'
                    size="middle"
                    pagination={pagination}
                    onChange={this.tableChange}
                    loading={{
                        spinning: loading,
                        tip: '数据正在加载中，请稍候...'
                    }}
                />
                <Modal
                    title="维挽建议"
                    visible={modalVisible}
                    maskClosable={false}
                    onCancel={() => { this.setState({ modalVisible: false }) }}
                    onOk={this.sendAdvice}
                    wrapClassName="offlist-advice-modal"
                >
                    <p>接入号码：{suggestion.username}</p>
                    <p>
                        维挽建议：
                        <TextArea
                            placeholder="请输入至少五个字符"
                            rows={3}
                            onChange={this.eidtAdvice}
                            value={suggestion.advice}
                        />
                    </p>
                </Modal>
            </div>
        )
    }
}