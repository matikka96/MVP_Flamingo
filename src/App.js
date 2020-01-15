import "./App.css";
import Timer from "./Timer";
import React, { Component } from "react";
import Slider from '@material-ui/core/Slider';
import ReactTimeout from 'react-timeout';

class App extends Component {
    
  state = {
    rangeValue: 1,
    targets: [
      { name: "hoodie", price: 30 },
      { name: "playstation", price: 300 },
      { name: "mercedes", price: 30000 }
    ],
    selectedTarget: "",
    savings: [],
    on: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedTarget !== this.state.selectedTarget) {
      this.setState({ rangeValue: 1 });
    }
  }

  handleNewSaving = (target, amount) => {
    this.setState({
      savings: [...this.state.savings, { target, amount }],
    });
  };

  handleCancelSaving = index => {
    let savings = [...this.state.savings];
    savings.splice(index, 1);
    console.log(savings);
    this.setState({ savings });
  };

  render() {
      
    //var child = React.createRef();
      
    const handleChange = (event, newValue) => {
        this.setState({ rangeValue : newValue});
    };
      
    const handleChangeCommit = (event, newValue) => {
        document.getElementById("TransactionSlider").style.display = 'none';
        document.getElementById("cancelTimer").style.display = 'flex';
        
        this.timer = setTimeout(() => {this.setState({on: !this.state.on});this.handleNewSaving(this.state.selectedTarget.name,this.state.rangeValue);document.getElementById("TransactionSlider").style.display = 'flex';document.getElementById("cancelTimer").style.display = 'none';},3000);
        
    };
      
    const handleCancelTimer = () => {
        this.setState({ on: false} );
        clearTimeout(this.timer);
        document.getElementById("cancelTimer").style.display = 'none';
        document.getElementById("TransactionSlider").style.display = 'flex';
    };
      
    let sliderSytle = {
        cursor: "pointer",
        color: "#daa520"
    }
      
    return (
      <div className="App">
        <select
          className="SelectTarget"
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
        <div className="CancelTimer" id="cancelTimer">
            <button className="cancelButton" onClick={handleCancelTimer}>Cancel</button>
        </div>
        {this.state.selectedTarget === "" ? (
          <p className="greetingMessage">Please select target</p>
        ) : (
                <Slider
                    id="TransactionSlider"
                    className="Slider"
                    orientation="vertical"
                    min={1}
                    max={this.state.selectedTarget.price / 10}
                    defaultValue={1}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommit}
                    dotStyle={{ borderColor: 'red' }}
                    railStyle={{ backgroundColor: "#daa520", width: 50}}
                    valueLabelDisplay="auto"
                />
        )}
        {this.state.savings.length === 0 ? null : (
            <div className="SavingsList">
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

//<h1>{this.state.rangeValue}€</h1>