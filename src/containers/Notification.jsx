import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNotification, } from '../actions';
import Response from '../components/Response';
import ResponseForm from './ResponseForm';
import { convertDate } from '../helper';

class Notification extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: false,
        }
    }
  
    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible && nextProps.selectedNotification) {
            this.setState({isVisible: nextProps.isVisible});
        }
    }

     close = (e) => {
        this.setState({isVisible: false});
    } 

    render() {
        if (!this.state.isVisible) {
            return null;
        }
        const {selectedNotification } = this.props;
        const { responses } = this.props;
        const responseList = responses.map(response => <Response user={response.user.name} date={convertDate(response.createdAt)} content={response.content}/>)
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.close}>&times;</span> 
                    <div className="modal-content-notification">
                        <h4>{selectedNotification.header}</h4>
                        <p>{selectedNotification.content}</p>
                        <p className="notification-listitem-user">{selectedNotification.user.name} {convertDate(selectedNotification.createdAt)}</p>
                        <p>Replies: {responses.length}</p>
                        <ul className="response-list">
                            {responseList}
                        </ul>
                        <ResponseForm/>    
                    </div>            
                </div>
            </div>        
        )
    }

}

function mapStateToProps(state) {
    return {
        selectedNotification: state.selectedNotification,
        responses: state.responses,
    };
} 
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchNotification: fetchNotification, }, dispatch);
}
  
export default connect( mapStateToProps,  mapDispatchToProps)(Notification);