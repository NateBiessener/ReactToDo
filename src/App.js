import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Task extends Component {
  render(props) {
    return (
      <div>
        {this.props.edit ?
        <EditTaskForm task={this.props.task} index={this.props.index} onEditSubmit={this.props.onEditSubmit} />
        :
        <div>{this.props.task}</div>
        }
        <button onClick={this.props.onEdit}>edit</button> <button onClick={this.props.onDelete}>del</button>
      </div>
    );
  }
}

class EditTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
    };
  };

  onTaskChange = (e) => {
    this.setState({task: e.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEditSubmit({
      task: this.state.task,
      index: this.props.index,
    });
    // this.setState({task: ""});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.task} onChange={this.onTaskChange} />
          <input type="submit" value="Edit Task" />
        </form>
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

    this.props.onAdd({
      task: this.state.task,
      edit: false,
    });
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
    //satisfies React's requirement not to directly mutate state... but splice directly changes the tasks array...
    //will investigate later
    let newThing = this.state.tasks[index];
    newThing.edit = !newThing.edit;
    this.state.tasks.splice(index, 1, newThing);
    this.setState({
      tasks: this.state.tasks,
    });
  };

  //feel like this should be less ugly, but we have it working at least
  onEditSubmit = (data) => {
    let newThing = {
      task: data.task,
      edit: false,
    };
    this.state.tasks.splice(data.index, 1, newThing);
    this.setState({
      tasks: this.state.tasks,
    });
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
          return <Task task={item.task} edit={item.edit}
          onEdit={function() {this.onEdit(index)}.bind(this)}
          onEditSubmit={this.onEditSubmit}
          onDelete={function() {this.onDelete(index)}.bind(this)}
          index={index}
          key={index}/>
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
