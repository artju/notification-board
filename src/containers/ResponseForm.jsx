import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addResponse, } from '../actions';

class ResponseForm extends Component {
    constructor() {
        super();
        this.state = {
            content: '',
        }
    }

    add = () => {
        const response = { content: this.state.content};
        this.props.addResponse(response);
        this.setState({ content: '' });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if (!this.props.user) {
            return null;
        }

        return (
            <div className="response-form">
                <textarea name="content" type="text" value={this.state.content} onChange={this.handleChange} placeholder="Response"/> 
                <button onClick={this.add}>Reply</button>
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
    return bindActionCreators({ addResponse: addResponse  }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ResponseForm);