const React = require('react')
const ms = require('pretty-ms')

class Timer extends React.Component {
  
    constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
    
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
    
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
    
  resetTimer() {
    this.setState({time: 0, isOn: false})
  }
    
  getTimer() {
    return (this.state.time)
  }
    
  render() {
      
    let start = (this.state.time == 0) ?
    <button onClick={this.startTimer}>start</button> :
    null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
    null :
    <button onClick={this.stopTimer}>Cancel</button>
    /*
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
    */
    /*
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
    */
      
    if(this.state.time === 5000) {
        this.stopTimer();
    }
      
    return(
      <div>
        <h3>{ms(this.state.time)}</h3>
        <div>
            {start}
            {stop}
        </div>
      </div>
    )
  }
}

module.exports = Timer