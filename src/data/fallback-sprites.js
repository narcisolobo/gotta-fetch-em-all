export const fallbackSprites = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', // Pikachu
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', // Bulbasaur
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', // Charmander
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', // Squirtle
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png', // Jigglypuff
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png', // Meowth
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png', // Eevee
];

export const getFallbackSprite = () => {
  const randomIndex = Math.floor(Math.random() * fallbackSprites.length);
  return fallbackSprites[randomIndex];
};
