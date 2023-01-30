import { Link } from 'react-router-dom';
import drinksImg from '../images/drinkIcon.svg';
import mealsImg from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/drinks">
        <img
          src={ drinksImg }
          alt="icone drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealsImg }
          alt="icone meals"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
