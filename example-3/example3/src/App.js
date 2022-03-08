import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import NavBar, { NavBar2 } from './components/NavBar';
import User from './components/User';
import Users from './components/Users';
import AddUser from './forms/AddUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }
  state = {
    users: [
      {
        id: "1",
        name: "serdar",
        department: "IT",
        salary: 3200
      },
      {
        id: "2",
        name: "adem",
        department: "IT",
        salary: 23200
      },
      {
        id: "3",
        name: "test",
        department: "IT",
        salary: 23200
      }
    ]
  }

  deleteUser = (id) => {
    this.setState({
      users: this.state.users.filter(user => user.id !== id)
    })
  }

  addUser = (user) => {
    this.setState({
      users: [...this.state.users, user]
    })
  }

 
  render() {
    return (
      <Router>
        <div className='container'>
          <NavBar title='User App'></NavBar>
        </div>
        <hr />
        <Routes>
          <Route path="/"
            element={<Users deleteUser={this.deleteUser} users={this.state.users} />} />
          <Route path="/add"
            element={<AddUser addUser={this.addUser} />} />
        </Routes>
      </Router>
      // <div className="App">
      //   

      //   <NavBar title="Navbar Test" />

      //   
      // </div>
    )
  }
}


export default App;
