import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import HiveData from './HiveData';
import Relationship from './Relationship';

import '../../less/metaData/metaData.less';

const { Header, Content, Sider } = Layout;

export default class MetaManger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: '1'
    }
  }
  menuClick = (e) => {
    this.setState({ menuItem: e.key });
  };

  render() {
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            onClick={this.menuClick}
            defaultSelectedKeys={[this.state.menuItem]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">元数据管理</Menu.Item>
            <Menu.Item key="2">数据血缘关系</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ background: '#fff' }}>
          {this.state.menuItem === '1' ? <HiveData /> : <Relationship />}
        </Content>
      </Layout>
    )
  }
}