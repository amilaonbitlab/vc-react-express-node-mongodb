import React, { Component } from 'react';
import './Users.css';
import User from "./User";

class Users extends Component {
    deleteUser(_id) {
        this.props.onDelete(_id);
    }

  render() {
      let userList;
      if(this.props.users){
          userList = this.props.users.map((user,i) => {
              return (
                <User onDelete={this.deleteUser.bind(this)} key={i} user={user} index={i}/>
              );
          })
      }
      return (
      <div className="Users">
          {userList}
      </div>
    );
  }
}

export default Users;
