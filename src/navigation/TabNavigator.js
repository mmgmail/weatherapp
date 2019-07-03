import {
  createStackNavigator,
} from 'react-navigation';
import { HomeScreen } from 'AppScreens';

const TabNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: {
        title: 'Home',
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