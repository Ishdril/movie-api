import MovieDbLogo from '../../assets/movieDBlogo.svg';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles['footer']}>
      <div className={styles['footer__tmdb']}>
        <p>This app is powered by:</p>
        <img src={MovieDbLogo} alt="The Movie DB" />
      </div>
      <div className={styles['footer__copyright']}>
        <p>&#169;Bernat Duran | 2021</p>
      </div>
    </div>
  );
};

export default Footer;
