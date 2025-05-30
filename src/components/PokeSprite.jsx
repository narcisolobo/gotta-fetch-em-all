import { getFallbackSprite } from '../data';

function PokeSprite({ pokemon }) {
  const spriteUrl = pokemon.sprites.front_default || getFallbackSprite();

  return (
    <img
      src={spriteUrl}
      className="img-fluid"
      alt={`${pokemon.name}'s sprite`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}

export default PokeSprite;
