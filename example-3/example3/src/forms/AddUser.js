import React, { Component } from 'react'
import { motion } from "framer-motion"
import PropTypes from 'prop-types';
import nextId from "react-id-generator";

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
}

export default class AddUser extends Component {
    state = {
        name: "",
        department: "",
        salary: "",
        isVisible: true,
        error: {
            isError: false,
            message: '',
        }
    }

    // changeName = (e) => {
    //     this.setState({
    //         name: e.target.value
    //     });
    // }

    // setName = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         name: "Test"
    //     });
    // }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    changeVisibility = (e) => {
        var { isVisible } = this.state;
        this.setState({
            isVisible: !isVisible
        })
    }

    validateForm = () => {
        const { name, department, salary } = this.state;

        if (name.trim() === "" || department.trim() === "" || salary.trim() === "") {
            return false;
        }

        return true;
    }

    addUser = (e) => {
        e.preventDefault();

        if (!this.validateForm()) {
            this.setState({
                error: {
                    isError: true,
                    message: 'Lütfen tüm alanları doldurunuz.'
                }
            });
            return;
        }
        else {
            this.setState({
                error: {
                    isError: false,
                    message: ''
                }
            });
        }

        const { name, department, salary } = this.state;

        const newUser = {
            id: nextId(),
            name,
            department,
            salary
        }

        this.props.addUser(newUser);
    }

    render() {
        const { name, department, salary, isVisible, error } = this.state;

        return (
            <div className='col-md-8 mb-4'>
                <button className='btn btn-dark btn-block mb-2'
                    onClick={this.changeVisibility}
                >
                    {isVisible ? "Hide Form" : "Show Form"}
                </button>

                <motion.div
                    animate={isVisible ? "open" : "closed"}
                    variants={variants}
                >
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Add User Form</h4>
                        </div>
                        <div className='card-body'>
                            {
                                error.isError ? <div className='alert alert-danger'>
                                    {error.message}
                                </div>
                                    : null
                            }
                            <form onSubmit={this.addUser}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder='Enter Name'
                                        className='form-control'
                                        value={name}
                                        onChange={this.changeInput}
                                    />
                                </div>
                                {/* <button onClick={this.setName} >Set Name Value</button> */}
                                <div className='form-group'>
                                    <label htmlFor='name'>Department</label>
                                    <input
                                        type='text'
                                        name='department'
                                        placeholder='Enter Department'
                                        className='form-control'
                                        value={department}
                                        onChange={this.changeInput}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='name'>Salary</label>
                                    <input
                                        type='text'
                                        name='salary'
                                        placeholder='Enter Salary'
                                        className='form-control'
                                        value={salary}
                                        onChange={this.changeInput}
                                    />
                                </div>
                                <button className='btn btn-danger btn-block' type='submit'>Add User</button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }
}

AddUser.propTypes = {
    addUser: PropTypes.func.isRequired
}
