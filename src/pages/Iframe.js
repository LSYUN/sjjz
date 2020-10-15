import React, { Component } from 'react'

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);  // 解密   加密：escape()
    return null;
}

export default class Iframe extends Component {
    render() {
        const src = GetQueryString('url');
        return (
            <div style={{ overflow: 'hidden', position: 'absolute', width: '100%', height: '100%' }}>
                <iframe
                    src={src}
                    frameBorder="0"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                </iframe>
            </div>
        )
    }
}