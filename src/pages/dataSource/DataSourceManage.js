/**
 * Created by wzb on 2018/3/15.
 * 数据源列表
 */
import React, {Component} from 'react';
import update from 'immutability-helper';
import {Layout, Icon, Spin, Select, Table, Modal, Form, Input, Button, Radio, message, Divider, Menu, Dropdown, Tabs} from 'antd'
// import {api} from 'src/api'
// import {http} from 'http'
import DataSourceType from './DataSourceType'
import '../../less/dataCenter.less'

const dataSourceList = require('../../data/dataSourceList.json');
const dataConnectList = require('../../data/dataConnectList.json');

const {Content} = Layout;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;
const TabPane = Tabs.TabPane;

export default class DataSourceManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinning: false,
            typeVisible: false,
            localSourceType: '', //本地源类型
            dataSourceDetail: {},
            centralizationModalVisible: false,
            centralizationLogModalVisible: false,
            dispatchModalVisible: false,
            dispatchLogModalVisible: false,
            dispatchOpModalVisible: false,
            manualCentralizationModalVisible: false,
            manualDispatchModalVisible: false,
        }
    }
    
    // 采集操作详情菜单
    centralizationDetailMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={() => this.showCentralizationModal()}>采集</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={() => this.showCentralizationLogModal()}>采集日志(2018-4-16 16:17:38)</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" >终止采集</a>
        </Menu.Item>
      </Menu>
    );
    
    // 分发操作详情菜单
    dispatchDetailMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={() => this.showDispatchModal()}>分发日志</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" >终止分发</a>
        </Menu.Item>
      </Menu>
    );

    // 表格表头字段
    columns = [
        {
            title: '数据源名称',
            dataIndex: 'name',
            key: 'name',
            //width: 100,
            className: 'text-overflow',
        }, {
            title: '业务类型',
            dataIndex: 'type',
            key: 'type',
            //width: 120,
            className: 'text-overflow',
        }, {
            title: '存储表名',
            dataIndex: 'table',
            key: 'table',
            //width: 120,
            className: 'text-overflow',
        }, {
            title: '采集连接类型',
            dataIndex: 'connType',
            key: 'connType',
            //width: 120,
            className: 'text-overflow',
        }, {
            title: '采集周期',
            dataIndex: 'cycle',
            key: 'cycle',
            //width: 120,
            className: 'text-overflow',
        }, {
            title: '源文件名',
            dataIndex: 'fileFormat',
            key: 'fileFormat',
            className: 'text-overflow',
            //width: 120,
        }, {
            title: '采集量',
            dataIndex: 'inSize',
            key: 'inSize',
            className: 'text-overflow',
            //width: 120,
        }, {
            title: '数据源应用类型',
            dataIndex: 'busiType',
            key: 'busiType',
            className: 'text-overflow',
            //width: 120,
        }, {
            title: '存储类型',
            dataIndex: 'store',
            key: 'store',
            className: 'text-overflow',
            //width: 180,
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            className: 'text-overflow',
            //width: 180,
        }, {
            title: '状态原因',
            key: 'statusReason',
            dataIndex: 'statusReason',
            className: 'text-overflow',
            //width: 180,
        }, {
            title: '基本操作',
            dataIndex: 'action',
            key: 'action',
            className: 'text-overflow',
            width: 100,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={()=>this.dataSourceDetail(record)}>详情</a>
                    <br/>
                    <a onClick={() => this.dataConnectDetail(record)}>连接详情</a>
                    <br/>
                    <a onClick={(e) => this.deleteDataSource(record, e)}>删除</a>
                </span>
            )
        }, {
            title: '采集操作',
            dataIndex: 'InputAction',
            key: 'InputAction',
            className: 'text-overflow',
            width: 120,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={(e) => this.deleteDataSource(record, e)}>删除</a>
                    <Divider type="vertical"/>
                    <Dropdown overlay={this.centralizationDetailMenu}>
                      <a>详情</a>
                    </Dropdown>
                </span>
            )
        }, {
            title: '分发操作',
            dataIndex: 'outputAction',
            key: 'outputAction',
            className: 'text-overflow',
            width: 120,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={(e) => this.deleteDataSource(record, e)}>删除</a>
                    <Divider type="vertical"/>
                    <Dropdown overlay={this.dispatchDetailMenu}>
                      <a>详情</a>
                    </Dropdown>  
                </span>
            )
        }
    ];
    
    // 采集表格表头字段
    centralizationColumns = [
        {
            title: '运行的采集数据批次',
            dataIndex: 'batch',
            key: 'batch',
            className: 'text-overflow',
        }, {
            title: '开始时间',
            dataIndex: 'start',
            key: 'start',
            className: 'text-overflow',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            className: 'text-overflow',
        }, {
            title: '操作',
            dataIndex: 'InputAction',
            key: 'InputAction',
            className: 'text-overflow',
            render: (text, record) => (
                <span>
                    <a>终止</a>
                </span>
            )
        }
    ];
    
    // 采集表格数据
    centralizationData = [
      { 
        key: '1',
        batch: '20180301',
        start: '2014-04-16 13:00:00',
        type: '全量'
      }, {
        key: '2',
        batch: '20180302',
        start: '2014-04-16 13:00:01',
        type: '增量'
      }
    ];
    // 采集表格表头字段
    dispatchOpColumns = [
        {
            title: '运行的分发数据批次',
            dataIndex: 'batch',
            key: 'batch',
            className: 'text-overflow',
        }, {
            title: '开始时间',
            dataIndex: 'start',
            key: 'start',
            className: 'text-overflow',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            className: 'text-overflow',
        }, {
            title: '操作',
            dataIndex: 'InputAction',
            key: 'InputAction',
            className: 'text-overflow',
            render: (text, record) => (
                <span>
                    <a>终止</a>
                </span>
            )
        }
    ];
    
    // 分发表格数据
    dispatchOpData = [
      { 
        key: '1',
        batch: '20180301',
        start: '2014-04-16 13:00:00',
        type: '全量'
      }, {
        key: '2',
        batch: '20180302',
        start: '2014-04-16 13:00:01',
        type: '增量'
      }
    ];
    
    // 全量采集表格表头字段
    fullCentralizationLogColumns = [
        {
            title: '采集步骤名',
            dataIndex: 'name',
            key: 'name',
            className: 'text-overflow',
        }, {
            title: '开始时间',
            dataIndex: 'start',
            key: 'start',
            className: 'text-overflow',
        }, {
            title: '结束时间',
            dataIndex: 'end',
            key: 'end',
            className: 'text-overflow',
        }, {
            title: '耗时（秒）',
            dataIndex: 'cost',
            key: 'cost',
            className: 'text-overflow',
        }, {
            title: '步骤状态',
            dataIndex: 'status',
            key: 'status',
            className: 'text-overflow',
        }, {
            title: '步骤失效原因',
            dataIndex: 'reason',
            key: 'reason',
            className: 'text-overflow',
        }, {
            title: '数据量',
            dataIndex: 'dataSize',
            key: 'dataSize',
            className: 'text-overflow',
        }, {
            title: '记录数',
            dataIndex: 'recordSize',
            key: 'recordSize',
            className: 'text-overflow',
        }
    ];
    
    // 全量采集表格数据
    fullCentralizationLogData = [
      { 
        key: '1',
        name: 'FTP下载',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '300',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }, {
        key: '2',
        name: '合并文件',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '60',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }, {
        key: '3',
        name: '入临时表',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '50',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }, {
        key: '4',
        name: '入存储表',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '30',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }
    ];
    
    // 增量采集表格表头字段
    incrementCentralizationLogColumns = [
        {
            title: '增量采集批次',
            dataIndex: 'batch',
            key: 'batch',
            className: 'text-overflow',
        },{
            title: '采集步骤名',
            dataIndex: 'name',
            key: 'name',
            className: 'text-overflow',
        }, {
            title: '开始时间',
            dataIndex: 'start',
            key: 'start',
            className: 'text-overflow',
        }, {
            title: '结束时间',
            dataIndex: 'end',
            key: 'end',
            className: 'text-overflow',
        }, {
            title: '耗时（秒）',
            dataIndex: 'cost',
            key: 'cost',
            className: 'text-overflow',
        }, {
            title: '步骤状态',
            dataIndex: 'status',
            key: 'status',
            className: 'text-overflow',
        }, {
            title: '步骤失效原因',
            dataIndex: 'reason',
            key: 'reason',
            className: 'text-overflow',
        }, {
            title: '数据量',
            dataIndex: 'dataSize',
            key: 'dataSize',
            className: 'text-overflow',
        }, {
            title: '记录数',
            dataIndex: 'recordSize',
            key: 'recordSize',
            className: 'text-overflow',
        }
    ];
    
    // 增量采集策略表格数据
    incrementCentralizationLogData = [
      { 
        key: '5',
        batch: '20180416163000',
        name: 'FTP下载',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '300',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }, {
        key: '6',
        batch: '20180416163000',
        name: '合并文件',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '60',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }, {
        key: '7',
        batch: '20180416163000',
        name: '入临时表',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '50',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }, {
        key: '8',
        batch: '20180416163000',
        name: '入存储表',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '30',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }
    ];
    
    // 分发策略表格表头字段
    dispatchColumns = [
        {
            title: '分发连接名',
            dataIndex: 'name',
            key: 'name',
            className: 'text-overflow',
        }, {
            title: '分发连接类型',
            dataIndex: 'type',
            key: 'type',
            className: 'text-overflow',
        }, {
            title: '分发周期',
            dataIndex: 'cycle',
            key: 'cycle',
            className: 'text-overflow',
        }, {
            title: '最近数据批次全量完成时间',
            dataIndex: 'cost',
            key: 'cost',
            className: 'text-overflow',
        }, {
            title: '分发目标',
            dataIndex: 'target',
            key: 'target',
            className: 'text-overflow',
        }, {
            title: '分发量',
            dataIndex: 'size',
            key: 'size',
            className: 'text-overflow',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            className: 'text-overflow',
        }, {
            title: '状态原因',
            dataIndex: 'reason',
            key: 'reason',
            className: 'text-overflow',
        }, {
            title: '分发操作',
            dataIndex: 'outputAction',
            key: 'outputAction',
            className: 'text-overflow',
            width: 180,
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showDispatchOpModal()}>分发</a>
                    <Divider type="vertical"/>
                    <a>终止</a>
                    <Divider type="vertical"/>
                    <a onClick={() => this.showDispatchLogModal()}>日志</a>
                </span>
            )
        }
    ];
    
    // 全量采集表格数据
    dispatchData = [
      {
        key: '9',
        name: 'IQ数据库(192.168.23.1)',
        type: 'IQ',
        cycle: '采集完成时',
        cost: '2018-04-16 16:00:00',
        target: 'IQ_TB_CDMA_3G_BILLED_D',
        size: '60G',
        status: '分发正常',
        reason: '',
      }, {
        key: '10',
        name: 'IQ数据库(192.168.23.2)',
        type: 'IQ',
        cycle: '每日18点10分运行',
        cost: '2018-04-16 16:50:00',
        target: 'IQ_TB_CDMA_3G_BIL_D',
        size: '60G',
        status: '分发正常',
        reason: '',
      }
    ];
    
    // 全量分发表格表头字段
    fullDispatchColumns = [
        {
            title: '分发步骤名',
            dataIndex: 'name',
            key: 'name',
            className: 'text-overflow',
        }, {
            title: '开始时间',
            dataIndex: 'start',
            key: 'start',
            className: 'text-overflow',
        }, {
            title: '结束时间',
            dataIndex: 'end',
            key: 'end',
            className: 'text-overflow',
        }, {
            title: '耗时（秒）',
            dataIndex: 'cost',
            key: 'cost',
            className: 'text-overflow',
        }, {
            title: '步骤状态',
            dataIndex: 'status',
            key: 'status',
            className: 'text-overflow',
        }, {
            title: '步骤失效原因',
            dataIndex: 'reason',
            key: 'reason',
            className: 'text-overflow',
        }, {
            title: '数据量',
            dataIndex: 'dataSize',
            key: 'dataSize',
            className: 'text-overflow',
        }, {
            title: '记录数',
            dataIndex: 'recordSize',
            key: 'recordSize',
            className: 'text-overflow',
        }
    ];
    
    // 全量分发表格数据
    fullDispatchData = [
      {
        key: '11',
        name: '分发到临时表',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '300',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }, {
        key: '12',
        name: '清理目标表相关数据',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '60',
        status: '成功',
        reason: '',
        dataSize: '-',
        recordSize: '-'
      }, {
        key: '13',
        name: '临时表写入目标表',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '50',
        status: '成功',
        reason: '',
        dataSize: '50G',
        recordSize: '1000000'
      }
    ];
    
    // 补发表格表头字段
    additionalDispatchColumns = [
        {
            title: '补发批次',
            dataIndex: 'batch',
            key: 'batch',
            className: 'text-overflow',
        }, {
            title: '分发步骤名',
            dataIndex: 'name',
            key: 'name',
            className: 'text-overflow',
        }, {
            title: '开始时间',
            dataIndex: 'start',
            key: 'start',
            className: 'text-overflow',
        }, {
            title: '结束时间',
            dataIndex: 'end',
            key: 'end',
            className: 'text-overflow',
        }, {
            title: '耗时（秒）',
            dataIndex: 'cost',
            key: 'cost',
            className: 'text-overflow',
        }, {
            title: '步骤状态',
            dataIndex: 'status',
            key: 'status',
            className: 'text-overflow',
        }, {
            title: '步骤失效原因',
            dataIndex: 'reason',
            key: 'reason',
            className: 'text-overflow',
        }, {
            title: '数据量',
            dataIndex: 'dataSize',
            key: 'dataSize',
            className: 'text-overflow',
        }, {
            title: '记录数',
            dataIndex: 'recordSize',
            key: 'recordSize',
            className: 'text-overflow',
        }
    ];
    
    // 全量分发表格数据
    additionalDispatchData = [
      { 
        key: '14',
        batch: '20180416172038',
        name: '分发到临时表',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '300',
        status: '成功',
        reason: '',
        dataSize: '10G',
        recordSize: '200000'
      }, {
        key: '15',
        batch: '20180416172038',
        name: '临时表写入目标表',
        start: '2018-04-16 16:10:00',
        end: '2018-04-16 16:15:00',
        cost: '50',
        status: '成功',
        reason: '',
        dataSize: '10G',
        recordSize: '200000'
      }
    ];

    dataConnectDetail = record => {
        let dataConnectColumns = [
            {
                title: '连接名称',
                dataIndex: 'name'
            }, {
                title: '连接类型',
                dataIndex: 'type',
                render: (text, record) => {
                    switch (text) {
                        case '1':
                            return (<span>mysql</span>);
                        case '2':
                            return (<span>oracle</span>);
                        case '3':
                            return (<span>SQL-Server</span>);
                        default :
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
            }
        ];
        let data = [];
        let id = record.connId;
        let dataConnetcList = dataConnectList.data.list;
        for (let i = 0; i < dataConnetcList.length; i++) {
            if (id === dataConnetcList[i].id) {
                data.push(dataConnetcList[i])
            }
        };

        Modal.info({
            title: '数据连接详情',
            content: (
                <Table
                    className='data-connect-detail'
                    columns={dataConnectColumns}
                    dataSource={data}
                />
            ),
            onOk() {
            },
            width: 1200
        });
    }

    // 静态数据
    data = [{
        id: 1,
        key: '1',
        connectionName: 'mysql',
        ipAddress: '192.168.66.1',
        port: '3200',
        connectType: '',
        connectUserName: 'sendi',
        creator: 'admin',
        createTime: '2018-03-13 10:00:00',
        connectStatus: '正常',
        database: 'bigdata'
    }];

    componentDidMount() {
        this.setState({
            spinning: false
        })
    }

    // 显示数据源类型模态框
    showDataSourceType = () => {
        this.setState({
            typeVisible: true
        })
    };

    // 关闭数据源类型模态框
    hideDataSourceType = () => {
        this.setState({
            typeVisible: false
        })
    };

    // 选择数据源类型然后确定
    selectDataSourceType = (localSource,remoteSource, e) => {
        if (localSource.type) {
            window.open('/sjjz/telecom/dataCenter/dataSource/localSource', "_top")
        } else {
            window.open('/sjjz/telecom/dataCenter/dataSource/remoteSource', "_top")
        }
    };

    // 选择本地源类型
    selectLocalSourceType = (type) => {
        this.setState({
            localSourceType: type
        })
    };

    dataSourceDetail = () => {
        window.open('/sjjz/telecom/dataCenter/dataSource/dataSourceDetail', "_top")
    };

    deleteDataSource = (record, e) => {
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
            }
        })
    };
    
    onInputChange = () => {
    
    };
    
    // 采集弹出框对应操作
    showCentralizationLogModal = () => {
      this.setState({
        centralizationLogModalVisible: true,
      }, () => {
        //console.log(this.state);
      });
    };
    
    handleCentralizationLogModalOk = (e) => {
      //console.log(e);
      this.setState({
        centralizationLogModalVisible: false,
      });
    };
    
    handleCentralizationLogModalCancel = (e) => {
      //console.log(e);
      this.setState({
        centralizationLogModalVisible: false,
      });
    };
    
    // 分发操作弹出框对应操作
    showDispatchOpModal = () => {
      this.setState({
        dispatchOpModalVisible: true,
      }, () => {
        //console.log(this.state);
      });
    };
    
    handleDispatchOpModalOk = (e) => {
      this.setState({
        dispatchOpModalVisible: false,
      });
    };
    
    handleDispatchOpModalCancel = (e) => {
      //console.log(e);
      this.setState({
        dispatchOpModalVisible: false,
      });
    };
    
    // 分发弹出框对应操作
    showDispatchModal = () => {
      this.setState({
        dispatchModalVisible: true,
      }, () => {
        //console.log(this.state);
      });
    };
    
    handleDispatchModalOk = (e) => {
      this.setState({
        dispatchModalVisible: false,
      });
    };
    
    handleDispatchModalCancel = (e) => {
      //console.log(e);
      this.setState({
        dispatchModalVisible: false,
      });
    };
    
    // 采集弹出框对应操作
    showCentralizationModal = () => {
      this.setState({
        centralizationModalVisible: true,
      }, () => {
        //console.log(this.state);
      });
    };
    
    handleCentralizationModalOk = (e) => {
      this.setState({
        centralizationModalVisible: false,
      });
    };
    
    handleCentralizationModalCancel = (e) => {
      //console.log(e);
      this.setState({
        centralizationModalVisible: false,
      });
    };
    
    // 分发操作弹出框对应操作
    showDispatchLogModal = () => {
      this.setState({
        dispatchLogModalVisible: true
      }, () => {
        //console.log(this.state);
      });
    };
    
    handleDispatchLogModalOk = (e) => {
      this.setState({
        dispatchLogModalVisible: false,
      });
    };
    
    handleDispatchLogModalCancel = (e) => {
      //console.log(e);
      this.setState({
        dispatchLogModalVisible: false,
      });
    };
    
    // 手动采集弹出框对应操作
    showManualCentralizationModal = () => {
      this.setState({
        manualCentralizationModalVisible: true,
      }, () => {
        //console.log(this.state);
      });
    };
    
    handleManualCentralizationModalOk = (e) => {
      this.setState({
        manualCentralizationModalVisible: false,
      });
    };
    
    handleManualCentralizationModalCancel = (e) => {
      //console.log(e);
      this.setState({
        manualCentralizationModalVisible: false,
      });
    };
    
    // 手动分发弹出框对应操作
    showManualDispatchModal = () => {
      this.setState({
        manualDispatchModalVisible: true,
      }, () => {
        //console.log(this.state);
      });
    };
    
    handleManualDispatchModalOk = (e) => {
      this.setState({
        manualDispatchModalVisible: false,
      });
    };
    
    handleManualDispatchModalCancel = (e) => {
      //console.log(e);
      this.setState({
        manualDispatchModalVisible: false,
      });
    };
      
    render() {
        const {typeVisible, localSourceType, dataSourceDetail, spinning} = this.state;

        const pageSetting = {
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20', '30'],
            showSizeChanger: true,
            total: this.data.length,
            showTotal: function showTotal(total) {
                return `总共 ${total} 条记录`;
            }
        };
        
        const formItemLayout = {
          labelCol: { span: 8 },
          wrapperCol: { span: 10 },
        };
        
        return (
            <Content className="data-center" style={{background: '#fff'}}>
                <Spin spinning={spinning}>
                    <div className='data-source-manage'>
                        {/*<div className="data-source-title"*/}
                        {/*style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', marginBottom: '16px'}}>*/}
                        {/*数据源列表*/}
                        {/*</div>*/}
                        <div style={{marginBottom: '16px'}}>
                            <Button
                                type="primary"
                                onClick={this.showDataSourceType}
                                icon="plus"
                            >数据源</Button>
                        </div>
                        <Form layout="inline" className="data-source-search" style={{marginBottom: '16px'}}>
                            <FormItem label="数据源名称">
                                <Input  />
                            </FormItem>
                            <FormItem label="连接名称">
                                <Input />
                            </FormItem>
                            <FormItem label="连接类型">
                                <Select defaultValue="请选择" style={{width: 120}}>
                                    <Option value="mysql">mysql</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="状态">
                                <RadioGroup>
                                    <Radio value={1}>正常</Radio>
                                    <Radio value={0}>异常</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem className='searchDataSource'>
                                <Button type="primary" onClick={this.searchDataConnect} icon="search">查询</Button>
                            </FormItem>
                        </Form>
                        <Table
                            pagination={pageSetting}
                            className='data-source-list-table'
                            columns={this.columns}
                            dataSource={dataSourceList.data.list}
                            scroll={{ x: '150%' }}
                        />
                        <DataSourceType
                            visible={typeVisible}
                            onCancel={this.hideDataSourceType}
                            onCreate={this.selectDataSourceType}
                            selectLocalSourceType={this.selectLocalSourceType}
                        />
                        <Modal
                          title="分发日志列表"
                          visible={this.state.dispatchModalVisible}
                          onOk={this.handleDispatchModalOk}
                          onCancel={this.handleDispatchModalCancel}
                          width={1200}
                        >
                          <Form layout="inline" className="data-source-search" style={{marginBottom: '5px'}}>
                              <FormItem label="分发数据源名称">
                                  <Input disabled value="TB_CDMA_3G_BILLED_D" />
                              </FormItem>
                          </Form>
                          <Table
                              pagination={pageSetting}
                              className='data-source-list-table'
                              columns={this.dispatchColumns}
                              dataSource={this.dispatchData}
                          />
                        </Modal>
                        <Modal
                          title="分发设置"
                          visible={this.state.dispatchOpModalVisible}
                          onOk={this.handleDispatchOpModalOk}
                          onCancel={this.handleDispatchOpModalCancel}
                          width={1000}
                        >
                          <Form layout="inline" className="data-source-search" style={{marginBottom: '16px'}}>
                              <FormItem label="数据批次">
                                  <Input onChange={this.onInputChange} />
                              </FormItem>
                              <FormItem label="数据类型">
                                  <Select defaultValue="请选择" style={{width: 120}}>
                                      <Option value="all">全部</Option>
                                  </Select>
                              </FormItem>
                              <FormItem className='searchDataSource'>
                                  <Button type="primary" icon="search">查询</Button>
                              </FormItem>
                          </Form>
                          <Table
                              pagination={pageSetting}
                              className='data-source-list-table'
                              columns={this.dispatchOpColumns}
                              dataSource={this.dispatchOpData}
                          />
                          <Button type="primary" onClick={this.showManualDispatchModal}>手动添加分发</Button>
                        </Modal>
                        <Modal
                          title="采集设置"
                          visible={this.state.centralizationModalVisible}
                          onOk={this.handleCentralizationModalOk}
                          onCancel={this.handleCentralizationModalCancel}
                          width={1000}
                        >
                          <Form layout="inline" className="data-source-search" style={{marginBottom: '16px'}}>
                              <FormItem label="数据批次">
                                  <Input onChange={this.onInputChange} />
                              </FormItem>
                              <FormItem label="数据类型">
                                  <Select defaultValue="请选择" style={{width: 120}}>
                                      <Option value="all">全部</Option>
                                  </Select>
                              </FormItem>
                              <FormItem className='searchDataSource'>
                                  <Button type="primary" icon="search">查询</Button>
                              </FormItem>
                          </Form>
                          <Table
                              pagination={pageSetting}
                              className='data-source-list-table'
                              columns={this.centralizationColumns}
                              dataSource={this.centralizationData}
                          />
                          <Button type="primary" onClick={this.showManualCentralizationModal}>手动添加采集</Button>
                        </Modal>
                        <Modal
                          title="采集日志列表"
                          visible={this.state.centralizationLogModalVisible}
                          onOk={this.handleCentralizationLogModalOk}
                          onCancel={this.handleCentralizationLogModalCancel}
                          width={1200}
                        >
                          <Form layout="inline" className="data-source-search" style={{marginBottom: '5px'}}>
                              <FormItem label="数据源名称">
                                  <Input disabled value="TB_CDMA_3G_BILLED_D"/>
                              </FormItem>
                              <FormItem label="数据源类型">
                                  <Select defaultValue="请选择" style={{width: 100}} disabled value="centralization">
                                      <Option value="centralization">采集</Option>
                                      <Option value="dispatch">分发</Option>
                                  </Select>
                              </FormItem>
                              <FormItem label="最近数据批次全量完成时间">
                                  <Input disabled value="2018-04-16 16:17:38"/>
                              </FormItem>
                          </Form>
                          <Form layout="inline" className="data-source-search" style={{marginBottom: '16px'}}>
                              <FormItem label="数据批次">
                                  <Input onChange={this.onInputChange} value="2018-04-16" />
                              </FormItem>
                              <FormItem label="全量批次">
                                <Select defaultValue="请选择" style={{width: 180}} onChange={this.onInputChange} value="20180416161000">
                                    <Option value="20180416161000">20180416161000</Option>
                                </Select>
                              </FormItem>
                              <FormItem label="全量批次状态">
                                  <Select defaultValue="请选择" style={{width: 100}} onChange={this.onInputChange} value="succeed">
                                      <Option value="succeed">成功</Option>
                                      <Option value="failed">失败</Option>
                                  </Select>
                              </FormItem>
                              <FormItem className='searchDataSource'>
                                  <Button type="primary" icon="search">查询</Button>
                              </FormItem>
                          </Form>
                          <Tabs defaultActiveKey="Tab 1">
                            <TabPane tab="全量采集" key="Tab 1">
                              <Table
                                  pagination={pageSetting}
                                  className='data-source-list-table'
                                  columns={this.fullCentralizationLogColumns}
                                  dataSource={this.fullCentralizationLogData}
                              />
                            </TabPane>
                            <TabPane tab="增量采集" key="Tab 2">
                              <Table
                                  pagination={pageSetting}
                                  className='data-source-list-table'
                                  columns={this.incrementCentralizationLogColumns}
                                  dataSource={this.incrementCentralizationLogData}
                              />
                            </TabPane>
                          </Tabs>
                        </Modal>

                        <Modal
                          title="分发日志列表"
                          visible={this.state.dispatchLogModalVisible}
                          onOk={this.handleDispatchLogModalOk}
                          onCancel={this.handleDispatchLogModalCancel}
                          width={1200}
                        >
                          <Form layout="inline" className="data-source-search" style={{marginBottom: '5px'}}>
                              <FormItem label="数据源名称">
                                  <Input disabled value="TB_CDMA_3G_BILLED_D" />
                              </FormItem>
                              <FormItem label="数据源类型">
                                  <Select defaultValue="请选择" style={{width: 100}} disabled value="dispatch">
                                      <Option value="dispatch">分发</Option>
                                  </Select>
                              </FormItem>
                              <FormItem label="最近数据批次全量完成时间">
                                  <Input disabled value="2018-04-16 16:20:38" />
                              </FormItem>
                          </Form>
                          <Form layout="inline" className="data-source-search" style={{marginBottom: '5px'}}>
                              <FormItem label="分发目标连接">
                                  <Input disabled value="IQ数据库(192.168.23.1)" />
                              </FormItem>
                              <FormItem label="分发库">
                                  <Input disabled value="CRM" />
                              </FormItem>
                              <FormItem label="分发表">
                                  <Input disabled value="TB_CDMA_3G_BILLED_D" />
                              </FormItem>
                          </Form>
                          <Form layout="inline" className="data-source-search" style={{marginBottom: '16px'}}>
                              <FormItem label="数据批次">
                                  <Input onChange={this.onInputChange} value="2018-04-16" />
                              </FormItem>
                              <FormItem label="全量批次">
                                <Select defaultValue="请选择" style={{width: 180}} onChange={this.onInputChange} value="20180416161000">
                                    <Option value="20180416161000">20180416161000</Option>
                                </Select>
                              </FormItem>
                              <FormItem label="全量批次状态">
                                  <Select defaultValue="请选择" style={{width: 100}} onChange={this.onInputChange} value="succeed">
                                      <Option value="succeed">成功</Option>
                                      <Option value="failed">失败</Option>
                                  </Select>
                              </FormItem>
                              <FormItem className='searchDataSource'>
                                  <Button type="primary" icon="search">查询</Button>
                              </FormItem>
                          </Form>
                          <Tabs defaultActiveKey="Tab 1">
                            <TabPane tab="全量分发" key="Tab 1">
                              <Table
                                  pagination={pageSetting}
                                  className='data-source-list-table'
                                  columns={this.fullDispatchColumns}
                                  dataSource={this.fullDispatchData}
                              />
                            </TabPane>
                            <TabPane tab="补发" key="Tab 2">
                              <Table
                                  pagination={pageSetting}
                                  className='data-source-list-table'
                                  columns={this.additionalDispatchColumns}
                                  dataSource={this.additionalDispatchData}
                              />
                            </TabPane>
                          </Tabs>
                        </Modal>

                        <Modal
                          title="手工添加采集设置"
                          visible={this.state.manualCentralizationModalVisible}
                          onOk={this.handleManualCentralizationModalOk}
                          onCancel={this.handleManualCentralizationModalCancel}
                        >
                          <Form layout="horizontal" style={{marginBottom: '5px'}}>
                              <FormItem label="数据源名称" {...formItemLayout}>
                                  <Input disabled value="TB_CDMA_3G_BILLED_D"/>
                              </FormItem>
                              <FormItem label="采集类型" {...formItemLayout}>
                                  <Select defaultValue="请选择" style={{width: 100}} value="full">
                                      <Option value="full">全量</Option>
                                      <Option value="additional">增量</Option>
                                  </Select>
                              </FormItem>
                              <FormItem label="数据开始批次" {...formItemLayout}>
                                  <Input value=""/>
                              </FormItem>
                              <FormItem label="数据结束批次" {...formItemLayout}>
                                  <Input value=""/>
                              </FormItem>
                              <FormItem label="执行" {...formItemLayout}>
                                  <Select defaultValue="请选择" style={{width: 100}} value="sequential">
                                      <Option value="sequential">串行</Option>
                                  </Select>
                              </FormItem>
                              <FormItem label="采集触发" {...formItemLayout}>
                                  <Select defaultValue="请选择" style={{width: 100}} value="immediate">
                                      <Option value="immediate">立即</Option>
                                  </Select>
                              </FormItem>
                              <FormItem label="采集触发时间" {...formItemLayout}>
                                  <Input value=""/>
                              </FormItem>
                          </Form>
                        </Modal>

                        <Modal
                          title="手工添加分发设置"
                          visible={this.state.manualDispatchModalVisible}
                          onOk={this.handleManualDispatchModalOk}
                          onCancel={this.handleManualDispatchModalCancel}
                        >
                          <Form layout="horizontal" style={{marginBottom: '5px'}}>
                              <FormItem label="数据源名称" {...formItemLayout}>
                                  <Input disabled value="TB_CDMA_3G_BILLED_D"/>
                              </FormItem>
                              <FormItem label="采集类型" {...formItemLayout}>
                                  <Select defaultValue="请选择" style={{width: 100}} value="full">
                                      <Option value="full">全量</Option>
                                      <Option value="additional">增量</Option>
                                  </Select>
                              </FormItem>
                              <FormItem label="数据开始批次" {...formItemLayout}>
                                  <Input value=""/>
                              </FormItem>
                              <FormItem label="数据结束批次" {...formItemLayout}>
                                  <Input value=""/>
                              </FormItem>
                              <FormItem label="执行" {...formItemLayout}>
                                  <Select defaultValue="请选择" style={{width: 100}} value="sequential">
                                      <Option value="sequential">串行</Option>
                                  </Select>
                              </FormItem>
                              <FormItem label="分发触发" {...formItemLayout}>
                                  <Select defaultValue="请选择" style={{width: 100}} value="immediate">
                                      <Option value="immediate">立即</Option>
                                  </Select>
                              </FormItem>
                              <FormItem label="分发触发时间" {...formItemLayout}>
                                  <Input value=""/>
                              </FormItem>
                          </Form>
                        </Modal>
                    </div>
                </Spin>
            </Content>
        )
    }
}