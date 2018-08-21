
import React, { Component } from 'react';
import { Todo } from './Todo';

let clicks = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      priority: '',
      todoList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  handleAddEvent(e) {
    e.preventDefault();
    if(!this.state.text.length){
      return;
    }
    clicks += 1;
    const todoList = this.state.todoList;
    const newListObject = this.createObject(this.state.text, this.state.priority, clicks);


    this.setState({
      text: '',
      todoList: todoList.concat(newListObject)
    });
  }

  createObject(txt, prty, key) {
    return [{
      id: key,
      text: txt,
      priority: prty,
      editEnabled: false
    }];
  }

  deleteHandler(listItem) {
    const newList = [...this.state.todoList]; 
    const index = newList.map(key => key.id).indexOf(listItem.id);
    newList.splice(index, 1);
    this.setState({ todoList: newList });
  }

  saveHandler(listItem) {
    const newList = [...this.state.todoList];
    const index = newList.map(key => key.id).indexOf(listItem.id);
    newList.splice(index, 1, listItem);
    this.setState({ todoList: newList });
  }

  render() {
    return (
      <div className='container-fluid'>
        <h2 className='white mt-3'>Very Simple Todo App</h2>
        <p className='white text-muted'>Track all of the things <br /> developed by Taylor Lake</p>

        <hr />
        
        <div className='container'>
          <div className='col-md-4'>
            <div className='panel panel-default'>
              <div className='card-block'>
                <p className='panel-heading'>Add something to your list of things to do: </p>
                <textarea
                  name='text'
                  id='create'
                  className='create-todo-text btn-block'
                  value={ this.state.text }
                  onChange={ this.handleChange }
                /* onKeyPress={ (e) => { (e.key === 'Enter' ? this.handleAddEvent : null); } } */
                />
                <label htmlFor='priority'>
                  <strong>How much of a priority is this?</strong>
                </label>
                <select
                  name='priority'
                  id='priority'
                  className='create-todo-priority btn-block'
                  placeholder='Select a Priority'
                  value={ this.state.priority }
                  onChange={ this.handleChange }
                >
                  {/* <option value={ null }>Select a Priority</option> */}
                  <option value='1'>High Priority</option>
                  <option value='2'>Medium Priority</option>
                  <option value='3'>Low Priority</option>
                </select>
              </div>
              <div className='panel'>
                <button
                  name='submit'
                  type='button'
                  className='btn btn-success btn-block create-todo'
                  onClick={ this.handleAddEvent }
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div className='card'>
              <p className='card-header h6'>View Todos</p>
              <ul className='card-block no-padding pull-left'>
                {
                  (this.state.todoList.length === 0) ?
                    (<li className='card card-body'>
                     
                     <strong>(Todos appear here)</strong>
                    </li>) :
                    (this.state.todoList.map(list => (
                    <li>
                      <Todo
                        onDelete={ this.deleteHandler }
                        onSave={ this.saveHandler }
                        key={ list.id }
                        task={ list }
                      />
                      </li>)))
                }
              </ul>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
