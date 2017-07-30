import React, { Component } from 'react';
import uuid from "uuid";

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      newUser : {}
    }
  }

  static defaultProps = {
    videoCount : [ 0, 5, 10, 15, 25 ]
  };

    handleSubmit(e) {

      if(this.refs.fName.value === ''){
        alert('First Name Required');
      }else{
        this.setState({
            newUser: {
              _id : uuid.v1(),
              first_name : this.refs.fName.value,
                last_name : this.refs.lName.value,
                count : this.refs.count.value                
            }
        },function () {
            this.props.addUser(this.state.newUser);
        })
      }

      e.preventDefault();
    }

  render() {

    let videoCountOption = this.props.videoCount.map(count => {
      return <option key={count} value={count}>{count}</option>
      });

    return (
      <div className="AddUser">
        <h3>Add New User</h3>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <lable>First Name</lable>
              <input type="text" ref="fName" />
            </div>
            <div>
              <lable>Last Name</lable>
              <input type="text" ref="lName" />
            </div>
            <div>
              <lable>Video Count</lable>
              <select ref="count">
                  {videoCountOption}
              </select>
            </div>
            <div>
              <input type="submit" ref="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddUser;
