function LimitForm({ handleSubmit, limit, loading }) {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="mb-3">
      <div className="card bg-body-tertiary shadow">
        <div className="card-body">
          <label htmlFor="limit" className="visually-hidden">
            Results per page:
          </label>
          <div className="input-group">
            <span className="input-group-text" id="limit-label">
              Results per page:
            </span>
            <input
              type="number"
              min={1}
              max={100}
              name="limit"
              id="limit"
              className="form-control"
              defaultValue={limit}
              aria-describedby="limit-label"
            />
            <button
              type="submit"
              className="btn btn-sm btn-outline-secondary"
              disabled={loading}>
              Set
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LimitForm;
