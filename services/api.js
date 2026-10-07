import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import DetailsScreen from './screens/DetailsScreen';
import InfoScreen from './screens/InfoScreen';

import COLORS from './constants/colors';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: '800',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Produtos"
          component={ProductsScreen}
          options={({ navigation }) => ({
            title: 'Products',

            headerLeft: () => (
              <Pressable
                onPress={() => navigation.replace('Login')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>
                  Sair
                </Text>
              </Pressable>
            ),

            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Informações')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>
                  Info
                </Text>
              </Pressable>
            ),
          })}
        />

        <Stack.Screen
          name="Detalhes"
          component={DetailsScreen}
          options={{
            title: 'Detalhes do Produto',
          }}
        />

        <Stack.Screen
          name="Informações"
          component={InfoScreen}
          options={{
            title: 'Informações do Grupo',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  headerButtonText: {
    color: COLORS.wine,
    fontSize: 14,
    fontWeight: '800',
  },
});

export default App;