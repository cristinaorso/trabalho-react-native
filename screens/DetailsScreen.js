import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import api from '../services/api';
import COLORS from '../constants/colors';
import formatPrice from '../utils/formatPrice';

function DetailsScreen({ route }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProduct() {
    setLoading(true);
    setError('');

    try {
      const response = await api.get(
        `/products/${productId}`
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setError('Não foi possível carregar o produto.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={COLORS.wine}
          />

          <Text style={styles.loadingText}>
            Carregando detalhes...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>
            {error || 'Produto não encontrado.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailsContainer}
      >
        <View style={styles.detailsCard}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.detailsImage}
            resizeMode="contain"
          />

          <Text style={styles.detailsTitle}>
            {product.title}
          </Text>

          <View style={styles.detailsCategoryContainer}>
            <Text style={styles.detailsCategory}>
              {product.category}
            </Text>
          </View>

          <Text style={styles.detailsPrice}>
            {formatPrice(product.price)}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.detailsSectionTitle}>
            Descrição
          </Text>

          <Text style={styles.detailsDescription}>
            {product.description}
          </Text>

          <View style={styles.detailsExtra}>
            <View style={styles.extraItem}>
              <Text style={styles.extraLabel}>
                Avaliação
              </Text>

              <Text style={styles.extraValue}>
                {product.rating?.toFixed
                  ? product.rating.toFixed(1)
                  : product.rating || 'N/A'}
              </Text>
            </View>

            <View style={styles.extraItem}>
              <Text style={styles.extraLabel}>
                Estoque
              </Text>

              <Text style={styles.extraValue}>
                {product.stock}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    lineHeight: 20,
  },

  detailsContainer: {
    padding: 18,
  },

  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  detailsImage: {
    width: '100%',
    height: 280,
    marginBottom: 20,
  },

  detailsTitle: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 32,
  },

  detailsCategoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F4E8E4',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
  },

  detailsCategory: {
    color: COLORS.wine,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  detailsPrice: {
    color: COLORS.wine,
    fontSize: 25,
    fontWeight: '800',
    marginTop: 16,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 22,
  },

  detailsSectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },

  detailsDescription: {
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 24,
  },

  detailsExtra: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },

  extraItem: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 14,
  },

  extraLabel: {
    color: COLORS.secondary,
    fontSize: 12,
    marginBottom: 5,
  },

  extraValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default DetailsScreen;