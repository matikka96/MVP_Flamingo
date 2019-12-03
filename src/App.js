// import React from "react";
// import logo from "./logo.png";
// import "./App.css";

// function App() {
//   state = {
//     sliderValue: null
//   }
//   render() {
//     return (
//     <div className="App">
//       <input type="range" min="1" max="100" value="50"></input>
//     </div>
//     );
//   }
// }

// export default App;

// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    rangeValue: 1
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.rangeValue}€</h1>
        <input
          style={{ zoom: "2" }}
          type="range"
          min="1"
          max="100"
          defaultValue={this.state.rangeValue}
          onChange={e => this.setState({ rangeValue: e.target.value })}
        ></input>
        <div>
          <button
            onClick={() => alert(`${this.state.rangeValue}€ saved. Congratulation!`)}
          >
            Save money
          </button>
        </div>
      </div>
    );
  }
}

export default App;
