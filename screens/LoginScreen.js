import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import api from '../services/api';
import COLORS from '../constants/colors';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError('Preencha usuário e senha.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Primeiro verifica se o usuário existe na API
      const usersResponse = await api.get('/users?limit=0');

      const users = usersResponse.data.users || [];

      const userExists = users.some(
        (user) =>
          user.username.toLowerCase() ===
            username.trim().toLowerCase() &&
          user.password === password
      );

      if (!userExists) {
        setError('Login inválido. Verifique usuário e senha.');
        return;
      }

      // Depois realiza a autenticação
      await api.post('/auth/login', {
        username: username.trim(),
        password: password,
        expiresInMins: 30,
      });

      navigation.replace('Produtos');
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError('Login inválido. Verifique usuário e senha.');
      } else {
        setError('Falha de rede. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loginContainer}>
        <View style={styles.loginCard}>
          <Text style={styles.brand}>PRODUCTS</Text>

          <Text style={styles.loginTitle}>Bem-Vindo</Text>

          <Text style={styles.loginSubtitle}>
            Entre para acessar nossa coleção de produtos.
          </Text>

          <Text style={styles.label}>Usuário</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu usuário"
            placeholderTextColor="#A69B96"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#A69B96"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <Pressable
            style={[
              styles.primaryButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.primaryButtonText}>
                ENTRAR
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  loginCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 4,
  },

  brand: {
    color: COLORS.wine,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 16,
  },

  loginTitle: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  loginSubtitle: {
    color: COLORS.secondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },

  label: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: '#FCFAF9',
    marginBottom: 18,
  },

  errorText: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },

  primaryButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.wine,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

export default LoginScreen;