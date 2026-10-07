// Descrições inventadas pelo grupo. {produto} e {categoria} são
// substituídos pelos dados reais de cada produto.
const DESCRIPTIONS = [
  "{produto} é uma ótima escolha na categoria {categoria}. Une qualidade e praticidade para o seu dia a dia.",
  "Com acabamento cuidadoso, {produto} chegou à GlowShop para quem busca o melhor em {categoria}.",
  "Um dos queridinhos da nossa loja: {produto}. Perfeito para quem gosta de {categoria} com estilo.",
  "{produto} foi pensado para quem valoriza conforto e durabilidade. Item de destaque em {categoria}.",
  "Aposte em {produto} e renove o seu visual. Uma opção moderna e acessível em {categoria}.",
  "Qualidade garantida: {produto} é ideal para presentear ou para você mesmo. Confira nossa seleção de {categoria}.",
];

export function getProductDescription(product) {
  const index = product.id % DESCRIPTIONS.length;
  const template = DESCRIPTIONS[index];

  return template
    .replace("{produto}", product.title)
    .replace("{categoria}", product.category);
}
