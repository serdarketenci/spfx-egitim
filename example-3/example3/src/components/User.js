import React, { Component } from 'react'
import PropTypes from 'prop-types';

class User extends Component {
    constructor(props) {
        super(props);

        // this.onClickEvent = this.onClickEvent.bind(this);

        this.state = {
            isVisible: false
        }
    }

    getCardBodyRender = () => {
        const { name, department, salary } = this.props;

        if (this.state.isVisible) {
            return <div className='card-body'>
                <p className='card-tet'>Departman: {department}</p>
                <p className='card-tet'>Maas: {salary}</p>
            </div>
        }
        else {
            return <div></div>
        }
    }

    // onClickEvent(e){
    //     console.log(e.target);
    //     console.log('test');
    //     console.log(this.state.isVisible);
    // }

    onClickEvent = (e) => {
        console.log(e.target);
        console.log('test');
        console.log(this.state.isVisible);

        this.setState({
            isVisible: !this.state.isVisible
        });
    }

    onDeleteUser = () => {
        const { id } = this.props;

        this.props.deleteUser(id);
    }

    render() {
        const { name, department, salary } = this.props;

        return (
            <div className='col-md-8 mb-4'>
                <div className='card'>
                    <div className='card-header d-flex justify-content-between'>
                        <h4 className='d-inline' onClick={this.onClickEvent}>{name}</h4>
                        <button onClick={this.onDeleteUser}>Sil</button>
                    </div>
                    {this.getCardBodyRender()}
                </div>
            </div>
        )
    }
}

User.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    deleteUser: PropTypes.func.isRequired
}

User.defaultProps = {
    name: "Bilgi yok",
    department: "Bilgi yok",
    salary: "Bilgi yok"
}

export default User;