import React, {Component} from 'react';
import {Layout, Popover, Icon, message, Spin} from 'antd';
import {NavLink} from 'react-router-dom';
import {http} from 'http';
import api from 'src/api';
import  {MainRoutes} from './Routes';
import 'less/common.less'
import {menus} from '../data/menus';

const {Sider} = Layout
export default class MainContent extends Component {
    constructor(props) {
        super(props)
        this.init();
        this.state = {
            loading: true,
            menu: [],
            secondaryMenu: [], // 存放二级菜单相关参数
            locationSearch: ''
        }
    }

    // 401权限 拦截器
    init = (history) => {
        http.interceptor.request = (config) => {
            config.headers.Resource = "protect";
            return config
        };

        http.interceptor.responseError = (resolve, reject, response) => {
            if (response.status === 401) {
                this.props.history.push('/sjjz/login');
                localStorage.clear()
            }
            reject("something wrong")
        }
    };

    // 用户退出操作
    logout = e => {
        http.POST(api.logout, '', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    localStorage.clear();
                    this.props.history.push('/sjjz/login')
                } else {
                    message.error('登出失败')
                }
            }).catch(err => {
            console.error(err)
        })
    };

    // 将小人中的内容分离出来
    getPopoverContent = () => (
        <div>
            <p>用户名：{localStorage.getItem('username')}</p>
            <p style={{textAlign: 'center', margin: 0}}><a onClick={this.logout}>退出</a></p>
        </div>
    );

    // 寻找相应的离网部分的菜单，主要是获取菜单描述中是 ‘/broadband/’ 下面的菜单
    findMenu = (menu) => {
        for (let i = 0; i < menu.length; i++) {
            let firstMenu = menu[i].children;
            if (menu[i].DESCRIPTION === 'sjjz') {
                let pathName = this.props.location.pathname;
                for (let j = 0, jLen = firstMenu.length; j < jLen; j++) {
                    let firstTemp = firstMenu[j];
                    let secondMenu = firstMenu[j].children;
                    if (!secondMenu || !secondMenu.length || secondMenu.length < 1)continue;
                    if (firstTemp.open_way === 'Iframe') {
                        firstTemp.URL = '/sjjz/iframe/' + escape(firstTemp.SEQ);
                        for (let k = 0, kLen = secondMenu.length; k < kLen; k++) {
                            secondMenu[k].URL = firstTemp.URL + '?url=' + secondMenu[k].URL;
                        }
                    }
                    if (pathName === firstTemp.URL.split('?')[0]) {
                        this.setState({
                            secondaryMenu: secondMenu || [],
                            locationSearch: secondMenu[0].URL
                        });
                        console.log(this.state.locationSearch);
                    }
                }
                this.setState({
                    menu: firstMenu || [],
                });
                return true;
            } else {
                if (firstMenu && firstMenu.length) {
                    let result = this.findMenu(firstMenu);
                    if (result) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    // 重中之重 使用 es6 async 制造 ajax 同步的效果
    getMenu = async () => {
        // 第一个请求 验证用户是否有登录，当第一次进入此系统时第一个请求
        // await http.GET(api.confirmAuth)
        // 验证用户登录系统之后请求系统菜单
        await http.GET(api.menu)
            .then(res => res.json())
            .then(json => {
                this.findMenu(json);
                this.setState({loading: false})
            })
    };

    // 点击一级菜单时的处理函数
    clickTopMenu = id => e => {
        const children = this.state.menu.find(obj => obj.ID === id).children;
        this.setState(prevState => ({
            secondaryMenu: children || [],
            locationSearch: children && children.length ? children[0].URL : []
        }));
    };

    clickSiderMenu = (url) => {
        console.log(url);
    };

    componentDidMount = () => {
        this.getMenu();
    };

    isActiveFunc = (match, location, url) => {
        console.log(location);
        console.log(url);
        console.log(this.state.locationSearch);
        return this.state.locationSearch.indexOf(location.search) > -1;
        // return obj.URL.indexOf(this.state.locationSearch) > -1;
    };

    render() {
        const {menu, secondaryMenu} = this.state;
        return (
            <Layout style={{background: '#FFF'}}>
                {/* 公共头部 */}
                <header className="common-header">
                    <img src={require('images/LOGO.png')} alt=""/>
                    <div className="header-menu">
                        {
                            menu.map(obj =>
                                obj.open_way === 'New_Tab' ?
                                    <a
                                        href={obj.URL}
                                        target="_blank"
                                        className="menu"
                                        key={obj.ID}
                                    >
                                        {obj.NAME}
                                    </a> :
                                    <NavLink
                                        to={obj.URL}
                                        key={obj.ID}
                                        className="menu"
                                        activeClassName="active"
                                        onClick={this.clickTopMenu(obj.ID)}
                                    >
                                        {obj.NAME}
                                    </NavLink>
                            )
                        }
                    </div>

                    {/* 用户小人部分 */}
                    <Popover placement="bottomRight" content={this.getPopoverContent()}>
                        <div className="header-user">
                            <Icon type="user" className="user-icon"/>
                        </div>
                    </Popover>
                </header>

                <Layout style={{background: '#fff'}}>
                    {/* 二级菜单 根据一级菜单有没有子菜单决定显不显示*/}
                    {
                        (secondaryMenu && secondaryMenu.length) ? (
                            <Sider className="secondary-sider" width="170">
                                {
                                    secondaryMenu.map((obj, key) => (
                                        < NavLink
                                            to={obj.URL}
                                            key={obj.ID}
                                            className="secondary-menu"
                                            activeClassName="active"
                                            isActive={(match, location) => {
                                                console.log(obj.URL);
                                                let theUrl = obj.URL.indexOf(this.state.locationSearch) > -1;
                                                console.log(theUrl);
                                                return theUrl;
                                            }}
                                            // isActive={this.isActiveFunc(obj.URL)}
                                            onClick={(e) => this.clickSiderMenu(obj.URL, e)}
                                        >
                                            <Icon type="appstore" style={{margin: '0 10px'}}/>
                                            {obj.NAME}
                                        </NavLink>
                                    ))
                                }
                            </Sider>
                        ) : null
                    }
                    <MainRoutes abc="def"/>
                </Layout>
            </Layout>
        )
    }
}