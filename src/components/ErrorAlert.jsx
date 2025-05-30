import { useNavigate } from 'react-router';

const messages = [
  'Oops! Your Poké Ball missed. Try again!',
  'A wild error appeared!',
  'The server fainted! Please wait while we revive it.',
  'MissingNo. may be to blame...',
];

function ErrorAlert() {
  const navigate = useNavigate();
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <>
      <div className="alert alert-danger mb-3">
        <span>{message}</span>
      </div>
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </>
  );
}

export default ErrorAlert;
