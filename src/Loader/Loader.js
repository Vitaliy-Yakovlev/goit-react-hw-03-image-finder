import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

const Spinner = () => (
  <Loader
    type="Puff"
    color="#00BFFF"
    height={100}
    width={100}
    timeout={3000}
    className={s.spinnerStyle}
  />
);

export default Spinner;
