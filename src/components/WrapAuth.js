import React, { Component } from 'react'

const hasPrivilege = (privilegeName) => {
    if (window.sysResources.indexOf(privilegeName) > -1)
        return true
    else
        return false
}

export const wrapAuth = (Component) => {
    return class WrapAuthComponent extends Component {
        constructor(props) {
            super(props)
        }
        render() {
            // const hasPrivilege = hasPrivilege(privilegeName)
            const hasPrivilege = this.props.auth;
            if (hasPrivilege) {
                return <Component></Component>
            } else {
                return null
            }
        }
    }
}