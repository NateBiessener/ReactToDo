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

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
    };
  };

  onTaskChange = (e) => {
    this.setState({task: e.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.onAdd(this.state.task);
    this.setState({task: ""});
  };


  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.task} onChange={this.onTaskChange} />
          <input type="submit" value="Add Task" />
        </form>
      </div>
    );
  };
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
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

  addTask = (task) => {
    this.state.tasks.push(task);
    this.setState({
      tasks: this.state.tasks,
    });
  };

  render () {
    let tasks = this.state.tasks;

    return (
      <div>
        <AddTaskForm onAdd={this.addTask}/>
        {tasks.map((item, index)=>{
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
