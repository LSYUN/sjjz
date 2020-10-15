/**
 * Created by wzb on 2018/3/8.
 * 数据连接管理组件
 */
import React, {Component} from 'react';
import {Layout, Icon, Spin, Select, Table, Modal, Form, Input, Button, message, Divider} from 'antd'
// import {api} from 'src/api'
// import {http} from 'http'

import DataConnectType from './DataConnectType'
import DataConnectConfig from './DataConnectConfig'
import '../../less/dataCenter.less'
const {Content} = Layout;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;

const dataConnectList = require('../../data/dataConnectList.json');

export default class DataConnectManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            op: '', //操作类型add或modify
            statusTime: null, //状态时间
            data: [],
            spinning: false,
            modalSpinning: false,
            checkResult: null, //名称唯一性校验结果
            type: Number(),       //  连接类型
            typeVisible: false,  // 类型模态框是否显示
            dataConfigVisible: false,  // 参数配置模态框是否显示
            selectedRowKeys: [],
            connectDetail: {},
            filter: {
                page: {
                    curPage: 1,
                    pageSize: 15,
                    total: 0
                },
                listReq: {
                    name: '',
                    ip: ''
                }
            },
            connectIcon: {
                type: 'sync',
                loading: false
            }
        };
        //启动websocket连接
        // this.ws = new WebSocket('ws://' + location.host + api.dataCenter.testConnect);
    }

    // 表格表头字段
    columns = [
        {
            title: '连接名称',
            dataIndex: 'name'
        }, {
            title: '连接类型',
            dataIndex: 'type',
            render: (text, record) => {
                // console.log(text);
                switch (text) {
                    case '1':
                        return (<span>mysql</span>);
                    case '2':
                        return (<span>oracle</span>);
                    case '3':
                        return (<span>SQL-Server</span>)
                }
            }
        }, {
            title: '地址',
            dataIndex: 'ip'
        }, {
            title: '数据库名',
            dataIndex: 'database'
        }, {
            title: '根目录',
            dataIndex: 'rootDir'
        }, {
            title: '端口',
            dataIndex: 'port'
        }, {
            title: '用户名',
            dataIndex: 'username'
        }, {
            title: '创建组织',
            dataIndex: 'cg'
        }, {
            title: '创建人',
            dataIndex: 'cu'
        }, {
            title: '创建时间',
            dataIndex: 'ct'
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => {
                switch (text) {
                    case '1':
                        return (
                            <span>可用</span>
                        );
                    case '2':
                        return (
                            <span>新建</span>
                        );
                    case '0':
                        return (
                            <span>不可用</span>
                        )
                }
            }
        }, {
            title: '状态说明',
            dataIndex: 'statusReason',
            width: 150
        }, {
            title: '状态更新时间',
            dataIndex: 'statusTime'
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={this.operateDataConnectConfig(record)}>详情</a>
                    <Divider type="vertical"/>
                    <a onClick={(e)=>this.deleteConnect(record, e)}>删除</a>
                    <Divider type="vertical"/>
                    <a >测试</a>
                </span>
            )
        }
    ];

    // componentDidMount() {
    //
    //     // 启动定时器检测websocker连接
    //     let that = this;
    //     this.websocket = setInterval(function () {
    //         if (that.ws.readyState === 0 || that.ws.readyState === 3){
    //             that.ws = new WebSocket('ws://' + location.host + api.dataCenter.testConnect);
    //         }
    //     }, 2000);
    //
    //     http.GET(api.dataCenter.getConnectionList)
    //         .then(response => response.json())
    //         .then(json => {
    //             if (json.success === 'true') {
    //                 let data = json.data;
    //                 let {filter, listReq} = this.state.filter;
    //                 this.setState({
    //                     data: data.list,
    //                     // filter: Object.assign(filter, {page: data.page, listReq: listReq})
    //                 })
    //             }
    //         })
    //         .catch(err => console.error(err));
    //     this.setState({
    //         spinning: false
    //     });
    //
    // }

    //组件卸载时，关闭websocket连接
    componentWillUnmount() {
        // console.log(this.ws.readyState)
        // clearInterval(this.websocket); //移除定时器
        // this.ws.close();
    }

    // 打开连接类型模态框
    showDataConnectType = () => {
        this.setState({
                typeVisible: true,
                type: Number()
            }
        )
    };

    //选择数据连接类型
    selectDataConnect = (connectType) => {
        this.setState({
            type: connectType
        })
    };

    //后退
    back = operator => (e) => {
        if (operator === 'add') {
            this.setState({
                typeVisible: true,
                dataConfigVisible: false
            })
        } else {
            this.setState({
                dataConfigVisible: false
            })
        }
    };

    //新增或修改连接配置项（打开模态框）
    operateDataConnectConfig = record =>(e) => {
        this.form.resetFields();
        this.setState({
            dataConfigVisible: true,
            connectIcon: {
                type: 'sync',
                loading: false
            }
        });
        if (record) {
            this.setState({
                connectDetail: record,
                op: 'modify'
            })
        } else {
            this.setState({
                typeVisible: false,
                connectDetail: {},
                op: 'add'
            })
        }
    };

    //保存数据连接配置项
    saveDataConnect = (op, statusTime, connectDetail) => (e) => {

        this.form.validateFields((err, values) => {
            console.log(values)
            if (err) return;
            this.setState({
                modalSpinning: true
            });
            values.op = op;
            if (connectDetail) {
                values.id = connectDetail.id;
                values.oldName = connectDetail.name
            }
            let type = values.type;
            let status = values.status;
            switch (type) {
                case 'Mysql':
                    values.type = 1;
                    break;
                case 'Oracle':
                    values.type = 2;
                    break;
                case 'SQLServer':
                    values.type = 3;
                    break;
                case 'hive':
                    values.type = 4;
                    break;
                case 'ftp':
                    values.type = 5;
                    break;
            }
            switch (status) {
                case '可用':
                    values.status = '1';
                    break;
                case '新建':
                    values.status = '2';
                    break;
                case '不可用':
                    values.status = '0';
                    break;
            }
            values.statusTime = statusTime ? this.dateRevert(statusTime) : '';
            // http.POST(api.dataCenter.submitConnect, values)
            //     .then(response => response.json())
            //     .then(json => {
            //         if (json.success === 'true') {
            //             message.info(json.msg, 5);
            //             this.setState((prevState, props) => {
            //                 return {
            //                     modalSpinning: !prevState.modalSpinning,
            //                     dataConfigVisible: !prevState.dataConfigVisible
            //                 }
            //             });
            //             window.location.reload(true);
            //         } else {
            //             message.error(json.msg, 5);
            //             this.setState((prevState, props) => {
            //                 return {
            //                     modalSpinning: !prevState.modalSpinning,
            //                     dataConfigVisible: !prevState.dataConfigVisible
            //                 }
            //             });
            //         }
            //     })
            //     .catch(err => console.error(err));
        });
    };

    //时间格式转换
    dateRevert = (date) => {
        var seperator1 = "-", seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
        }
        if (second >= 0 && second <= 9) {
            second = "0" + second;
        }
        let currentDate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
        return currentDate;
    }

    //删除连接
    deleteConnect = (record, e) => {
        e.preventDefault();
        let data = {};
        data.op = 'delete';
        data.id = record.id;
        confirm({
            title: '确定删除?',
            cancelText: '取消',
            okText: '确定',
            content: '点击“确定”按钮，删除此项',
            onOk: () => {
                // http.POST(api.dataCenter.submitConnect, data)
                //     .then(response => response.json())
                //     .then(json => {
                //         if (json.success === 'true') {
                //             let newData = this.state.data;
                //             newData.forEach((item, index) => {
                //                 if (item.id === data.id) {
                //                     newData.splice(index, 1)
                //                 }
                //             });
                //             this.setState({
                //                 data: newData
                //             });
                //             success({title: '删除成功！'});
                //         } else {
                //             error({title: '删除失败！'})
                //         }
                //     })
                //     .catch(err => console.error(err))
            }
        })
    };

    //按条件查询
    searchDataConnect = (filter, e) => {
        this.commonAsyncFunction(filter)
    };

    //公共函数
    commonAsyncFunction = (filter) => {
        this.setState({
            spinning: true
        });
        // http.POST(api.dataCenter.getConnectionListByCondition, filter)
        //     .then(response => response.json())
        //     .then(json => {
        //         if (json.success === 'true') {
        //             this.setState({
        //                 data: json.data.list,
        //                 spinning: false
        //             })
        //         }
        //     })
        //     .catch(err => console.error(err));
    }

    //绑定表单
    saveFormRef = (form) => {
        this.form = form;
    };

    //测试连接，四种状态：未建立连接、连接可用、连接建立不成功、建立连接但不确定可用
    testDataConnect = () => {

        let ws = this.ws;
        let that = this;
        this.form.validateFields((err, values) => {
            if (err) return; // 必填项目为空弹出错误
            that.setState({
                connectIcon: {
                    type: 'loading',
                    loading: true
                }
            });
            let type = values.type;
            switch (type) {
                case 'Mysql':
                    values.type = 1;
                    break;
                case 'Oracle':
                    values.type = 2;
                    break;
                case 'SQL-Server':
                    values.type = 3;
                    break;
                case 'hive':
                    values.type = 4;
                    break;
                case 'ftp':
                    values.type = 5;
                    break;
            }

            ws.send(JSON.stringify(values));
            ws.onmessage = function (e) {
                let json = JSON.parse(e.data);
                if (json.success === 'true') {
                    //心跳消息
                    if (json.resultType === 2) {
                        return;
                    } else if (json.resultType === 1) {
                        let testOk = setTimeout(function () {
                            that.setState({
                                statusTime: new Date(),
                                connectIcon: {
                                    type: 'check-circle-o',
                                    loading: false
                                }
                            });
                        }, 8000)
                    } else {
                        let testUnSure = setTimeout(function () {
                            that.setState({
                                connectIcon: {
                                    type: 'question-circle-o',
                                    loading: false
                                }
                            });
                        }, 8000)
                    }
                } else {
                    // message.error('测试连接失败。。。');
                    that.setState({
                        modalSpinning: false,
                        type: 'close-circle-o'
                    });
                }
            };
        })
    };

    //校验数据连接名称唯一性
    checkConnectName = (e, newName, oldName, operate) => {
        let data = {};
        if (operate === 'add') {
            data.op = operate;
            data.name = newName;
        } else {
            data.op = operate;
            data.name = newName;
            data.oldName = oldName;
        }
        // http.POST(api.dataCenter.checkConnName, data)
        //     .then(response => response.json())
        //     .then(json => {
        //         if (json.success === 'true') {
        //             this.setState({
        //                 checkResult: true
        //             })
        //         } else {
        //             this.setState({
        //                 checkResult: false
        //             })
        //         }
        //     })
        //     .catch(err => console.error(err));
    };

    // 分页器函数
    changePagination = (page, pageSize) => {
        let filter = this.state.filter;
        let listReq = filter.listReq;
        let newFilter;
        this.setState({
            filter: Object.assign(filter, {
                page: {curPage: page, pageSize: pageSize},
                listReq: listReq
            })
        });
        newFilter = Object.assign(filter, {
            page: {curPage: page, pageSize: pageSize},
            listReq: listReq
        });
        this.commonAsyncFunction(newFilter)
    };

    render() {
        const {typeVisible, modalSpinning, statusTime, checkResult, type, dataConfigVisible, connectDetail, spinning, data, filter, op, connectIcon} = this.state;
        const {curPage, pageSize} = filter.page;
        const pagination = {
            current: filter.page.curPage,
            total: filter.page.total,
            showQuickJumper: true,
            pageSize: filter.page.pageSize,
            defaultCurrent: 1,
            onChange: this.changePagination
        };
        return (
            <Content className="data-center " style={{background: '#fff'}}>
                <Spin spinning={spinning}>
                    <div className='connect-manage-component'>
                        {/*<div className="data-connect-title"*/}
                             {/*style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', marginBottom: '16px'}}>*/}
                            {/*数据连接列表查询*/}
                        {/*</div>*/}
                        <Form layout="inline" className="search-bar-operation" style={{marginBottom: '16px'}}>
                            <FormItem>
                                <Button
                                    type="primary"
                                    onClick={this.showDataConnectType}
                                    icon="plus"
                                >数据连接</Button>
                            </FormItem>
                            <FormItem label="连接名称">
                                <Input type="text" onChange={(e) => {
                                    let ip = filter.listReq.ip;
                                    this.setState({
                                    filter: Object.assign(filter, {page: {curPage: 1,pageSize: 15},listReq: {name: e.target.value, ip: ip}})})
                                }}/>
                            </FormItem>
                            <FormItem label="连接IP">
                                <Input type="text" onChange={(e) => {
                                    let name = filter.listReq.name;
                                    this.setState({
                                    filter: Object.assign(filter, {page: {curPage: 1,pageSize: 15},listReq: {ip: e.target.value, name: name }})})
                                }}/>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" onClick={(e) => this.searchDataConnect(filter, e)} icon="search">查询</Button>
                            </FormItem>
                        </Form>
                        <DataConnectType
                            visible={typeVisible}
                            type={this.state.type}
                            onCancel={()=> {
                                this.setState({
                                    typeVisible: false
                                })
                            }}
                            onCreate={this.operateDataConnectConfig()}
                            selectDataConnect={this.selectDataConnect}
                        />
                        <DataConnectConfig
                            visible={dataConfigVisible}
                            statusTime={statusTime}
                            connectType={type}
                            checkResult={checkResult}
                            modalSpinning={modalSpinning}
                            operate={op}
                            connectIcon={connectIcon}
                            ref={this.saveFormRef}
                            connectDetail={connectDetail}
                            onCancel={()=> {
                                this.setState({
                                    dataConfigVisible: false
                                })
                            }}
                            onCreate={this.saveDataConnect(op, statusTime, connectDetail)}
                            onTest={this.testDataConnect}
                            checkConnectName={this.checkConnectName}
                            back={this.back(op)}
                        />
                        <Table
                            rowKey='id'
                            pagination={pagination}
                            className='data-connect-list-table'
                            columns={this.columns}
                            dataSource={dataConnectList.data.list}
                        />
                    </div>
                </Spin>
            </Content>
        )
    }
}