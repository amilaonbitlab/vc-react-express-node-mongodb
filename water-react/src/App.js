import React, { Component } from 'react';
import './App.css';
import Header from "./component/Header";
import Main from './component/Main';
import Footer from "./component/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
