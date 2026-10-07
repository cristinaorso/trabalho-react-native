import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/colors';

function InfoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoContainer}
      >
        <View style={styles.infoCard}>
          <Text style={styles.infoBrand}>
            PRODUCTS
          </Text>

          <Text style={styles.infoTitle}>
            Informações do Grupo
          </Text>

          <Text style={styles.infoDescription}>
            Aplicativo desenvolvido em React Native para
            consumo de API de produtos. O projeto apresenta
            autenticação, listagem de produtos, filtro por
            categoria e visualização detalhada de cada produto.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.infoSectionTitle}>
            Desenvolvedores
          </Text>

          <View style={styles.memberCard}>
            <Text style={styles.memberName}>
              Cristina Bisol Orso
            </Text>

            <Text style={styles.memberRA}>
              RA: 1139000
            </Text>
          </View>

          <View style={styles.memberCard}>
            <Text style={styles.memberName}>
              Rafaela Laimer Davesc
            </Text>

            <Text style={styles.memberRA}>
              RA: 1138820
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.infoSectionTitle}>
            Tecnologias utilizadas
          </Text>

          <Text style={styles.technology}>
            • React Native
          </Text>

          <Text style={styles.technology}>
            • Expo
          </Text>

          <Text style={styles.technology}>
            • Axios
          </Text>

          <Text style={styles.technology}>
            • React Navigation
          </Text>

          <Text style={styles.technology}>
            • DummyJSON API
          </Text>
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

  infoContainer: {
    padding: 18,
  },

  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  infoBrand: {
    color: COLORS.wine,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 12,
  },

  infoTitle: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 32,
  },

  infoDescription: {
    color: COLORS.secondary,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 16,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 22,
  },

  infoSectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },

  memberCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },

  memberName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },

  memberRA: {
    color: COLORS.secondary,
    fontSize: 14,
    marginTop: 5,
  },

  technology: {
    color: COLORS.secondary,
    fontSize: 15,
    marginBottom: 9,
  },
});

export default InfoScreen;