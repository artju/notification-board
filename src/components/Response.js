import React from 'react';
import PropTypes from 'prop-types';

const Response = props => {

    Response.propTypes = {
        user: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    } 


    return (
    <li className="response-item">
        <p>{props.content}</p>
        <span>{props.user} {props.date}</span>
    </li> 
    );
}

export default Response;