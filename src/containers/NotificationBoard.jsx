import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNotifications, fetchNotification } from '../actions';
import  NotificationListItem  from '../components/NotificationListItem';
import  NotificationAdder  from './NotificationAdder';
import Notification from './Notification';
import { convertDate } from '../helper';

class NotificationBoard extends Component {
    constructor() {
        super();
        this.state = {
            notificationVisible: false,
        }
    }
    convertDate = function(ISODate) {
        let date = new Date(ISODate);
        let newDate =  date.getDate() + '.'+(date.getMonth()+1) + '.' + date.getFullYear() +' ' + date.getHours() + ':';
        if (date.getMinutes() < 10) {
          newDate += '0' + date.getMinutes();
        } else {
          newDate += date.getMinutes();
        }
        return newDate;
    }    
    componentWillMount() {
        this.props.fetchNotifications();
    }
    openModal = (e) => {
        this.setState({[e.target.name]: true});
    }
    closeModal = () => {
        this.setState({notificationVisible: false});
    }

    selectNotification = (id) => {
        this.props.fetchNotification(id);
        this.setState({notificationVisible: true})
    }

    render() {
        const { notificationVisible } = this.state;
        const { notifications } = this.props;
        const notificationsList = notifications.reverse().map(notification => 
        (<NotificationListItem id={notification.id} user={notification.user} date={convertDate(notification.createdAt)} content={notification.content} header={notification.header} select={this.selectNotification}/>));
        return (
            <div className="notifications-container">
                <ul>
                    {notificationsList}
                </ul>
                <Notification isVisible={notificationVisible} close={this.closeModal}/>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        notifications: state.notifications,
        selectedNotification: state.selectedNotification,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchNotifications: fetchNotifications, fetchNotification: fetchNotification}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotificationBoard);