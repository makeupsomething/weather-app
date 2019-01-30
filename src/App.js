import React, { Component } from 'react';
import { getWeatherByCityName } from './api'

class App extends Component {

  getWeather() {
    getWeatherByCityName('dublin')
  }

  render() {
    return (
      <div className="App">
        <i class="wi wi-owm-800"></i>
        <button onClick={this.getWeather}>get the weather</button>
      </div>
    );
  }
}

export default App;
