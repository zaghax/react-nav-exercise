import React, {Component} from 'react';
import getMobileBreakpoint from '../commons/breakpoint';


export default class Navigation extends Component{

    constructor(props){
        super(props);
        this.state = {
            isMobile: false,
            isSubMenuMobileOpened: false,
            subMenuActive: 0
        }
        this.rowRefs = [];
    }

    componentDidMount(){

        this.setMobileBreakpoint();

        window.addEventListener("resize", () => {
            this.setMobileBreakpoint();
        })

    }

    toggleSubMenuMobile = (index) => {

        this.rowRefs.forEach((item, itemIndex) => {
            if(itemIndex !== index) {
                item.classList.remove("active");
            }
        })

        this.rowRefs[index].classList.toggle("active");

    }

    setMobileBreakpoint = () => {
        this.setState({
            isMobile: getMobileBreakpoint()
        })
    }

    render(){
        const items = this.props.data;
        return(
            <nav className={`navbar-menu ${this.props.menuMobState ? 'active': ''}`}>
                <ul className="menu">
                    {items.map((item, index) => (
                        <li className={`menu__item ${item.submenu ? 'hasSubMenu' : ''}`} key={index} ref={ item.submenu &&  ((SwipeRow) => { this.rowRefs[index] = SwipeRow; })}>
                            <div className="menu__group">
                                <a className="menu__link" href="#">
                                    {item.name}
                                </a>
                                {
                                    item.submenu && (
                                        <i className="menu__submenucta" onClick={() => {this.state.isMobile && this.toggleSubMenuMobile(index)} }></i>
                                    )
                                }
                            </div>
                            {
                                item.submenu && (
                                    <ul className="submenu">
                                        {item.submenu.map((item, index) => (
                                            <li className="submenu__item" key={index}>
                                                <a className="submenu__link" href="#">{item.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}
