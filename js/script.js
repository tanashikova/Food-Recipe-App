const searchBtn = document.querySelector("#btn");
let results = document.querySelector(".search-result");
const watchVideoBtn = document.querySelector(".watch-video-btn");
const boxModel = document.querySelector(".content");
const closeBtn = document.querySelector(".close-btn");

searchBtn.addEventListener("click", (event) => {
  let search = document.querySelector("#search").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${search}`)
    .then((resData) => {
      return resData.json();
    })
    .then((parsedData) => {
      printResult(parsedData);
    })
    .catch((error) => {
      console.log("error!!!:", error);
    });
});

const printResult = (parsedData) => {
  let result = "";
  if (parsedData.meals) {
    parsedData.meals.forEach((meal) => {
      result += `<div class="item" data-id =${meal.idMeal} >
     
      <img src="${meal.strMealThumb}">
      <div class="title-container">
        <h1 class="title">${meal.strMeal}</h1>
        <button class="see-details-btn">See details</button>
     
    </div>
    </div>`;
    });
    results.classList.remove("noResults");
  } else {
    result = "Sorry, there is no meal for your search";
    results.classList.add("noResults");
  }

  results.innerHTML = result;
  results.parentElement.classList.add("display-search-result");
};

const fetchMealDetails = (e) => {
  e.preventDefault();
  let mealPrep = e.target.parentElement.parentElement;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealPrep.dataset.id}`
  )
    .then((response) => response.json())
    .then((data) => openBoxModel(data.meals));
};

const openBoxModel = (meal) => {
    let modalBoxUI = "";
  console.log(meal);
  meal = meal[0];
   modalBoxUI += `
        <ul class = "ingridiens">  Main Ingredients
            <li> ${meal.strIngredient1}</li> 
            <li> ${meal.strIngredient2}</li>
            <li> ${meal.strIngredient3}</li>
            <li> ${meal.strIngredient4}</li>
            <li> ${meal.strIngredient5}</li>
         </ul>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
 
    `;
  boxModel.innerHTML = modalBoxUI;
  boxModel.parentElement.classList.add("details");
};

results.addEventListener("click", fetchMealDetails);
closeBtn.addEventListener("click", () => {
  boxModel.parentElement.classList.remove("details");
});
