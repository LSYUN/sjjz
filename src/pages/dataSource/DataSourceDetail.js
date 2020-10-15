/**
 * Created by wzb on 2018/3/15.
 * 数据源详情
 */
import React, {Component} from 'react';
import {Layout, Icon, Spin, Select, Table, Modal, Form, Input, Button, Radio, message, Divider, Menu, Dropdown, Switch, Tabs} from 'antd'
import '../../less/dataCenter.less';

import CollectStrategy from './component/CollectStrategy';
import DistributeStrategy from './component/DistributeStrategy'

const {Content} = Layout;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item, {confirm, error} = Modal;
const TabPane = Tabs.TabPane;

const formItemLayout = {
    labelCol: {span: 2},
    wrapperCol: {span: 10},
};

export default class DataSourceDetail extends Component {

    constructor(props) {
        super(props);

    }

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
        }
    ];
    dataSourceDetail = [
        {
            "id": "1",
            "key": "1",
            "name": "TB_ACC_ACCOUNT_SRC_FEE_D",
            "type": "收入",
            "table": "SRC.TB_ACC_ACCOUNT_SRC_FEE_D",
            "connType": "FTP",
            "cycle": "每日12点10分运行一次 ",
            "fileFormat": "F_ACC_ACCOUNT_YYYMMDD",
            "inSize": "12G",
            "busiType": "采集",
            "store": "hive",
            "status": "采集成功,无分发",
            "statusReason": "",
            "lastBatchFinshTime": "2018-04-16 12:25:02",
            "connId": "6",
            "in": {
                "transType": "1",
                "interval": "每日",
                "hour": "12",
                "min": "10",
                "starttime": "2018-04-10 20:20:11",
                "endtime": "",
                "downfileFormat": "F_ACC_ACCOUNT_${YYYMMDD}",
                "batchFormat": "YYYYMMDD",
                "storeop": "覆盖"
            },
            "out": [],
            "inlog": {
                "databatch": "20180416",
                "allbatch": "2018041612100",
                "status": "成功",
                "allstep": [
                    {
                        "stepName": "FTP下载",
                        "starttime": "2018-04-16 12:10:00",
                        "endtime": "2018-04-16 12:15:00",
                        "lost": "300",
                        "stat": "成功",
                        "statReason": "",
                        "size": "10G",
                        "count": "13673020"
                    },
                    {
                        "stepName": "合并文件",
                        "starttime": "2018-04-16 12:15:05",
                        "endtime": "2018-04-16 12:17:45",
                        "lost": "160",
                        "stat": "成功",
                        "statReason": "",
                        "size": "10G",
                        "count": "13673021"
                    },
                    {
                        "stepName": "入临时表",
                        "starttime": "2018-04-16 12:17:55",
                        "endtime": "2018-04-16 12:19:10",
                        "lost": "135",
                        "stat": "成功",
                        "statReason": "",
                        "size": "10G",
                        "count": "13673021"
                    },
                    {
                        "stepName": "入存储表",
                        "starttime": "2018-04-16 12:19:15",
                        "endtime": "2018-04-16 12:19:47",
                        "lost": "32",
                        "stat": "成功",
                        "statReason": "",
                        "size": "10G",
                        "count": "13673021"
                    }
                ],
                "addstep": [
                    {
                        "addbatch": "20180416131600",
                        "stepName": "FTP下载",
                        "starttime": "2018-04-16 13:16:00",
                        "endtime": "2018-04-16 13:18:10",
                        "lost": "130",
                        "stat": "成功",
                        "statReason": "",
                        "size": "2G",
                        "count": "1654010"
                    },
                    {
                        "addbatch": "20180416131600",
                        "stepName": "合并文件",
                        "starttime": "2018-04-16 13:18:15",
                        "endtime": "2018-04-16 13:19:30",
                        "lost": "75",
                        "stat": "成功",
                        "statReason": "",
                        "size": "2G",
                        "count": "1654010"
                    },
                    {
                        "addbatch": "20180416131600",
                        "stepName": "入临时表",
                        "starttime": "2018-04-16 13:19:35",
                        "endtime": "2018-04-16 13:20:01",
                        "lost": "26",
                        "stat": "成功",
                        "statReason": "",
                        "size": "2G",
                        "count": "1654010"
                    },
                    {
                        "addbatch": "20180416131600",
                        "stepName": "批次存量数据再入临时表",
                        "starttime": "2018-04-16 13:20:06",
                        "endtime": "2018-04-16 13:23:28",
                        "lost": "202",
                        "stat": "成功",
                        "statReason": "",
                        "size": "10G",
                        "count": "13673021"
                    },
                    {
                        "addbatch": "20180416131600",
                        "stepName": "入存储表",
                        "starttime": "2018-04-16 13:23:33",
                        "endtime": "2018-04-16 13:24:25",
                        "lost": "52",
                        "stat": "成功",
                        "statReason": "",
                        "size": "12G",
                        "count": "15327031"
                    }
                ]
            },
            "cu": "qlh01",
            "ct": "2018-04-12 18:21:51"
        }
    ];

    // 采集策略
    collectStrategyColumns = [
        {
            title: '数据源名称',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            className: 'text-overflow',
        }, {
            title: '业务类型',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            className: 'text-overflow',
        }, {
            title: '存储表名',
            dataIndex: 'table',
            key: 'table',
            width: 120,
            className: 'text-overflow',
        }, {
            title: '采集连接类型',
            dataIndex: 'connType',
            key: 'connType',
            width: 120,
            className: 'text-overflow',
        }, {
            title: '采集周期',
            dataIndex: 'cycle',
            key: 'cycle',
            width: 120,
            className: 'text-overflow',
        }, {
            title: '源文件名',
            dataIndex: 'fileFormat',
            key: 'fileFormat',
            className: 'text-overflow',
            width: 120,
        }, {
            title: '采集量',
            dataIndex: 'inSize',
            key: 'inSize',
            className: 'text-overflow',
            width: 120,
        }, {
            title: '数据源应用类型',
            dataIndex: 'busiType',
            key: 'busiType',
            className: 'text-overflow',
            width: 120,
        }, {
            title: '存储类型',
            dataIndex: 'store',
            key: 'store',
            className: 'text-overflow',
            width: 180,
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            className: 'text-overflow',
            width: 180,
        }, {
            title: '状态原因',
            key: 'statusReason',
            dataIndex: 'statusReason',
            className: 'text-overflow',
            width: 180,
        }
    ];
    collectStrategyData = [];



    render(){
        return(
            <Content style={{padding: '10px'}}>
                <div
                    style={{borderLeft: '2px solid #289CEB', paddingLeft: '8px', margin: '5px 0'}}>
                    数据源详情
                </div>
                <Table
                    rowKey='id'
                    pagination={false}
                    className='data-source-detail'
                    columns={this.columns}
                    dataSource={this.dataSourceDetail}
                />
                <CollectStrategy/>
                <DistributeStrategy/>
            </Content>
        )
    }
}