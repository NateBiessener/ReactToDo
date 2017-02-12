import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Task extends Component {
  render(props) {
    return (
      <div>
        <p>{this.props.task}</p> <button onClick={this.props.onEdit}>edit</button> <button onClick={this.props.onDelete}>del</button>
      </div>
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: ['first', 'second', 'third'],
    };
  };

  onEdit = (index) => {
    console.log('index: ' + index)
  };

  onDelete = (index) => {
    this.state.tasks.splice(index, 1);
    this.setState({
      tasks: this.state.tasks,
    });
  };

  addTask = (e) => {
    console.log('add task');
  };

  deleteTask = (e) => {

  };

  render () {
    return (
      <div>
        <button onClick={this.addTask}>Add task</button>
        {this.state.tasks.map((item, index)=>{
          return <Task task={item} onEdit={function() {this.onEdit(index)}.bind(this)} onDelete={function() {this.onDelete(index)}.bind(this)} key={index}/>
        })}
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
