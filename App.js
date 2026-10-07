import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import DetailsScreen from './screens/DetailsScreen';
import InfoScreen from './screens/InfoScreen';

import COLORS from './constants/colors';

const Stack = createNativeStackNavigator();

export function App() {
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
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: COLORS.background,
          },
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
            title: 'Produtos',

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
                  Informações
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

