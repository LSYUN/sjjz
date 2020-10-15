/**
 * Created by wzb on 2018/3/8.
 * 数据连接类型
 */
import React, {Component} from 'react';
import update from 'immutability-helper';
import {Layout, Icon, Select, Table, Modal, Form, Input, Button, message, Divider} from 'antd'

const Connection = {
    bigdata: [
        {
            index: 1,
            type: 'python',
            bgPositionX: '0',
            bgPositionY: '-200px'
        },{
            index: 2,
            type: 'hive',
            bgPositionX: '-400px',
            bgPositionY: '-400px'
        },{
            index: 3,
            type: 'hbase',
            bgPositionX: '-300px',
            bgPositionY: '-200px'
        },{
            index: 4,
            type: 'teradata',
            bgPositionX: '0',
            bgPositionY: '-300px'
        },{
            index: 5,
            type: 'greenPlum',
            bgPositionX: '-100px',
            bgPositionY: '-300px'
        },{
            index: 6,
            type: 'transwarp',
            bgPositionX: '-200px',
            bgPositionY: '-300px'
        },{
            index: 7,
            type: 'cheetah',
            bgPositionX: '-300px',
            bgPositionY: '-300px'
        },{
            index: 8,
            type: 'hana',
            bgPositionX: '-400px',
            bgPositionY: '-300px'
        },{
            index: 9,
            type: 'impala',
            bgPositionX: '-500px',
            bgPositionY: '-300px'
        },{
            index: 9,
            type: 'kylin',
            bgPositionX: '0',
            bgPositionY: '-400px'
        },{
            index: 10,
            type: 'monetDB',
            bgPositionX: '-100px',
            bgPositionY: '-400px'
        }
    ],
    database: [
        {
            index: 1,
            type: 'Oracle',
            bgPositionX: '-500px',
            bgPositionY: '-400px'
        }, {
            index: 2,
            type: 'Sybase',
            bgPositionX: '0',
            bgPositionY: '-600px'
        }, {
            index: 3,
            type: 'Mysql',
            bgPositionX: '-300px',
            bgPositionY: '-400px'
        }, {
            index: 4,
            type: 'Sql-server',
            bgPositionX: '0',
            bgPositionY: '-500px'
        }, {
            index: 5,
            type: 'PostgreSql',
            bgPositionX: '-200px',
            bgPositionY: '-500px'
        }
    ],
    file: [
        {
            index: 1,
            type: 'excel',
            bgPositionX: '-200px',
            bgPositionY: '-400px'
        }, {
            index: 2,
            type: 'txt',
            bgPositionX: '-400px',
            bgPositionY: '-500px'
        }, {
            index: 3,
            type: 'csv',
            bgPositionX: '-100px',
            bgPositionY: '-500px'
        }, {
            index: 4,
            type: 'server-file',
            bgPositionX: '-500px',
            bgPositionY: '-500px'
        }, {
            index: 5,
            type: 'ftp',
            bgPositionX: '-300px',
            bgPositionY: '-500px'
        }
    ]
};

export default class DataConnectType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentConnectType: ''
        }
    }

    selectDataConnect = (type) => {
        // console.log(type)
        this.setState({
            currentConnectType: type
        })
    }

    loopConnectCell = (types) => {
        let list = types.map((item) => {
            let className = 'connect-type';
            return (
                <li key={item.id} className={item.type === this.state.currentConnectType ? className + ' selected' : className}
                    onClick={() => this.selectDataConnect(item.type)}
                    style={{backgroundPositionX: item.bgPositionX, backgroundPositionY: item.bgPositionY}}
                >
                </li>
            )
        });
        return list
    };

    render() {
        const {visible, onCancel, onCreate} = this.props;
        return (
            <Modal
                wrapClassName="data-connect-type"
                visible={visible}
                title={'连接类型选择'}
                okText={'下一步'}
                cancelText="返回"
                onCancel={onCancel}
                onOk={onCreate}
                width={800}
            >
                <div className="data-connect-type-file">
                    <p>文件类型：</p>
                    <ul style={{display: 'flex'}}>
                        {this.loopConnectCell(Connection.file)}
                    </ul>
                </div>
                <div className="data-connect-type-database">
                    <p>数据库类型：</p>
                    <ul style={{display: 'flex'}}>
                        {this.loopConnectCell(Connection.database)}
                    </ul>
                </div>
                <div className="data-connect-type-bigdata">
                    <p>大数据：</p>
                    <ul style={{display: 'flex'}}>
                        {this.loopConnectCell(Connection.bigdata)}
                    </ul>
                </div>

            </Modal>
        )
    }
}
