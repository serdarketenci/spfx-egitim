import React from 'react'
import PropTypes from 'prop-types';

function NavBar(props) {
    return (
        <div className='navBar'>
            {props.title}
        </div>
    )
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired
}

export default NavBar;