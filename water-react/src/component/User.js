import React, { Component } from 'react';
import './User.css';

class User extends Component {

  deleteUser(_id) {
    this.props.onDelete(_id)
  }

  render() {
    return (
      <div className="User">
        <div className="row">
          <div className="col-md-1">
              {this.props.index + 1}
          </div>
          {/*<div className="col-*-3">{this.props.user._id}</div>*/}
          <div className="col-md-4">
              {this.props.user.fn}
          </div>
          <div className="col-md-4">
              {this.props.user.ln}
          </div>
          <div className="col-md-2">
              {this.props.user.count.length}
          </div>
          {/*<div className="col-*-3">*/}
            {/*<a href="#" onClick={this.deleteUser.bind(this,this.props.user._id)}> X </a>*/}
          {/*</div>*/}
            </div>
      </div>
    );
  }
}

export default User;
