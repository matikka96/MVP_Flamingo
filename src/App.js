import "./App.css";
import React, { Component } from "react";
import ReactSlider from "react-slider";
import "bootstrap/dist/css/bootstrap.css";
import { withStyles } from "@material-ui/core/styles";
import ReactTimeout from "react-timeout";
import ReactInterval from "react-interval";
import cancel from "./JavaScript_XD/skins/ocs_cancel.png";
//import CheckIcon from '@material-ui/icons/Check';
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

class App extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.circleTimer = null;
  }
  state = {
    rangeValue: 0,
    targets: [
      { name: "Hoodie", price: 30, total: 0, id: 0 },
      { name: "Playstation", price: 300, total: 0, id: 1 },
      { name: "Mercedes", price: 30000, total: 0, id: 2 }
    ],
    selectedTarget: "",
    savingsHoodie: 0,
    savingsPlaystation: 0,
    savingsMercedes: 0,
    valueCircleTimer: 0,
    savings: [],
    selectedPopup: "",
    timerOn: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedTarget !== this.state.selectedTarget) {
      console.log("target changed");
      this.setState({ rangeValue: 0 });
    }
  }

  handleCancelTimer = () => {
    this.stopInterval();
    clearTimeout(this.timer);
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
    document.getElementById("cancelTimer").style.display = "none";
    document.getElementById("progressContainer").style.opacity = 1;
    this.setState({ timerOn: false });
  };

  startInterval = () => {
    this.circleTimer = setInterval(() => {
      this.setState((prevState, props) => ({
        valueCircleTimer: prevState.valueCircleTimer + 0.35
      }));
    }, 10);
  };

  stopInterval = () => {
    clearInterval(this.circleTimer);
    this.setState({ valueCircleTimer: 0 });
  };

  handleNewSaving = (target, amount) => {
    if (amount !== 0 && this.state.timerOn === false) {
      document.getElementById("cancelTimer").style.display = "flex";
      this.startInterval();

      this.setState({ timerOn: true });
      this.timer = setTimeout(() => {
        this.setState({ timerOn: false });
        document.getElementById("cancelTimer").style.display = "none";
        document.getElementById("progressContainer").style.opacity = 1;
        if (amount !== 0) {
          this.setState({
            savings: [...this.state.savings, { target, amount: Math.round(amount / 10) }]
          });
        }

        this.stopInterval();

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

        if (target === "Playstation") {
          this.setState((prevState, props) => ({
            savingsPlaystation: prevState.savingsPlaystation + amount * 0.1
          }));
        }
        if (target === "Hoodie") {
          this.setState((prevState, props) => ({
            savingsHoodie: prevState.savingsHoodie + amount * 0.1
          }));
        }
        if (target === "Mercedes") {
          this.setState((prevState, props) => ({
            savingsMercedes: prevState.savingsMercedes + amount * 0.1
          }));
        }
      }, 3000);
    }
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
  };

  handleProgressBarClick = id => e => {
    this.setState({ selectedTarget: this.state.targets[id] });
    document.getElementById("progressContainer").style.opacity = 0.45;
  };

  render() {
    const BorderLinearProgress = withStyles({
      root: {
        height: 45,
        borderRadius: 90,
        backgroundColor: "#004F4F",
        label: "Hoodie"
      },
      bar: {
        borderRadius: 90,
        backgroundColor: "#DAA520"
      }
    })(LinearProgress);

    return (
      <div className="App">
        <div className="app-header">
          <button
            className="btn btn-outline-dark my-3"
            onClick={() => this.handleSavingsPopup()}
          >
            Show savings
          </button>
          {this.state.selectedTarget !== "" ? null : (
            <h1 className="text-dark">Please select target</h1>
          )}
          <div className="CancelContainer" onClick={this.handleCancelTimer}>
            <div className="CancelTimer" id="cancelTimer">
              <button className="cancelButton">
                <img style={{ height: 100, width: 100 }} src={cancel} />
              </button>
            </div>
            <div className="circularProgressBar">
              <CircularProgress
                variant="determinate"
                color="secondary"
                size={100}
                value={this.state.valueCircleTimer}
              />
            </div>
          </div>
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
                onChange={e => {
                  this.setState({ rangeValue: e });
                  document.getElementById("progressContainer").style.opacity = 0.45;
                }}
                onAfterChange={value =>
                  this.handleNewSaving(this.state.selectedTarget.name, value)
                }
              />
            )}
          </div>
          <div className="SavingsList" id="progressContainer">
            <div className="ProgressBar" onClick={this.handleProgressBarClick(0)}>
              <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={(this.state.savingsHoodie * 100) / 30}
              />
            </div>
            <div className="nameDiv_frst" onClick={this.handleProgressBarClick(0)}>
              <p
                className="progressLabel"
                style={
                  this.state.selectedTarget.name === "Hoodie"
                    ? { fontWeight: "bold" }
                    : { fontWeight: "normal" }
                }
              >
                Hoodie
              </p>
            </div>
            <div className="ProgressBar" onClick={this.handleProgressBarClick(1)}>
              <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={(this.state.savingsPlaystation * 100) / 300}
              />
            </div>
            <div className="nameDiv_sec" onClick={this.handleProgressBarClick(1)}>
              <p
                className="progressLabel"
                style={
                  this.state.selectedTarget.name === "Playstation"
                    ? { fontWeight: "bold" }
                    : { fontWeight: "normal" }
                }
              >
                Playstation
              </p>
            </div>
            <div className="ProgressBar" onClick={this.handleProgressBarClick(2)}>
              <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={(this.state.savingsMercedes * 100) / 30000}
              />
            </div>
            <div className="nameDiv_thrd" onClick={this.handleProgressBarClick(2)}>
              <p
                className="progressLabel"
                style={
                  this.state.selectedTarget.name === "Mercedes"
                    ? { fontWeight: "bold" }
                    : { fontWeight: "normal" }
                }
              >
                Mercedes
              </p>
            </div>
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
      </div>
    );
  }
}

export default App;
