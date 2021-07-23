import Loader from 'react-loader-spinner';

const Spinner = () => (
  <Loader
    type="Puff"
    color="#00BFFF"
    height={100}
    width={100}
    timeout={3000}
    className="spinnerStyle"
  />
);

export default Spinner;
