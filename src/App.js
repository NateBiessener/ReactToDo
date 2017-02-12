import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Task extends Component {
  onEdit = (e) => {
    console.log("edit");
  };

  onDelete = (e) => {
    console.log("delete");
  };

  render(props) {
    return (
      <div>
        <p>{this.props.task}</p> <button onClick={this.onEdit}>edit</button> <button onClick={this.onDelete}>del</button>
      </div>
    );
  }
}

class List extends Component {
  render () {
    return (
      <div>
        <button>Add task</button>
        <Task task='first'/>
        <Task task='second'/>
        <Task task='third'/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React to-do list</h2>
        </div>
        <div className="App-intro">
          <List />
        </div>
      </div>
    );
  }
}

export default App;
