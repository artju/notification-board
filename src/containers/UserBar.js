import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUser, logout } from '../actions';
import  RegisterModal  from './RegisterModal';
import  NotificationAdder  from './NotificationAdder';
import  LoginModal  from './LoginModal';

class UserBar extends Component {
    constructor() {
        super();
        this.state = {
            loginVisible: false,
            registerVisible: false,
            adderVisible: false,
        }
    }
    
    componentWillMount() {
        this.props.loadUser();
    }

    logout = () => {
        this.props.logout();
    }
    openModal = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: true})
    }

    closeModal = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: false})
    }
    render() {
        return (
            <div>
                <nav className="top-nav">
                    <div className="top-nav-container">
                        <h2 className="top-nav-header">Notification board</h2>                                              
                        { this.props.user ? 
                        <ul className="top-nav-userbar">
                            <li id="adderVisible" onClick={this.openModal}>Add notification</li>
                            <li id="logout" onClick={this.logout} >Logout</li>
                        </ul>
                            :
                        <ul className="top-nav-userbar">
                            <li id="loginVisible" onClick={this.openModal}>Login</li>
                            <li id="registerVisible" onClick={this.openModal}>Register</li>
                        </ul>
                        }
                    </div>
                </nav>
                <LoginModal isVisible={!this.props.user && this.state.loginVisible} close={this.closeModal}/>
                <RegisterModal isVisible={this.state.registerVisible} close={this.closeModal}/>
                <NotificationAdder isVisible={this.state.adderVisible} close={this.closeModal}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
  }
  
   function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadUser: loadUser, logout: logout }, dispatch);
  } 
  
  export default connect(mapStateToProps,  mapDispatchToProps )(UserBar);