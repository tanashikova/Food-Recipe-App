const searchBtn = document.querySelector("#btn");
let results = document.querySelector(".search-result");



searchBtn.addEventListener("click", (event) => {
  let search = document.querySelector("#search").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${search}`)
    .then((resData) => {
      return resData.json();
    })
    .then((parsedData) => {
      console.log(parsedData);
      printResult(parsedData);
    })
    .catch((error) => {
      console.log("error!!!:", error);
    });
});
const printResult = (parsedData) => {
  let result = "";
  if (parsedData.meals)
    parsedData.meals.forEach((meal) => {
      result += `<div class="item" data-id =${meal.idMeal} >
     
      <img src="${meal.strMealThumb}">
      <div class="title-container">
        <h1 class="title">${meal.strMeal}</h1>
     <button class="seeDetails"> See details </button>
  
    </div>
    </div>`;
    });
  else {
    result = "Sorry, there is no meal for your search";
  }
  results.innerHTML = result;
};
