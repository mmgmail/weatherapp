import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { getWeatherToday } from 'AppRedux';

class HomeScreen extends PureComponent {
  
  constructor(props) {
    super(props);
    
    this.state = {
      lat: 50.40,
      lon: 30.61
    }
  }

  componentDidMount() {
    this.props.getWeatherToday(this.state.lat, this.state.lon);
  }

  render() {
    const { weatherData, error, isLoading } = this.props;
    // const { showMarker, region } = this.state;
    // const { latitude, longitude } = region;
    
    return (
      <SafeAreaView style={styles.container}>
        <View>
          {isLoading 
            ? <ActivityIndicator color={'black'} />
            : weatherData ? 
                <View>
                  <Text>{ `${weatherData.name}, ${Math.floor(weatherData.main.temp)}°C` }</Text>
                  <Text>{ weatherData.weather[0].description }</Text>
                </View>
            : error ? 
                <View>
                  <Text style={{ color: 'red' }}>{`Thomething went wrong!\n${error}`}</Text>
                </View> : <View />
          } 
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    weatherData: state.weather.todayWeather,
    isLoading: state.weather.isLoading,
    error: state.weather.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWeatherToday: (lat, lon) => dispatch(getWeatherToday(lat, lon))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);