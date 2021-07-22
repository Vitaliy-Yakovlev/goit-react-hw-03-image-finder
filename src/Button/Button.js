import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

function Button() {
  return (
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        Search
      </span>
    </button>
  );
}

export default Button;
