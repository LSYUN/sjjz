import React, { Component } from 'react'
import { Form, Input, Button } from "antd";
import { hex_sha1 } from 'src/js/sha1'
import 'less/login/login.less'
import api from 'src/api'
import { http } from 'http'
const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            errMsg: ''
        }
    }

    // 登录提交
    loginSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.login_style = 'rest';
                values.login_password = hex_sha1(values.login_password)
                http.POST(api.login, values, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json.result) {
                            localStorage.setItem('userid', json.userid);
                            localStorage.setItem('roleid', json.roleid);
                            localStorage.setItem('username', json.username);
                            localStorage.setItem('rolename', json.rolename);
                            localStorage.setItem('sysresource', JSON.stringify(json.sysresource));
                            this.props.history.push('/sjjz/')
                        } else {
                            this.setState({
                                errMsg: '用户名或密码错误！',
                                loading: false,
                            })
                        }
                    })
                    .catch(err => { console.error(err) })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading, errMsg } = this.state;
        return (
            <div className="login-container">
                <div className="login-header">
                    <img src={require("images/LOGO.png")} />
                </div>
                <div className="login-main">
                    <Form onSubmit={this.loginSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('login_username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(<Input
                                prefix={<span>用户名：</span>}
                                size="large"
                            />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('login_password', {
                                rules: [{ required: true, message: '请输入密码！' }],
                            })(<Input
                                prefix={<span>密&nbsp;&nbsp;&nbsp;码：</span>}
                                type="password"
                                size="large"
                            />)}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="login-form-button"
                                loading={loading}
                            > {loading ? '登录中...' : '登录'} </Button>
                        </FormItem>
                        <span style={{ color: 'red' }}>{errMsg}</span>
                    </Form>
                </div>
                <div className="login-footer">
                    Copyright&nbsp;&nbsp;©&nbsp;&nbsp;2017&nbsp;&nbsp;广州申迪计算机系统有限公司&nbsp;&nbsp;All rights
                        reserved.
                </div>
            </div>
        )
    }
}

export default Form.create()(Login);