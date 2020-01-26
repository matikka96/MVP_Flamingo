import "./App.css";
import Timer from "./Timer";
import React, { Component } from "react";
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import ReactTimeout from 'react-timeout';
import ReactInterval from 'react-interval';
import cancel from './JavaScript_XD/skins/ocs_cancel.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class App extends Component {
    
  state = {
    rangeValue: 1,
    targets: [
      { name: "hoodie", price: 30 },
      { name: "playstation", price: 300 },
      { name: "mercedes", price: 30000 }
    ],
    selectedTarget: "",
    savingsHoodie: 0,
    savingsPlaystation: 0,
    savingsMercedes: 0,
    valueCircleTimer: 0,
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
    if(target === "playstation") {
        this.setState((prevState,props) => ({
            savingsPlaystation : prevState.savingsPlaystation + amount
        }));
    }
    if(target === "hoodie") {
        this.setState((prevState,props) => ({
            savingsHoodie : prevState.savingsHoodie + amount
        }));
    }
    if(target === "mercedes") {
        this.setState((prevState,props) => ({
            savingsMercedes : prevState.savingsMercedes + amount
        }));
    }
  };

  handleCancelSaving = index => {
    let savings = [...this.state.savings];
    savings.splice(index, 1);
    console.log(savings);
    this.setState({ savings });
  };
  
    render() {
      
    //var child = React.createRef();
    const TransactionSlider = withStyles({
      root: {
        color: '#DAA520',
        '$vertical &': {
          height: '100%',
        },
      },
      thumb: {
        width: 100,
        height: 100,
        position: 'center',
      },
      valueLabel: {
        left: 'calc(-50% + 4px)',
      },
    })(Slider);
      
    const muiTheme = createMuiTheme({
      overrides: {
        MuiSlider: {
            root: {color: '#DAA520', marginLeft:-227, height: '20%',},
            rail: {opacity: 0,},
            track: {opacity: 0,},
            thumb: { width: 240, height: 240,},
            valueLabel: {
              left: 'calc(-50% + 4px)',
            },
        },
      },
    });
        
    const BorderLinearProgress = withStyles({
      root: {
        height: 45,
        borderRadius: 90,
        backgroundColor: '#005F5F',
        label: 'Hoodie',
      },
      bar: {
        borderRadius: 90,
        backgroundColor: '#DAA520',
        
      },
    })(LinearProgress);
        
    function valuetext(value) {
        return `${value}€`;
    }
    
    function SliderThumbComponent(props) {
        return(
            <span {...props}>
                <div className="coinValue">
                    <p>{valuetext}</p>
               </div>
            </span>
        );
    }
        
    const handleChangeCommit = (event, newValue) => {
        this.setState({ rangeValue : newValue});
        document.getElementById("TransactionSlider").style.display = 'none';
        document.getElementById("cancelTimer").style.display = 'flex';
        
        this.circleTimer = setInterval(() => {
                this.setState((prevState,props) => ({
                    valueCircleTimer : prevState.valueCircleTimer + 0.33
                }));
        },10);
        this.timer = setTimeout(() => {this.setState({on: !this.state.on});this.handleNewSaving(this.state.selectedTarget.name,this.state.rangeValue);document.getElementById("TransactionSlider").style.display = 'flex';document.getElementById("cancelTimer").style.display = 'none';clearInterval(this.circleTimer);this.setState({ valueCircleTimer: 0});},3000);
        
    };
      
    const handleCancelTimer = () => {
        this.setState({ on: false} );
        clearTimeout(this.timer);
        document.getElementById("cancelTimer").style.display = 'none';
        document.getElementById("TransactionSlider").style.display = 'flex';
    };
        
    const handleProgressBarClick = e => {
        if (e.target.id === "bar_hoodie") {
            this.setState({ selectedTarget: this.state.targets[0] })
        } else if(e.target.id === "bar_playstation") {
            this.setState({ selectedTarget: this.state.targets[1] })
        } else if(e.target.id === "bar_mercedes") {
            this.setState({ selectedTarget: this.state.targets[2] })
        }
    };
      
    return (
      <div className="App">
        <div className="CancelTimer" id="cancelTimer">
            <button className="cancelButton" onClick={handleCancelTimer}><img style={{height:100, width:100}} src={cancel}/></button>
        </div>
        <div className="circularProgressBar">
            <CircularProgress variant="determinate" color="secondary" value={this.state.valueCircleTimer} />
        </div>
        {this.state.selectedTarget === "" ? (
            <p className="greetingMessage">Please select target</p>
        ) : (
             <div className="SliderDiv">
                 <ThemeProvider theme={muiTheme}>
                    <Slider
                        className="Slider"
                        id="TransactionSlider"
                        orientation='vertical'
                        min={1}
                        defaultValue={1}
                        max={this.state.selectedTarget.price / 10}
                        onChangeCommitted={handleChangeCommit}
                        valueLabelDisplay="auto"
                        ThumbComponent={SliderThumbComponent}
                    />
                 </ThemeProvider>
             </div>
             )
        
        }
        <div className="SavingsList">
            <div className="ProgressBar" onClick={handleProgressBarClick}>
                <BorderLinearProgress
                    id="bar_hoodie"
                    variant="determinate"
                    color="secondary"
                    value={this.state.savingsHoodie * 100 / 30}
                />
            </div>
            <div className="nameDiv">
                <p className="progressLabel">Hoodie</p>
            </div>
            <div className="ProgressBar" onClick={handleProgressBarClick}>
                <BorderLinearProgress
                  id="bar_playstation"
                  variant="determinate"
                  color="secondary"
                  value={this.state.savingsPlaystation * 100 / 300}
                />
            </div>
            <div className="nameDiv" style={{marginTop: 57}}>
                <p className="progressLabel">Playstation</p>
            </div>
            <div className="ProgressBar" onClick={handleProgressBarClick}>
                <BorderLinearProgress
                  id="bar_mercedes"
                  variant="determinate"
                  color="secondary"
                  value={this.state.savingsMercedes * 100 / 30000}
                />
            </div>
            <div className="nameDiv" style={{marginTop: 117}}>
                <p className="progressLabel">Mercedes</p>
            </div>
        </div>
      </div>
    );
  }
}

export default App;

//<h1>{this.state.rangeValue}€</h1>
/*
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
 */
