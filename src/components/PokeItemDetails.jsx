import { Link } from 'react-router';
import PokeSprite from './PokeSprite';

function PlaceholderSprite() {
  return (
    <span className="placeholder-glow">
      <span className="placeholder w-100 h-100"></span>
    </span>
  );
}

function PlaceholderButton() {
  return (
    <span className="placeholder-glow">
      <button
        className="btn btn-primary disabled placeholder"
        aria-disabled="true"
        style={{ width: '12ch' }}></button>
    </span>
  );
}

function DetailsButton({ id, pokemon }) {
  return (
    <Link to={`/pokemon/${id}`} className="btn btn-primary" state={pokemon}>
      View Details
    </Link>
  );
}

function PokeItemDetails({ poke, enrichedPoke }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center gap-2">
      <div className="d-flex align-items-center gap-2">
        <div style={{ width: 96, height: 96 }}>
          {enrichedPoke ? (
            <PokeSprite pokemon={enrichedPoke} />
          ) : (
            <PlaceholderSprite />
          )}
        </div>
        <p className="lead mb-0">{poke.name}</p>
      </div>
      {enrichedPoke ? (
        <DetailsButton id={enrichedPoke.id} pokemon={{ enrichedPoke }} />
      ) : (
        <PlaceholderButton />
      )}
    </li>
  );
}

export default PokeItemDetails;
