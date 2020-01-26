import "./App.css";
import React, { Component } from "react";
import ReactSlider from "react-slider";
import "bootstrap/dist/css/bootstrap.css";
// import Slider from "@material-ui/core/Slider";
// import Slider, { createSliderWithTooltip } from "rc-slider";
// import ReactSlider from "rc-slider";
// import Tooltip from "rc-tooltip";
// import "rc-slider/assets/index.css";
// import "rc-tooltip/assets/bootstrap.css";
// import ReactTimeout from 'react-timeout';
// import Timer from "./Timer";

class App extends Component {
  state = {
    rangeValue: 0,
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
      console.log("target changed");
      this.setState({ rangeValue: 0 });
    }
  }

  handleNewSaving = (target, amount) => {
    this.setState({
      savings: [...this.state.savings, { target, amount: amount / 10 }]
    });
    let value = this.state.rangeValue;
    var interval = setInterval(() => {
      value = this.state.rangeValue;
      if (value <= 0) {
        clearInterval(interval);
      } else {
        let newValue = Math.round(value - 0.1 * value - 1);
        // console.log(newValue);
        this.setState({ rangeValue: newValue });
      }
    }, 10);
  };

  handleCancelSaving = index => {
    let savings = [...this.state.savings];
    savings.splice(index, 1);
    console.log(savings);
    this.setState({ savings });
  };

  handlePopupTrigger = () => {
    let popup = document.getElementById("popup").style;
    if (popup.bottom === "0vh" || "") {
      popup.bottom = "-50vh";
    } else {
      popup.bottom = "0vh";
    }
  };

  render() {
    // const handleChange = (event, newValue) => {
    //   this.setState({ rangeValue: newValue });
    // };

    // const handleChangeCommit = (event, newValue) => {
    //   document.getElementById("TransactionSlider").style.display = "none";
    //   document.getElementById("cancelTimer").style.display = "flex";

    //   this.timer = setTimeout(() => {
    //     this.setState({ on: !this.state.on });
    //     this.handleNewSaving(this.state.selectedTarget.name, this.state.rangeValue);
    //     document.getElementById("TransactionSlider").style.display = "flex";
    //     document.getElementById("cancelTimer").style.display = "none";
    //   }, 3000);
    // };

    const handleCancelTimer = () => {
      this.setState({ on: false });
      clearTimeout(this.timer);
      document.getElementById("cancelTimer").style.display = "none";
      document.getElementById("TransactionSlider").style.display = "flex";
    };

    // let sliderSytle = {
    //     cursor: "pointer",
    //     color: "#daa520"
    // }

    return (
      <div className="App">
        <div className="app-header">
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
              <option key={index} value={index}>
                {t.name}
              </option>
            ))}
          </select>

          <button className="btn btn-secondary" onClick={() => this.handlePopupTrigger()}>
            Show savings
          </button>

          <div className="CancelTimer" id="cancelTimer">
            <button className="cancelButton" onClick={handleCancelTimer}>
              Cancel
            </button>
          </div>
        </div>
        <div className="app-footer d-flex flex-column justify-content-between align-items-center">
          {this.state.selectedTarget === "" ? (
            <p className="greetingMessage">Please select target</p>
          ) : (
            <div className="slider-container mb-3">
              <div className="central-circle"></div>
              <ReactSlider
                min={0}
                max={this.state.selectedTarget.price}
                value={this.state.rangeValue}
                className="vertical-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                orientation="vertical"
                renderThumb={(props, state) => (
                  <div {...props}>{Math.round(state.valueNow / 10)}</div>
                )}
                onChange={e => this.setState({ rangeValue: e })}
                onAfterChange={value =>
                  this.handleNewSaving(this.state.selectedTarget.name, value)
                }
              />
            </div>
          )}
        </div>
        <div
          id="popup"
          className="container bg-warning mx-auto rounded-top overflow-auto"
        >
          <div className="d-flex justify-content-between py-3 m-0 sticky-top bg-warning">
            <h3>Savings</h3>
            <button
              className="btn btn-secondary"
              onClick={() => this.handlePopupTrigger()}
            >
              Close
            </button>
          </div>
          {this.state.savings.length === 0 ? null : (
            <div className="">
              <table className="table table-borderless table-striped text-left">
                <thead>
                  <tr>
                    <th scope="Target">Taget</th>
                    <th scope="Faving">Saving amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.savings.map((s, index) => (
                    <tr key={index}>
                      <td>{s.target}</td>
                      <td>{s.amount}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
