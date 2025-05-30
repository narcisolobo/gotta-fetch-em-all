function PaginationButtons({
  data,
  offset,
  loading,
  onClickNext,
  onClickPrevious,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <button
        type="button"
        aria-label="Previous page"
        onClick={onClickPrevious}
        className="btn btn-sm btn-primary"
        disabled={offset === 0 || loading}>
        Previous
      </button>
      <button
        type="button"
        aria-label="Next page"
        onClick={onClickNext}
        className="btn btn-sm btn-primary"
        disabled={loading || data.next === null}>
        Next
      </button>
    </div>
  );
}

export default PaginationButtons;
