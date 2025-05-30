import { useLocation, useNavigate } from 'react-router';
import ErrorAlert from '../components/ErrorAlert';
import BaseStatsChart from '../components/BaseStatsChart';
import { capitalize } from '../utils/capitalize';

function PokemonDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { enrichedPoke: pokemon } = location.state || {};

  if (!pokemon) return <ErrorAlert />;

  const officialArtwork =
    pokemon.sprites.other['official-artwork'].front_default;
  const formattedId = `#${pokemon.id.toString().padStart(4, '0')}`;
  const heightInMeters = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;

  return (
    <div className="card shadow mb-3" style={{ maxWidth: 475 }}>
      {officialArtwork && (
        <img src={officialArtwork} alt={`${pokemon.name}: official artwork`} />
      )}
      <div className="card-body">
        <h1 className="card-title">
          <span className="text-muted me-2">{formattedId}</span>
          <span className="text-capitalize">{capitalize(pokemon.name)}</span>
        </h1>
        <h2 className="card-subtitle text-body-secondary mb-3">
          {pokemon.types.map((t) => t.type.name).join(' / ')}
        </h2>
        <p className="card-text mb-0">
          <strong>Height: </strong>
          <span>{heightInMeters} m</span>
        </p>
        <p className="card-text">
          <strong>Weight: </strong>
          <span>{weightInKg} kg</span>
        </p>
        <h3>Base Stats:</h3>
        <BaseStatsChart stats={pokemon.stats} />
      </div>
      <div className="card-footer text-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(-1)}>
          ← Back to list
        </button>
      </div>
    </div>
  );
}

export default PokemonDetails;
