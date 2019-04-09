import React, {Component} from 'react';

export default class Content extends Component {
    render(){
        const text = this.props.data;
        return (
            <article className="main-content">
                <p className="main-content__text">{text.text}</p>
            </article>
        )
    }
}