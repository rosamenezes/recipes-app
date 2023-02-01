export default function useChecked() {
  const checkedMeal = (innerText, pathname2) => {
    let inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let lista = [];
    const ingNaStorage = inProgressRecipesStorage.meals[pathname2];
    if (ingNaStorage !== undefined) {
      lista = ingNaStorage.map((p) => {
        if (p.includes(innerText)
                  && p.split('$$$')[1] === undefined) {
          lista.push(`${p}$$$checked`);
        }
        if (p.includes(innerText)
                  && p.split('$$$')[1] === 'checked') {
          lista.push(p.split('$$$')[0]);
        }
        if (p.includes(innerText) === false) {
          lista.push(p);
        }
        return lista;
      });
      inProgressRecipesStorage = {
        drinks: {
          ...inProgressRecipesStorage.drinks,
        },
        meals: {
          ...inProgressRecipesStorage.meals,
          [pathname2]: lista[1],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesStorage));
    }
  };

  const checkedDrink = (innerText, pathname2) => {
    let inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let lista = [];
    const ingNaStorage = inProgressRecipesStorage.drinks[pathname2];
    if (ingNaStorage !== undefined) {
      lista = ingNaStorage.map((p) => {
        if (p.includes(innerText)
              && p.split('$$$')[1] === undefined) {
          lista.push(`${p}$$$checked`);
        }
        if (p.includes(innerText)
              && p.split('$$$')[1] === 'checked') {
          lista.push(p.split('$$$')[0]);
        }
        if (p.includes(innerText) === false) {
          lista.push(p);
        }
        return lista;
      });
      inProgressRecipesStorage = {
        drinks: {
          ...inProgressRecipesStorage.drinks,
          [pathname2]: lista[1],
        },
        meals: {
          ...inProgressRecipesStorage.meals,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesStorage));
    }
  };

  const validaFinishButton = (pathname1, pathname2) => {
    const inProgressRecipesStorage222 = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipesStorage222 === null) {
      return false;
    }
    if (pathname1 === 'drinks') {
      const lista = inProgressRecipesStorage222.drinks[pathname2];
      return lista.every((p) => p.includes('$$$checked'));
    }
    if (pathname1 === 'meals') {
      const lista = inProgressRecipesStorage222.meals[pathname2];
      return lista.every((p) => p.includes('$$$checked'));
    }
  };
  return {
    checkedMeal,
    checkedDrink,
    validaFinishButton,
  };
}
