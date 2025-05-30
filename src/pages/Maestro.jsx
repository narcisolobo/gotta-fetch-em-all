import { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorAlert from '../components/ErrorAlert';
import Spinner from '../components/Spinner';
import LimitForm from '../components/LimitForm';
import PaginationButtons from '../components/PaginationButtons';
import PokeItem from '../components/PokeItem';

function Maestro() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOffset(0);
    setLimit(parseInt(e.target.elements.limit.value));
  };

  const handleClickPrevious = () =>
    setOffset((prev) => Math.max(prev - limit, 0));
  const handleClickNext = () => setOffset((prev) => prev + limit);

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
    <>
      <LimitForm handleSubmit={handleSubmit} limit={limit} loading={loading} />
      <div className="card shadow mb-3">
        <div className="card-header">
          <PaginationButtons
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            offset={offset}
            loading={loading}
            data={data}
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
    </>
  );
}

export default Maestro;
