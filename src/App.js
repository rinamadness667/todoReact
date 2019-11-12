import React from 'react';
import './App.css';

class App extends React.Component {
  array = [
    {
      id: Math.random(),
      status: false,
      text: 'text'
    },
    {
      id: Math.random(),
      status: true,
      text: 'text'
    },
    {
      id: Math.random(),
      status: false,
      text: 'text'
    },
    {
      id: Math.random(),
      status: false,
      text: 'text'
    }];

  arrayToJSX() {
    const arrForShow = this.array.map(item => {
      return <li id={item.id}>
        <input type="checkbox" className="checkbox" />
          <span id="toDo">{item.text}</span>
          <input type="button" id="X" className="button-x" value="X" />
      </li>
    });

    return(arrForShow);
  }

  render() {
    return (
        <div>{this.arrayToJSX()}</div>
    )
  }
}
export default App;
