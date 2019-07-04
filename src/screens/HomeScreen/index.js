import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  PermissionsAndroid,
  Alert,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { getWeatherToday } from 'AppRedux';
import moment from 'moment';
import { Button, Image, Text, Divider } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';

class HomeScreen extends PureComponent {
  
  constructor(props) {
    super(props);
    
    this.state = {
      lat: null,
      lon: null,
      date: new Date()
    }
  }

  componentDidMount() {
    if(Platform.OS === 'android') {
      this.requestLocationRuntimePermission();
    } else {
      this.getGeolocation()
        .then(position => {
          this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        })
        .then(() => {
          this.props.getWeatherToday(this.state.lat, this.state.lon);
        });
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if(nextState.date !== this.state.date) {
      this.props.getWeatherToday(this.state.lat, this.state.lon);
    }
  }

  getGeolocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(position)
        },
        (error) => {
          reject(console.log(error.code, error.message))
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    })
  }

  async requestLocationRuntimePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'ReactNativeCode Location Permission',
          'message': 'ReactNativeCode App needs access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getGeolocation()
          .then(position => {
            this.setState({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            })
          })
          .then(() => {
            this.props.getWeatherToday(this.state.lat, this.state.lon);
          });
      }
      else {
        Alert.alert("Location Permission Not Granted");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  onHandlerUpdateDate = () => {
    this.setState({ date: new Date() });
  }

  render() {
    const { weatherData, error, isLoading } = this.props;

    return (
      <SafeAreaView style={container}>
        {this.state.lat && this.state.lon 
          ? <View style={centered}>
            <View>
              {isLoading 
                ? <ActivityIndicator color={'black'} />
                : weatherData ? 
                    <View>
                      <Image style={{ height: 60, resizeMode: 'contain' }} source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} />
                      <Text h2 style={textCenter}>{ `${weatherData.name}, ${Math.floor(weatherData.main.temp)}°C` }</Text>
                      <Text h3 style={textCenter}>{`humidity: ${weatherData.main.humidity}%, `}{ weatherData.weather[0].description }</Text>
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
          </View> 
        : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'beige'
  },
  centered: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'azure'
  },
  textCenter: {
    textAlign: 'center'
  },
  mVertical: {
    marginVertical: 15
  }
});

const { container, textCenter, mVertical, centered } = styles;

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