
import { Platform } from 'react-native';
import {
    createAppContainer,
    createStackNavigator,
} from 'react-navigation';
import { TabNavigator } from "./TabNavigator"

const AppNavigator = createAppContainer(
	createStackNavigator(
		{
			Index: {
				screen: TabNavigator,
			},
		},
		{
			headerMode: 'none',
			initialRouteName: 'Index',
			mode: Platform.OS === 'ios' ? 'modal' : 'card',
		}
	)
);

export { 
	AppNavigator 
}