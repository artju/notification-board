import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logIn, } from '../actions';

class LoginModal extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: '',
        }
    }

    login = () => {
        const user = this.state.user
        const password = this.state.password;
        const userObj = { user: user, password: password};
        this.props.logIn(userObj);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible) {
            this.setState({isVisible: nextProps.isVisible});
        }
    }

    close = (e) => {
        this.props.close(e);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if (!this.props.isVisible) {
            return null;
        }
        const { loginError } = this.props;
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" id="loginVisible" onClick={this.close}>&times;</span> 
                    <div className="modal-content-login">
                        <h4>Login</h4>
                        <label>Username</label>
                        <input name="user" type="text" value={this.state.user} onChange={this.handleChange} placeholder="username"/>
                        <label>Password</label>
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="password"/> 
                        <input type="button" onClick={this.login} value="Log in"/>
                        <p className="feedback">{loginError}</p>
                    </div>
                </div>
            </div>
        )
    }

}

  function mapStateToProps(state) {
    return {
        loginError: state.loginError,
    };
  }  
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logIn: logIn  }, dispatch);
  }
  
  export default connect(  mapStateToProps,   mapDispatchToProps)(LoginModal);