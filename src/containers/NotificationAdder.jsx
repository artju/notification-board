import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNotification, fetchNotifications } from '../actions';

class NotificationAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            content: '',
        }

    }
    add = () => {
        const notification = {header: this.state.header, content: this.state.content};
        this.props.addNotification(notification);
        this.setState({ header: '', content: ''});
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

        return (
            <div className="modal">
                <div className="modal-content">
                <span className="close" id="adderVisible" onClick={this.close}>&times;</span> 
                    <div className="modal-content-adder">
                    <h4>Add notification</h4>
                    <input name="header" type="text" value={this.state.header} onChange={this.handleChange} placeholder="header"/>
                    <textarea name="content" type="text" value={this.state.content} onChange={this.handleChange} placeholder="content"/> 
                    <input type="button" value="Add notification" onClick={this.add}/>
                    </div>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedNotification: state.selectedNotification,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addNotification: addNotification, fetchNotifications: fetchNotifications}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotificationAdder);