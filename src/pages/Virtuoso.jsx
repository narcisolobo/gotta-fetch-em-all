import { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorAlert from '../components/ErrorAlert';
import Spinner from '../components/Spinner';
import LimitForm from '../components/LimitForm';
import PaginationButtons from '../components/PaginationButtons';
import PokeItemDetails from '../components/PokeItemDetails';

function Virtuoso() {
  const [data, setData] = useState(null);
  const [detailedData, setDetailedData] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const resultUrls = data?.results?.map((p) => p.url).join(',');
  const enrichedMap = new Map((detailedData || []).map((p) => [p.name, p]));

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
    // list useEffect
    let ignore = false;

    async function fetchPokemon() {
      setLoadingList(true);
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
          setLoadingList(false);
        }
      }
    }

    fetchPokemon();

    return () => {
      ignore = true;
    };
  }, [endpoint]);

  useEffect(() => {
    // Details useEffect
    if (!data?.results) return;

    let ignore = false;

    async function fetchDetails() {
      try {
        const detailedResults = await Promise.all(
          data.results.map(async (poke) => {
            const res = await axios.get(poke.url);
            return res.data;
          })
        );
        if (!ignore) setDetailedData(detailedResults);
      } catch (err) {
        if (!ignore) setError(err);
      }
    }

    fetchDetails();

    return () => {
      ignore = true;
    };
  }, [resultUrls]);

  if (error) return <ErrorAlert />;

  if (!data || loadingList) return <Spinner />;

  return (
    <>
      <LimitForm
        limit={limit}
        handleSubmit={handleSubmit}
        loadingList={loadingList}
      />
      <div className="card shadow mb-3">
        <div className="card-header">
          <PaginationButtons
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            offset={offset}
            loading={loadingList}
            data={data}
          />
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {data.results.map((poke) => (
              <PokeItemDetails
                poke={poke}
                key={poke.url}
                enrichedPoke={enrichedMap.get(poke.name)}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Virtuoso;
