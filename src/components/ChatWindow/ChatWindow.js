import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import moment from 'moment'
import '../../less/chat-window.less'

class Message extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li className={"chat-message-item " + this.props.message.type} >
                <div className="chat-avatar">
                    {this.props.message.sender}
                </div>
                <div className="chat-content">
                    {this.props.message.content}
                </div>

                <div className="chat-time">
                    {this.props.message.time}
                </div>
            </li>
        )
    }
}


class ChatWindow extends Component {

    constructor(props) {
        super(props)

    }
    state = {
        content: '',
        messages: []
    }

    sendMsg = () => {
        const content = this.state.content
        console.debug('content is :' + typeof content)
        if (content === '' || content == null) {
            console.debug('content is :' + content)
            return
        }

        const currentTime = moment().format('hh:mm')
        const message = {
            sender: 'js',
            time: currentTime,
            content: content,
            type: 'in'
        }


        this.setState({
            content: '',
            messages: [...this.state.messages, message]
        })
    }

    handleChange = (e) => {
        const content = e.target.value
        this.setState({
            content: content
        })
    }
    componentDidUpdate() {
        const h = document.getElementsByClassName('chat-window-body')
        if (h[0]) {
            h[0].scrollTop = h[0].scrollHeight;
        }
    }

    componentDidMount() {

        setInterval(() => {
            this.setState({
                messages: [...this.state.messages, {
                    sender: 'js',
                    time: '15:30',
                    content: 'hello justin',
                    type: 'out'
                }]
            })
        }, 3000)
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.sendMsg()
        }
    }
    render() {
        return (
            <div className="chat-window">
                <div className="chat-window-header">
                    Golang
                </div>
                <div className="chat-window-body">
                    <ul>
                        {
                            this.state.messages.map((item) => (
                                <Message message={item} />
                            ))
                        }
                    </ul>
                </div>
                <div className="chat-window-input">
                    <textarea style={{ resize: "none" }} onKeyDown={this.handleKeyUp} value={this.state.content} onChange={this.handleChange}></textarea><a href="#" onClick={this.sendMsg}>反馈</a>
                </div>
            </div>
        )
    }
}


export default ChatWindow