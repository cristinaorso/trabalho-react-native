import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const API_URL = 'https://dummyjson.com';

const COLORS = {
  background: '#F8F4F1',
  wine: '#8C3A50',
  wineDark: '#702D40',
  nude: '#D8B6A5',
  text: '#332C29',
  secondary: '#756B66',
  white: '#FFFFFF',
  border: '#E4DAD4',
  error: '#B3261E',
};

function formatPrice(price) {
  return Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/* =========================
   TELA DE LOGIN
========================= */

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Preencha o usuário e a senha.');
      return;
    }

    try {
      setLoading(true);

      // Primeiro verifica os usuários disponíveis na API
      const usersResponse = await axios.get(
        `${API_URL}/users?limit=0`
      );

      const users = usersResponse.data.users || [];

      const userExists = users.some(
        (user) =>
          user.username.toLowerCase() === username.trim().toLowerCase() &&
          user.password === password
      );

      if (!userExists) {
        setError('Login inválido. Verifique usuário e senha.');
        return;
      }

      // Depois realiza a autenticação
      await axios.post(`${API_URL}/auth/login`, {
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
    <SafeAreaView style={styles.loginContainer}>
      <ScrollView
        contentContainerStyle={styles.loginContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.loginCard}>
          <Text style={styles.logoText}>PRODUCTS</Text>

          <Text style={styles.loginTitle}>Bem-vindo</Text>

          <Text style={styles.loginSubtitle}>
            Entre para acessar nossa coleção de produtos.
          </Text>

          <Text style={styles.inputLabel}>Usuário</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu usuário"
            placeholderTextColor="#A69A94"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Senha</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#A69A94"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.loginButtonText}>ENTRAR</Text>
            )}
          </Pressable>

          <View style={styles.loginHint}>
            <Text style={styles.hintTitle}>Usuário de teste</Text>
            <Text style={styles.hintText}>
              Usuário: emilys
            </Text>
            <Text style={styles.hintText}>
              Senha: emilyspass
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   TELA DE PRODUTOS
========================= */

function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    { label: 'Todos', value: '' },
    { label: 'Beleza', value: 'beauty' },
    { label: 'Cuidados', value: 'skin-care' },
    { label: 'Perfumes', value: 'fragrances' },
    { label: 'Móveis', value: 'furniture' },
    { label: 'Eletrônicos', value: 'smartphones' },
    { label: 'Roupas', value: 'mens-shirts' },
  ];

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  async function loadProducts() {
    try {
      setLoading(true);
      setError('');

      let response;

      if (selectedCategory === '') {
        response = await axios.get(`${API_URL}/products?limit=0`);
      } else {
        response = await axios.get(
          `${API_URL}/products/category/${selectedCategory}`
        );
      }

      setProducts(response.data.products || []);
    } catch (error) {
      console.log(error);
      setError('Não foi possível carregar os produtos.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    navigation.replace('Login');
  }

  function renderProduct({ item }) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.productCard,
          pressed && styles.cardPressed,
        ]}
        onPress={() =>
          navigation.navigate('Detalhes', {
            productId: item.id,
          })
        }
      >
        <Image
          source={{ uri: item.thumbnail || item.images?.[0] }}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>
            {item.category}
          </Text>

          <Text
            style={styles.productTitle}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text style={styles.productPrice}>
            {formatPrice(item.price)}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Produtos</Text>

        <Text style={styles.pageSubtitle}>
          Explore nossa coleção
        </Text>
      </View>

      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>
          Categorias
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const active =
              selectedCategory === category.value;

            return (
              <Pressable
                key={category.value || 'all'}
                style={[
                  styles.categoryButton,
                  active && styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setSelectedCategory(category.value)
                }
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={COLORS.wine}
          />

          <Text style={styles.loadingText}>
            Carregando produtos...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>

          <Pressable
            style={styles.retryButton}
            onPress={loadProducts}
          >
            <Text style={styles.retryText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.productRow}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhum produto encontrado.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

/* =========================
   TELA DE DETALHES
========================= */

function DetailsScreen({ route }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProduct();
  }, [productId]);

  async function loadProduct() {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(
        `${API_URL}/products/${productId}`
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setError('Não foi possível carregar o produto.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator
          size="large"
          color={COLORS.wine}
        />

        <Text style={styles.loadingText}>
          Carregando detalhes...
        </Text>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error || 'Produto não encontrado.'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.detailsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailsImageContainer}>
          <Image
            source={{
              uri: product.images?.[0] || product.thumbnail,
            }}
            style={styles.detailsImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.detailsCategory}>
          {product.category}
        </Text>

        <Text style={styles.detailsTitle}>
          {product.title}
        </Text>

        <Text style={styles.detailsPrice}>
          {formatPrice(product.price)}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.descriptionTitle}>
          Descrição
        </Text>

        <Text style={styles.descriptionText}>
          {product.description}
        </Text>

        <View style={styles.extraInfo}>
          <View>
            <Text style={styles.extraLabel}>Avaliação</Text>
            <Text style={styles.extraValue}>
              {product.rating?.toFixed(1) || 'N/A'}
            </Text>
          </View>

          <View>
            <Text style={styles.extraLabel}>Estoque</Text>
            <Text style={styles.extraValue}>
              {product.stock ?? 'N/A'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   INFORMAÇÕES DO GRUPO
========================= */

function InfoScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.infoContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.infoMainTitle}>
          Informações do Grupo
        </Text>

        <Text style={styles.infoDescription}>
          Aplicativo desenvolvido em React Native com Expo
          para consumo de API REST. O aplicativo permite
          autenticação de usuários, consulta de produtos,
          filtragem por categoria e visualização dos detalhes
          de cada produto.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>
            Desenvolvedores
          </Text>

          <View style={styles.member}>
            <Text style={styles.memberName}>
              Cristina Bisol Orso
            </Text>

            <Text style={styles.memberRA}>
              RA: 1139000
            </Text>
          </View>

          <View style={styles.member}>
            <Text style={styles.memberName}>
              Rafaela Laimer Davesc
            </Text>

            <Text style={styles.memberRA}>
              RA: 1138820
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>
            Tecnologias utilizadas
          </Text>

          <Text style={styles.techItem}>
            • React Native
          </Text>

          <Text style={styles.techItem}>
            • Expo
          </Text>

          <Text style={styles.techItem}>
            • JavaScript
          </Text>

          <Text style={styles.techItem}>
            • Axios
          </Text>

          <Text style={styles.techItem}>
            • React Navigation
          </Text>

          <Text style={styles.techItem}>
            • DummyJSON API
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   APLICAÇÃO
========================= */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.wine,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 19,
          },
          headerTitleAlign: 'center',
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
                onPress={() =>
                  navigation.navigate('Informações')
                }
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

/* =========================
   ESTILOS
========================= */

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loginContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  loginCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 28,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },

  logoText: {
    color: COLORS.wine,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 14,
  },

  loginTitle: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '700',
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

  inputLabel: {
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
    backgroundColor: '#FCFAF8',
    marginBottom: 18,
  },

  errorText: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },

  loginButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.wine,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  loginButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  loginHint: {
    backgroundColor: '#F5ECE8',
    borderRadius: 10,
    padding: 14,
    marginTop: 22,
  },

  hintTitle: {
    color: COLORS.wine,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 5,
  },

  hintText: {
    color: COLORS.secondary,
    fontSize: 13,
    lineHeight: 20,
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  pageTitle: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
  },

  pageSubtitle: {
    color: COLORS.secondary,
    fontSize: 14,
    marginTop: 4,
  },

  categorySection: {
    paddingTop: 8,
    paddingBottom: 12,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  categoryList: {
    paddingHorizontal: 20,
    gap: 8,
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },

  categoryButtonActive: {
    backgroundColor: COLORS.wine,
    borderColor: COLORS.wine,
  },

  categoryText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: '600',
  },

  categoryTextActive: {
    color: COLORS.white,
  },

  productList: {
    paddingHorizontal: 14,
    paddingBottom: 25,
  },

  productRow: {
    justifyContent: 'space-between',
  },

  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    width: '48%',
    marginBottom: 14,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  cardPressed: {
    opacity: 0.8,
  },

  productImage: {
    width: '100%',
    height: 145,
    backgroundColor: '#FCFAF8',
  },

  productInfo: {
    padding: 12,
  },

  productCategory: {
    color: COLORS.wine,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },

  productTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    minHeight: 38,
  },

  productPrice: {
    color: COLORS.wine,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: COLORS.background,
  },

  loadingText: {
    color: COLORS.secondary,
    fontSize: 14,
    marginTop: 12,
  },

  retryButton: {
    backgroundColor: COLORS.wine,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 8,
    marginTop: 12,
  },

  retryText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },

  emptyText: {
    color: COLORS.secondary,
    fontSize: 15,
  },

  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  headerButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },

  detailsContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  detailsImageContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  detailsImage: {
    width: '85%',
    height: '85%',
  },

  detailsCategory: {
    color: COLORS.wine,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 7,
  },

  detailsTitle: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 33,
  },

  detailsPrice: {
    color: COLORS.wine,
    fontSize: 23,
    fontWeight: '800',
    marginTop: 12,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 22,
  },

  descriptionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  descriptionText: {
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 24,
  },

  extraInfo: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 25,
    padding: 18,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },

  extraLabel: {
    color: COLORS.secondary,
    fontSize: 12,
    marginBottom: 4,
  },

  extraValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },

  infoContainer: {
    padding: 22,
    paddingBottom: 40,
  },

  infoMainTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 14,
  },

  infoDescription: {
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },

  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  infoCardTitle: {
    color: COLORS.wine,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 15,
  },

  member: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 13,
    marginTop: 8,
  },

  memberName: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },

  memberRA: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 4,
  },

  techItem: {
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 25,
  },
});