import React, {Fragment} from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      todoElements: [],
      value:'',
      editMode: false,
  }
}

  arrayToJSX() {
    const arrForShow = this.state.todoElements.map(item => {
      return <ToDoElement
        item={item}
        handleEditTodo={this.handleEditTodo}
        handleCheckOne = {this.handleCheckOne}
        handleDeleteOne = {this.handleDeleteOne}
        handleEditSave = {this.handleEditSave}
      />
    });

    return(arrForShow);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const todoNew = {
      id: Math.random(),
      text: this.state.value,
      status: false
    };

    if (todoNew.text.trim()) {

      this.setState({
        todoElements: this.state.todoElements.concat([todoNew]),
        value: ''
      })
    }
  };

  handleEditSave = () => {

  };

  handleChange = (event) => {
    const text = event.target.value;
    this.setState({value: text});
  };

  handleDeleteOne = id => {
    this.setState({
      todoElements: this.state.todoElements.filter(e => e.id !== id ),
    })
  };

  handleCheckOne = id => {
    this.setState({
      todoElements: this.state.todoElements.map(e => {
        if(e.id === id){
          e.status = !e.status
        }
        return e
      }),
    })
  };

  handleDeleteChecked = () => {
    this.setState({
      todoElements: this.state.todoElements.filter(e => e.status === false),
    })
  };


  handleCheckAll = () => {

  };

  render() {
    return (
        <div>
          <AddToDoForm handleSubmit = {this.handleSubmit}
                       handleChange = {this.handleChange}
                       handleCheckOne = {this.handleCheckOne}
                       handleDeleteOne = {this.handleDeleteOne}
                       handleDeleteChecked = {this.handleDeleteChecked}
                       handleCheckAll = {this.handleCheckAll}
                       value = {this.state.value}
          />
          {this.arrayToJSX()}
        </div>
    )
  }
}

  export default App;

  class AddToDoForm extends React.Component {

  render() {
    return (
          <Fragment>
            <div>
              <form id="add-todo" onSubmit={this.props.handleSubmit}>
                <input autoFocus id="new-todo" value={this.props.value} onChange={this.props.handleChange}
                       className="placeholder" placeholder="Write the task here"
                       autoComplete="off"/>
                <button type="submit" className="buttons" id="btn-enter">Enter</button>
              </form>
            </div>

            <div>
              <input type="checkbox" id="check-all" onChange={() => this.handleCheckAll}/>
                <label className="check-all" htmlFor="check-all">Check all</label>
              <button type="button" className="buttons" id="btn-all">All</button>
              <button type="button" className="buttons" id="btn-active">Active</button>
              <button type="button" className="buttons" id="btn-complete">Complete</button>
              <button type="button" className="buttons" id="btn-delete" onClick = {
                  this.props.handleDeleteChecked}>Delete</button>
            </div>
            <div className="container"></div>
            <div id="pagination" className="pagination"></div>
          </Fragment>
    );
  }
}

class ToDoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      value: this.props.item.text,
    }
  }

  handleEditTodo = () => {
    this.setState({
      editMode: !this.state.editMode
    });

    console.log('edit this mzfk')
  };

  render (){
      return (
          this.state.editMode
              ? <input type="text" autoFocus={true} onBlur={this.handleEditTodo} onKeyPress={() => console.log('12')} defaultValue={this.state.value}
                       key={this.props.item.id} className="placeholder" />
              : <li key={this.props.item.id} onDoubleClick={this.handleEditTodo}>
                <input type="checkbox" className="checkbox"
                       onChange = {()=>this.props.handleCheckOne(this.props.item.id)}/>
                <span id="toDo">{ this.props.item.text }</span>
                <input type="button" id="X" className="button-x" value="X"
                       onClick={()=>this.props.handleDeleteOne(this.props.item.id)} />
              </li>
      )
    }
}
