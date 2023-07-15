const loadCategories = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((categories) => displayCategories(categories.categories));
};

const displayCategories = (categories) => {
  const mealsCategories = document.getElementById("meals-categories-container");

  //   getting each category separetly
  for (const category of categories) {
    const mealCategory = document.createElement("div");
    mealCategory.classList.add("col");

    mealCategory.innerHTML = `
    <div class="card h-100">
              <img src="${
                category.strCategoryThumb
              }" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title text-danger">${category.strCategory}</h5>
                <p class="card-text">
                  ${category.strCategoryDescription.slice(0, 150)}
                </p>
                <button class="btn btn-primary" onclick= "mealDetails('${
                  category.strCategory
                }')">See All Foods</button>
              </div>
            </div>
    `;
    mealsCategories.appendChild(mealCategory);

    // console.log(category);
  }
};

const mealDetails = (meal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then((res) => res.json())
    .then((allMeals) => displayAllMeals(allMeals.meals));
};

const displayAllMeals = (meals) => {
  const mealsContainer = document.getElementById("meals-Details-container");
  mealsContainer.innerHTML = "";
  if (!meals) {
    return document.getElementById("msg").classList.remove("d-none");
  }
  meals.forEach((meal) => {
    // display none the warning
    document.getElementById("msg").classList.add("d-none");
    const singleMeal = document.createElement("div");
    singleMeal.classList.add("col");

    singleMeal.innerHTML = `
    <div class="card h-100">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title text-danger">${meal.strMeal}</h5>
      <p class="card-text">
        ${meal.strInstructions.slice(0, 150)}
      </p>
      <p>Best food in : ${meal.strArea}</p>
    </div>
  </div>

    `;
    mealsContainer.appendChild(singleMeal);
  });
};

// using button

document.getElementById("search").addEventListener("click", function () {
  const userinput = document.getElementById("user-search");
  const searchedFood = userinput.value;
  mealDetails(searchedFood);
  userinput.value = "";
  //   console.log(searchedFood);
});

loadCategories();
