const searchBtn = document.querySelector("#btn");
let results = document.querySelector(".search-result");
const boxModel = document.querySelector(".content");
const closeBtn = document.querySelector(".close-btn");

searchBtn.addEventListener("click", (event) => {
  let search = document.querySelector("#search").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${search}`)
    .then((resData) => resData.json())
    .then((parsedData) => printResult(parsedData))
    .catch((error) => console.log("error!!!:", error));
});

const printResult = (parsedData) => {
  let result = "";
  if (parsedData.meals) {
    parsedData.meals.forEach((meal) => {
      result += `<div class="card" data-id =${meal.idMeal} >
                 <img src="${meal.strMealThumb}">
                <div class="title-container">
                <h1 class="title">${meal.strMeal}</h1>
                 <button class="see-details-btn">See details</button>
                </div>
                </div>`;
    });
  } else {
    result = "Sorry, there is no meal for your search";
  }
    results.innerHTML = result;
  results.parentNode.classList.add("display-search-result");
};

results.addEventListener("click", (event) => {
  let mealDetails = event.target.parentNode.parentNode;
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDetails.dataset.id}`
  )
    .then((resData) => resData.json())
    .then((parsedData) => openBoxModel(parsedData.meals))
    .catch((error) => console.log("error!!!:", error));
});

const openBoxModel = (meal) => {
  let modalBoxUI = "";
  meal = meal[0];
  modalBoxUI += `
        <ul class = "ingridiens">  Main Ingredients
            <li> ${meal.strIngredient1}</li> 
            <li> ${meal.strIngredient2}</li>
            <li> ${meal.strIngredient3}</li>
            <li> ${meal.strIngredient4}</li>
            <li> ${meal.strIngredient5}</li>
         </ul>
        <div class = "link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
 
    `;
  boxModel.innerHTML = modalBoxUI;
  boxModel.parentNode.classList.add("details");
};

closeBtn.addEventListener("click", () =>
  boxModel.parentNode.classList.remove("details")
);
