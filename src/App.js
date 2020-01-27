import "./App.css";
import React, { Component } from "react";
import ReactSlider from "react-slider";
import "bootstrap/dist/css/bootstrap.css";

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
    on: false,
    selectedPopup: "popup-target"
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

  handleSavingsPopup = () => {
    let popup = this.state.selectedPopup;
    if (popup === "popup-savings") {
      this.setState({ selectedPopup: "" });
    } else {
      this.setState({ selectedPopup: "popup-savings" });
    }

    // let popup = document.getElementById("popup").style;
    // if (popup.bottom === "0vh" || "") {
    //   popup.bottom = "-50vh";
    // } else {
    //   popup.bottom = "0vh";
    // }
  };

  handleTargetPopup = () => {
    let popup = this.state.selectedPopup;
    if (popup === "popup-target") {
      this.setState({ selectedPopup: "" });
    } else {
      this.setState({ selectedPopup: "popup-target" });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="app-header">
          <button className="btn btn-secondary" onClick={() => this.handleSavingsPopup()}>
            Show savings
          </button>
          <button className="btn btn-secondary" onClick={e => this.handleTargetPopup()}>
            Select target
          </button>
          {this.state.selectedTarget !== "" ? null : (
            <h1 className="text-dark">Please select target</h1>
          )}
          {/* <div className="mx-auto">
            <p>asd</p>
          </div> */}
        </div>
        <div className="app-footer d-flex flex-column justify-content-between align-items-center">
          <div className="slider-container mb-3">
            <div className="central-circle"></div>
            {this.state.selectedTarget === "" ? null : (
              <ReactSlider
                min={0}
                max={this.state.selectedTarget.price}
                value={this.state.rangeValue}
                className="vertical-slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                orientation="vertical"
                renderThumb={(props, state) => (
                  <h3 {...props}>{Math.round(state.valueNow / 10)}</h3>
                )}
                onChange={e => this.setState({ rangeValue: e })}
                onAfterChange={value =>
                  this.handleNewSaving(this.state.selectedTarget.name, value)
                }
              />
            )}
          </div>
        </div>
        <div
          id="popup"
          className="container bg-warning mx-auto rounded-top overflow-auto"
          style={
            this.state.selectedPopup === "popup-savings"
              ? { bottom: "0vh" }
              : { bottom: "-60vh" }
          }
        >
          <div className="d-flex justify-content-between py-3 m-0 sticky-top bg-warning">
            <h3>Savings</h3>
            <button
              className="btn btn-secondary"
              onClick={() => this.handleSavingsPopup()}
            >
              Close
            </button>
          </div>
          {this.state.savings.length === 0 ? null : (
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
          )}
        </div>
        <div
          id="category-selector"
          className="container d-flex flex-column p-0 rounded-top"
          style={
            this.state.selectedPopup === "popup-target"
              ? { height: "40vh" }
              : { height: "0vh" }
          }
        >
          {this.state.targets.map((t, index) => (
            <button
              key={index}
              value={index}
              className={
                this.state.selectedTarget === t
                  ? "target btn btn-danger rounded-0 active"
                  : "target btn btn-danger rounded-0"
              }
              onClick={e => {
                this.setState({ selectedTarget: this.state.targets[e.target.value] });
                this.handleTargetPopup();
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
