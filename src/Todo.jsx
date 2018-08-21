import React from 'react';

export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.task;
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
  }

  handleDeleteTask() {
    this.props.onDelete(this.state);
  }

  handleEditTask() {
    this.setState({ editEnabled: true });
  }
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  handleSaveTask() {
    const save = this.state;
    save.editEnabled = false;
    this.setState({ save });
    this.props.onSave(this.state);
  }

  render() {
    const alertType = {
      3: 'alert alert-danger no-margin',2: 'alert alert-warning no-margin',1: 'alert alert-success no-margin'
      
      
    };
    const alertThis = alertType[this.state.priority];
    if (this.state.editEnabled === true) {
      return (
        <li className={ alertThis } role='alert'>
          <label htmlFor='edit'>
            <strong>Description</strong>
          </label>
          <textarea
            name='text'
            id='edit'
            className='create-todo-text btn-block'
            value={ this.state.text }
            onChange={ this.handleChange }
          />
          <label htmlFor='priority'>
            <strong>Priority</strong>
          </label>
          <select
            name='priority'
            id='priority'
            className='update-todo-priority btn-block'
            placeholder='Select a Priority'
            value={ this.state.priority }
            onChange={ this.handleChange }
          >
            <option value='3'>High Priority</option>
            <option value='2'>Medium Priority</option>
            <option value='1'>Low Priority</option>
          </select>
          <li className='mt-2'>
            <button
              name='save'
              type='button'
              className='btn btn-success update-todo btn-block'
              onClick={ this.handleSaveTask }
            >
              Save
            </button>
          </li>
        </li>
      );
    }
    return (
      <div className={ alertThis } role='alert'>
        <input
          type='checkbox'
          aria-label='Checkbox for following text input'
          className='strikethrough'
        />
        <span><strong>{this.state.text}</strong></span>
        <div
          className='btn-group btn-group-sm float-right'
          role='group'
        >
          <a
            name='edit-todo'
            role='button'
            className='edit-todo btn btn-secondary pull-right active'
            aria-pressed='true'
            onClick={ this.handleEditTask }
          >
            edit
              </a>
          <a
            name='delete'
            role='button'
            className='delete-todo btn btn-secondary pull-right active'
            aria-pressed='true'
            onClick={ this.handleDeleteTask }
          >
            delete
              </a>
        </div>
      </div>
    );
  }
}
