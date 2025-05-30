import { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorAlert from '../components/ErrorAlert';
import Spinner from '../components/Spinner';

function BaseLevel() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchPokemon() {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/?limit=20'
        );

        if (!ignore) {
          setData(response.data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      }
    }

    fetchPokemon();

    return () => {
      ignore = true;
    };
  }, []);

  if (error) return <ErrorAlert />;

  if (!data) return <Spinner />;

  return (
    <div className="card shadow">
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {data.results.map((poke) => (
            <li key={poke.url} className="list-group-item">
              {poke.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BaseLevel;
