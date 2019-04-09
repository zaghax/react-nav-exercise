import React, {Component} from 'react';

export default class Banner extends Component{
    render(){
        const imgData = this.props.data;
        return(
            <section className="main-banner" style={{backgroundImage: `url(${imgData.url})`}}>
                <h1 className="main-banner__title">{imgData.bannerTitle}</h1>
            </section>
        )
    }
}