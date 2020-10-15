import React, { Component } from 'react';
import { http } from 'http';
export default class DataGenerator extends Component {

    componentWillMount() {
        http.POST('/accounts/login/', {
            j_username: 'admin',
            j_password: 'admin',
            next: '/'
        }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(res => {
                location.href = res.url;
            })

            .catch(err => console.error(err))
    }

    render() {
        return (
            <div></div>
        );
    }
}