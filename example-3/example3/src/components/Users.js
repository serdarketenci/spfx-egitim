import React, { Component } from 'react'
import PropTypes from 'prop-types';
import User from './User';

class Users extends Component {
    render() {
        const { users, deleteUser } = this.props;

        return (
            <div>
                {
                    users.map((user, index) => {
                        return <User
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            department={user.department}
                            salary={user.salary}
                            deleteUser={deleteUser}
                        />
                    })
                }
            </div>
        )
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default Users;