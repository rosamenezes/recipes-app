import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';

function Profile() {
  const history = useHistory();

  const userEmail = JSON.parse(localStorage.getItem('user')) || '';

  function redirectDoneRecipes() {
    history.push('/done-recipes');
  }

  function redirectFavorite() {
    history.push('/favorite-recipes');
  }

  function redirectLogin() {
    history.push('/');
    localStorage.clear('profile-email');
  }

  return (
    <div>
      <Header />
      <div>Profile</div>

      <p data-testid="profile-email">{ userEmail.email}</p>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ redirectDoneRecipes }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ redirectFavorite }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ redirectLogin }
      >
        Logout
      </button>

    </div>
  );
}

export default Profile;
