import React from 'react';
import PropTypes from 'prop-types';

const NotificationListItem = props => {

    NotificationListItem.propTypes = {
        user: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired, 
        select: PropTypes.func.isRequired
    } 

    const handleClick = () => {
        props.select(props.id);
    }

    return (
    <li onClick={handleClick} className="notification-listitem">
        <div className="notification-listitem-content">
            <h4>{props.header}</h4>
            <p>{props.content}</p>
            <span className="notification-listitem-user">{props.user.name} {props.date}</span>
       </div>
    </li> 
    );
}

export default NotificationListItem;