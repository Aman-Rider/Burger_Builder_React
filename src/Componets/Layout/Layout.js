import React, {Component} from 'react';
import Aux from '../../hoc/Aux1';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state={
        showSideDrawer:true,
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState) =>{
            return {showSideDrawer: !this.state.showSideDrawer}
        });
    }
    sideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    render(){
        return (
        <Aux>
            <div>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                {/* Toolbar, side drawer, back drop */}
            </div>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>
        )
    }
    
}

export default Layout;