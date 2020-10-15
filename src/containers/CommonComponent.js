import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Popover, message } from 'antd';
import { http } from 'http'
import api from 'src/api'

export default class CommonComponent extends Component {
    constructor(props) {
        super(props)
    }

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
            }).catch(err => { console.error(err) })
    }

    getPopoverContent = () => (
        <div>
            <p>用户名：{localStorage.getItem('username')}</p>
            <p style={{ textAlign: 'center', margin: 0 }}><a onClick={this.logout}>退出</a></p>
        </div>
    )

    render() {
        return (
            <header className="common-header">
                <img src={require('images/logo.svg')} alt="" />
                <div className="header-menu">
                    {
                        this.props.menu.map(obj =>
                            obj.open_way === 'New_Tab' ?
                                <a
                                    href={obj.URL}
                                    target="_blank"
                                    className="menu"
                                    key={obj.ID}
                                >
                                    {obj.NAME}
                                </a> :
                                < NavLink
                                    to={obj.open_way === 'Replace_Tab' ? obj.URL : `/sjjz/iframe?url=${escape(obj.URL)}`}
                                    key={obj.ID}
                                    className="menu"
                                    activeClassName="active"
                                >
                                    {obj.NAME}
                                </NavLink>
                        )
                    }
                </div>
                <Popover placement="bottomRight" content={this.getPopoverContent()}>
                    <div className="header-user">
                        <Icon type="user" className="user-icon" />
                    </div>
                </Popover>
            </header>
        )
    }
}