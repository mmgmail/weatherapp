import {
  createStackNavigator,
} from 'react-navigation';
import { HomeScreen } from 'AppScreens';

const TabNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: {
        title: 'Weather at your location',
      },
      params: { banner: 'Home Screen' },
      path: '/',
      screen: HomeScreen,
    }
  }
);

export {
  TabNavigator
}