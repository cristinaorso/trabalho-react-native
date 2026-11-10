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

export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category.replace(/-/g, ' ');
}

export default getCategoryLabel;
