import fetch from 'isomorphic-fetch'
import { serializeForm } from './utils'

const defaultOptions = {

    method: "GET",
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        "auth": "base"
    }


}

export const http = (function (self) {


    return {
        interceptor: {

            request: function (config) {
                return config;
            },

            responseError: function (resolve, reject, response) {
                reject(response.statusText)
            }
        },

        GET: function (url, params = {}, options) {
            const that = this
            const paramsStr = serializeForm(params) ? serializeForm(params) : ''
            if (paramsStr != '') {
                url = url + '?' + paramsStr
            }
            let newOptions = {}
            if (typeof options === 'undefined') {
                newOptions = defaultOptions
            } else {
                newOptions = { ...defaultOptions, ...options }
            }
            return new Promise((resolve, reject) => {
                const _config = that.interceptor.request(newOptions)
                const config = _config ? _config : newOptions
                fetch(url, config).then(response => {
                    if (response.status > 400) {
                        that.interceptor.responseError(resolve, reject, response)
                    } else {
                        resolve(response)
                    }

                }).catch(err => {
                    console.error(err)
                    reject(err)
                })
            })
        },


        POST: function (url, params = {}, options) {
            const that = this
            let newOptions = {}
            if (typeof options === 'undefined') {
                newOptions = {
                    ...defaultOptions, method: 'POST'
                }
            } else {
                newOptions = { ...defaultOptions, method: 'POST', ...options }
            }
            return new Promise((resolve, reject) => {
                const _config = that.interceptor.request(newOptions)
                let config = _config ? _config : newOptions
                let payload;
                if (config.headers['Content-Type'] === 'application/json') {
                    payload = JSON.stringify(params) ? JSON.stringify(params) : ''

                } else if (config.headers['Content-Type'] === '') {

                    delete config.headers['Content-Type']
                    payload = params
                } else {
                    payload = serializeForm(params) ? serializeForm(params) : ''
                }

                if (payload != '')
                    config = { ...config, body: payload }
                fetch(url, config).then(response => {
                    if (response.status > 400) {
                        that.interceptor.responseError(resolve, reject, response)
                    } else {
                        resolve(response)
                    }

                }).catch(err => {
                    console.error(err)
                    reject(err)
                })
            })
        }



    }
})(typeof self !== 'undefined' ? self : this)