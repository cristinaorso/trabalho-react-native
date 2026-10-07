import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api } from '../services/api';
import COLORS from '../constants/colors';
import formatPrice from '../utils/formatPrice';

// A API devolve as categorias em inglês, então traduzimos só para exibição.
// O valor original (slug) continua sendo usado nas requisições.
const CATEGORY_LABELS = {
  beauty: 'Beleza',
  fragrances: 'Fragrâncias',
  furniture: 'Móveis',
  groceries: 'Mercearia',
  'home-decoration': 'Decoração',
  'kitchen-accessories': 'Acessórios de cozinha',
  laptops: 'Notebooks',
  'mens-shirts': 'Camisas masculinas',
  'mens-shoes': 'Calçados masculinos',
  'mens-watches': 'Relógios masculinos',
  'mobile-accessories': 'Acessórios de celular',
  motorcycle: 'Motos',
  'skin-care': 'Cuidados com a pele',
  smartphones: 'Smartphones',
  'sports-accessories': 'Acessórios esportivos',
  sunglasses: 'Óculos de sol',
  tablets: 'Tablets',
  tops: 'Blusas',
  vehicle: 'Veículos',
  'womens-bags': 'Bolsas femininas',
  'womens-dresses': 'Vestidos',
  'womens-jewellery': 'Joias femininas',
  'womens-shoes': 'Calçados femininos',
  'womens-watches': 'Relógios femininos',
};

function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category.replace(/-/g, ' ');
}

function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadCategories() {
    try {
      const response = await api.get('/products/category-list');

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadProducts(category = '') {
    setLoading(true);
    setError('');

    try {
      let url = '/products?limit=0';

      if (category) {
        url = `/products/category/${category}`;
      }

      const response = await api.get(url);

      setProducts(response.data.products || []);
    } catch (error) {
      console.log(error);

      setError('Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts(selectedCategory);
  }, [selectedCategory]);


  function renderProduct({ item }) {
    return (
      <Pressable
        style={styles.productCard}
        onPress={() =>
          navigation.navigate('Detalhes', {
            productId: item.id,
          })
        }
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.productCategory}>
            {getCategoryLabel(item.category)}
          </Text>

          <Text style={styles.productPrice}>
            {formatPrice(item.price)}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.productsContainer}>
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categorias</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            <Pressable
              style={[
                styles.categoryButton,
                selectedCategory === '' && styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory('')}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === '' &&
                    styles.categoryButtonTextSelected,
                ]}
              >
                Todos
              </Text>
            </Pressable>

            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.categoryButtonSelected,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category &&
                      styles.categoryButtonTextSelected,
                  ]}
                >
                  {getCategoryLabel(category)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.wine} />

            <Text style={styles.loadingText}>
              Carregando produtos...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.primaryButtonSmall}
              onPress={() => loadProducts(selectedCategory)}
            >
              <Text style={styles.primaryButtonText}>
                TENTAR NOVAMENTE
              </Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderProduct}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            columnWrapperStyle={styles.columnWrapper}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Nenhum produto encontrado.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  productsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  categorySection: {
    paddingTop: 14,
    paddingBottom: 12,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },

  categoryScroll: {
    gap: 8,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },

  categoryButtonSelected: {
    backgroundColor: COLORS.wine,
    borderColor: COLORS.wine,
  },

  categoryButtonText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },

  categoryButtonTextSelected: {
    color: COLORS.white,
  },

  productList: {
    paddingBottom: 20,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48.5%',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.white,
  },

  productInfo: {
    padding: 12,
  },

  productTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    minHeight: 38,
  },

  productCategory: {
    color: COLORS.secondary,
    fontSize: 11,
    marginTop: 6,
    textTransform: 'capitalize',
  },

  productPrice: {
    color: COLORS.wine,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  loadingText: {
    color: COLORS.secondary,
    fontSize: 14,
    marginTop: 12,
  },

  errorText: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },

  primaryButtonSmall: {
    backgroundColor: COLORS.wine,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 15,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },

  emptyText: {
    color: COLORS.secondary,
    fontSize: 15,
  },
});

export default ProductsScreen;