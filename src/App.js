import React, { Component } from 'react';
import Navigation from './Components/navigation/navigation';
import Banner from './Components/banner/banner';
import Content from './Components/content/content';
import getMobileBreakpoint from './Components/commons/breakpoint'
import './App.css';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      isMobile: false,
      isMenuMobileOpened: false,
      headerFixed: false
    }
  }

  componentDidMount(){

    fetch('./service/data.json')
    .then(res => res.json())
    .then(data => {
      this.setState({
        isLoaded: true,
        data: data
      })
    })

    this.setMobileBreakpoint();

    window.addEventListener("resize", () => {
      this.setMobileBreakpoint();
    })

    window.addEventListener("scroll", () => {

      let pageYOffset =  window.pageYOffset;
      let headerHeight = document.querySelector("header").offsetHeight;

      console.log('pageY', window.pageYOffset);
      console.log('headerH', document.querySelector("header").offsetHeight);

      if(pageYOffset >= headerHeight){
        console.log('tomalo 1');
        this.setState({
          headerFixed: true
        })
      }else{
        console.log('tomalo 2');
        this.setState({
          headerFixed: false
        })
      }

      console.log('fixed', this.state.headerFixed)




    })



  }

  toggleMenuMobile = () => {

    this.setState(state => ({
      isMenuMobileOpened: !state.isMenuMobileOpened
    }))

    document.querySelector('body').classList.toggle('noScroll');

  }

  setMobileBreakpoint = () => {
    this.setState({
      isMobile: getMobileBreakpoint()
    })
  }

  render() {

    const {isLoaded, data, isMobile, isMenuMobileOpened, headerFixed} = this.state;
    const {menu, banner, content} = data;

    if (!isLoaded) {
      return <div>Loading</div>
    }
    else{
      return (
        <div className="App">
          <header className={`header ${headerFixed ? "fixed" : '' }`}>
            <div className="logo">TPL</div>
            {
              isMobile && (
                <div className={`hamburguer ${isMenuMobileOpened ? 'active' : ''}`} onClick={this.toggleMenuMobile}>
                  <i className="hamburguer__line line--top"></i>
                  <i className="hamburguer__line line--middle"></i>
                  <i className="hamburguer__line line--bottom"></i>
                </div>
              )
            }
            <Navigation data={menu} menuMobState={isMenuMobileOpened}/>
          </header>
          <Banner data={banner}/>
          <Content data={content}/>
        </div>
      );
    }
  }
}