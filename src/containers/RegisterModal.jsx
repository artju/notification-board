import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { register } from '../actions';

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            repeatPassword: '',
        }

    }

    register = () => {
        const user = {user: this.state.user, password: this.state.password, repeatPass: this.state.repeatPassword};
        this.props.register(user);
        this.setState({ 
            user: '',
            password: '',
            repeatPassword: '',
        });

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

        const { registerFeedback } = this.props;
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" id="registerVisible" onClick={this.close}>&times;</span> 
                    <div className="modal-content-register">
                        <h4>Register</h4>
                        <label>Username</label>
                        <input name="user" type="text" value={this.state.user} onChange={this.handleChange} placeholder="username"/>
                        <label>Password</label>
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="password"/> 
                        <label>Repeat password</label>
                        <input name="repeatPassword" type="password" onChange={this.handleChange} value={this.state.repeatPassword} placeholder="repeat password"/>
                        <input type="button" value="Create account" onClick={this.register}/>
                        <p className="feedback">{registerFeedback}</p>
                    </div>
                </div>
            </div>     
        )
    }
}

function mapStateToProps(state) {
    return {
        registerFeedback: state.registerFeedback
    };
} 

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ register: register, }, dispatch);
}

export default connect( mapStateToProps,  mapDispatchToProps)(RegisterModal);