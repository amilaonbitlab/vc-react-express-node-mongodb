import React, { Component } from 'react';
import './Main.css';
import Users from "./Users";
// import AddUser from "./AddUser";
import Axios from 'axios';
import Loader from 'react-loader';
import Pager from 'react-pager';


class Main extends Component {
  constructor(props){
    super(props);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.state = {
        users : [],
        loaded : false,
        loaded2: true,
        total:       0,
        current:     0,
        visiblePage: 2,
        perPageUser: 25,
        totalUser: 0
    }
  }

    handlePageChanged(newPage) {
        this.setState({ current : newPage });
        this.getSelectedPageUsers(newPage);
    }

    componentWillMount(){
        this.setState({ users : [] });
    }
    componentDidMount() {
        const url = 'http://localhost:3001/api/get/total/user/count';
        Axios.get(url)
            .then(res => {
                this.setState({
                    total : res.data / this.state.perPageUser,
                    current : 0,
                    totalUser : res.data,
                    loaded: true
                });
                this.getSelectedPageUsers(this.state.current);
            });
    }

    getSelectedPageUsers(id){
        const url = 'http://localhost:3001/api/get/user/page/'+id;
        this.setState({ loaded2 : false });
        Axios.get(url)
            .then(res => {
                this.setState({
                    users : res.data,
                    loaded2 : true
                });
            });
    }
    handleAddUser(user) {
      let users = this.state.users;
      users.push(user);
      this.setState({users:users});
    }
    handleDeleteUser(_id) {
      let users = this.state.users;
      let index = users.findIndex(x => x._id === _id);
      users.splice(index,1);
      this.setState({users:users});
    }

  render() {
      const options = {
          lines: 13,
          length: 20,
          width: 10,
          radius: 30,
          scale: 1.00,
          corners: 1,
          color: '#237fa4',
          opacity: 0.25,
          rotate: 0,
          direction: 1,
          speed: 1,
          trail: 60,
          fps: 20,
          zIndex: 2e9,
          top: '50%',
          left: '50%',
          shadow: false,
          hwaccel: false,
          position: 'absolute'
      };

    return (
      <div className="Main">
        {/*<AddUser addUser={this.handleAddUser.bind(this)}/>*/}
        <div className="container">
            <div className="row">
                <table className="table table-responsive table-bordered">
                  <thead>
                    <tr>
                        <th>Id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Video Count</th>
                        {/*<td>X</td>*/}
                    </tr>
                  </thead>
                </table>
            </div>
            <div className="row">
                    <Loader loaded={this.state.loaded} options={options} className="spinner">
                        <Loader loaded={this.state.loaded2} options={options} className="spinner">
                            <Users onDelete={this.handleDeleteUser.bind(this)} users={this.state.users}/>
                        </Loader>
                        <Pager
                            total={this.state.total}
                            current={this.state.current}
                            visiblePages={this.state.visiblePage}
                            titles={{ first: '<|', last: '>|' }}
                            className="pagination-sm pull-left"
                            onPageChanged={this.handlePageChanged}
                        />
                        <span className="pull-right TotalUser"> Total Users : {this.state.totalUser}</span>
                    </Loader>
            </div>
        </div>
      </div>
    );
  }
}

export default Main;

// TODO : This part still under development
// import { applyMiddleware, combineReducers, createStore } from 'redux';
// const userReducer = function (state={}, action) {
//
//     switch(action.type){
//         case 'CHANGE_F_NAME' : {
//             state = {...state, first_name : action.payload};
//             break;
//         }
//         case 'CHANGE_L_NAME' : {
//             state = {...state, last_name : action.payload};
//             break;
//         }
//         case 'CHANGE_COUNT' : {
//             state = {...state, count : action.payload};
//             break;
//         }
//     }
//     return state;
// };
// const reducers = combineReducers({
//     user : userReducer
// });
// const logger = (store) => (next) => (action) => {
//     console.log('action fire', action);
//     next(action);
// };
// const error = (store) => (next) => (action) => {
//     try {
//         next(action);
//     } catch(e) {
//         console.log('Error ',e);
//     }
// };
// const middleware = applyMiddleware(logger,error);
// const store = createStore(reducers,{
//     user : {
//         first_name : '',
//         last_name : '',
//         count : null
//     }
// },middleware);
// store.subscribe(() => {
//     console.log('Store Change ' , store.getState())
// });
//
// store.dispatch({type : 'CHANGE_F_NAME', payload : 'Amila'});
// store.dispatch({type : 'CHANGE_L_NAME', payload : 'Sampath'});
// store.dispatch({type : 'CHANGE_COUNT', payload : 34});
