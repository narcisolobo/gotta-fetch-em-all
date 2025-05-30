function JMPaginationButtons({ handleClick, loading, data }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={() => handleClick(data.previous)}
        disabled={loading || data.previous === null}>
        Previous
      </button>
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={() => handleClick(data.next)}
        disabled={loading || data.next === null}>
        Next
      </button>
    </div>
  );
}

export default JMPaginationButtons;
