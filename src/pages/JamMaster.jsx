import { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorAlert from '../components/ErrorAlert';
import Spinner from '../components/Spinner';
import JMPaginationButtons from '../components/JMPaginationButtons';

function JamMaster() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState(
    'https://pokeapi.co/api/v2/pokemon/?limit=20'
  );

  const handleClickPaginationButton = (url) => {
    setEndpoint(url);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [endpoint]);

  useEffect(() => {
    let ignore = false;

    async function fetchPokemon() {
      setLoading(true);
      try {
        const response = await axios.get(endpoint);

        if (!ignore) {
          setData(response.data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchPokemon();

    return () => {
      ignore = true;
    };
  }, [endpoint]);

  if (error) return <ErrorAlert />;

  if (!data || loading) return <Spinner />;

  return (
    <div className="card shadow">
      <div className="card-header">
        <JMPaginationButtons
          data={data}
          loading={loading}
          handleClick={handleClickPaginationButton}
        />
      </div>
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

export default JamMaster;
