import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Hoy from '../screens/Hoy';
import Guias from '../screens/Guias';
import Pendientes from '../screens/Pendientes';
import Historial from '../screens/Historial';

//Screen names
const HoyName = "Hoy";
const GuiasName = "Guias";
const PendientesName = "Pendientes";
const HistorialName = "Historial";

const Tab = createBottomTabNavigator();

function BottonTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={HoyName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === HoyName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === GuiasName) {
              iconName = focused ? 'book-outline' : 'book-outline';

            } else if (rn === PendientesName) {
              iconName = focused ? 'document-text-outline' : 'document-text-outline';
              
            } else if (rn === HistorialName) {
              iconName = focused ? 'newspaper-outline' : 'newspaper-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { height: 95, backgroundColor:'black', borderRadius:15}
        }}>

        <Tab.Screen name={HoyName} component={Hoy} />
        <Tab.Screen name={GuiasName} component={Guias} />
        <Tab.Screen name={PendientesName} component={Pendientes} />
        <Tab.Screen name={HistorialName} component={Historial} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottonTabNavigator;