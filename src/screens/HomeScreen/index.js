import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { getWeatherToday } from 'AppRedux';
import moment from 'moment';
import { Button, Image, Text, Divider } from 'react-native-elements';

class HomeScreen extends PureComponent {
  
  constructor(props) {
    super(props);
    
    this.state = {
      lat: 50.40,
      lon: 30.61,
      date: new Date()
    }
  }

  componentDidMount() {
    this.props.getWeatherToday(this.state.lat, this.state.lon);
  }

  componentDidUpdate(nextProps, nextState) {
    if(nextState.date !== this.state.date) {
      this.props.getWeatherToday(this.state.lat, this.state.lon);
    }
  }

  onHandlerUpdateDate = () => {
    this.setState({ date: new Date() });
  }

  render() {
    const { weatherData, error, isLoading } = this.props;
    // const { showMarker, region } = this.state;
    // const { latitude, longitude } = region;
    
    return (
      <SafeAreaView style={container}>
        <View>
          {isLoading 
            ? <ActivityIndicator color={'black'} />
            : weatherData ? 
                <View>
                  <Image source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} />
                  <Text h2 style={textCenter}>{ `${weatherData.name}, ${Math.floor(weatherData.main.temp)}°C` }</Text>
                  <Text h3 style={textCenter}>{ weatherData.weather[0].description }</Text>
                  <Divider style={mVertical} />
                </View>
            : error ? 
                <View>
                  <Text style={{ color: 'red' }}>{`Thomething went wrong!\n${error}`}</Text>
                </View> : <View />
          } 
        </View>
        <View>
          <Text h4 style={textCenter}>{ moment(this.state.date).format('LLL') }</Text>
          <Divider style={mVertical} />
        </View>
        <Button
          type="solid"
          title="Update weather"
          onPress={this.onHandlerUpdateDate}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  mVertical: {
    marginVertical: 15
  }
});

const { container, textCenter, mVertical } = styles;

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