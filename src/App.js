import "./App.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    rangeValue: 1,
    targets: [
      { name: "hoodie", price: 30 },
      { name: "playstation", price: 300 },
      { name: "mercedes", price: 30000 }
    ],
    selectedTarget: "",
    savings: []
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedTarget !== this.state.selectedTarget) {
      this.setState({ rangeValue: 1 });
    }
  }

  handleNewSaving = (target, amount) => {
    this.setState({
      savings: [...this.state.savings, { target, amount }],
      rangeValue: 1
    });
  };

  handleCancelSaving = index => {
    let savings = [...this.state.savings];
    savings.splice(index, 1);
    console.log(savings);
    this.setState({ savings });
  };

  render() {
    return (
      <div className="App">
        <select
          id="input-target"
          placeholder="Select target"
          value={this.state.targets.indexOf(this.state.selectedTarget)}
          onChange={e =>
            this.setState({ selectedTarget: this.state.targets[e.target.value] })
          }
        >
          <option value="">Choose target</option>
          {this.state.targets.map((t, index) => (
            <option value={index}>{t.name}</option>
          ))}
        </select>
        {this.state.selectedTarget === "" ? (
          <h1>Please select target</h1>
        ) : (
          <div>
            <h1>{this.state.rangeValue}€</h1>
            <input
              style={{ zoom: "2" }}
              type="range"
              min="1"
              max={this.state.selectedTarget.price / 10}
              value={this.state.rangeValue}
              onChange={e => this.setState({ rangeValue: e.target.value })}
            ></input>
            <div>
              <button
                onClick={() =>
                  this.handleNewSaving(
                    this.state.selectedTarget.name,
                    this.state.rangeValue
                  )
                }
              >
                Save money
              </button>
            </div>
          </div>
        )}
        {this.state.savings.length === 0 ? null : (
          <div>
            <h3>Savings:</h3>
            {this.state.savings.reverse().map((s, index) => (
              <div>
                <span>
                  {s.target} + {s.amount}€
                </span>
                <button
                  value={index}
                  onClick={e => this.handleCancelSaving(e.target.value)}
                >
                  cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
