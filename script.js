const search=document.getElementById('search');
const submit=document.getElementById('submit');
const resultHeader=document.getElementsByClassName('result-header');
const mealsList=document.getElementById('meal');
const singleMeal=document.getElementById('detailed-result');


// event listeners
search.addEventListener('input', (e) => {
    e.preventDefault();
    singleMeal.innerHTML="";
    console.log(search.value);
    const term=search.value;
    if(term.trim()){
        fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
        ).then((res)=>res.json())
        .then((data)=>{
        resultHeader.innerHTML=`<h2>Search result for ${term}</h2>`;
        if(data.meals===null){
            resultHeader.innerHTML=`<h2>There are no result for ${term}</h2>`;
            console.log(resultHeader.innerHTML);
        }
        else{
            mealsList.innerHTML=data.meals.map(
                meal=>`
                
                <div class="meal-container">
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.searchValue}" >
                    <div class="meal-data" dataMeal-ID="${meal.idMeal}" >
                       <h3>${meal.strMeal}</h3>
                    </div>
                    <div class="btn">
                    <button class="details" data-meal-id="${meal.idMeal}" type="button">Details</button>
                    <button class="wishlist" id="wishlist" data-meal-name="${meal.strMeal}"  data-meal-id="${meal.idMeal}" type="button">WishList</button>
                    </div>  
                    
                    </div>
                    </div>
                `
            )
        }
    });

    }
    else{
        alert("Plaese enter the value in Searchbox")
    }
});
// mealsList.addEventListener('click',e=>{
//     // const mealInfo=e.composedPath.find(item=>{
//     //     if(item.classList){
//     //         return item.classList.contains("meal-info");
//     //     }
//     //     else{
//     //         return false;
//     //     }
//     // });
//     const mealInfo = e.composedPath().find(item => item.classList && item.classList.contains("meal-data") && item.classList.contains("details"));

//     if(mealInfo){
//         const mealID= mealInfo.getAttribute("data-meal-id");
//         getMealById(mealID);
//     }
// })
mealsList.addEventListener('click', event => {
    if (event.target.classList.contains('details')) {
        const mealID = event.target.getAttribute('data-meal-id');
        getMealById(mealID);
    }
});
function getMealById(mealID){
    fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    ).then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        const meal=data.meals[0];
        redirectToMealDetailsPage(meal,mealID);
    });
}
function redirectToMealDetailsPage(meal,mealID){
    window.location.href = `meal-details.html?mealID=${mealID}`;
}
const b=1;
// wishlist

// mealsList.addEventListener('click', event => {
//     if (event.target.classList.contains('wishlist')) {
//         const mealName = event.target.getAttribute('data-meal-name');
//         const mealID = event.target.getAttribute('data-meal-id');
//         // console.log(`Added "${mealName}" to wishlisted items`);
//         wishlisteddata(mealName,mealID);
//         alert(`Added "${mealName}" to wishlisted items`);
//         console.log(mealID);
//         console.log(mealName);
//     }
// });

const a=10;
// clicking on liked button

// const likedListButton=document.getElementById('wishlist-liked');

// function wishlisteddata(mealName,mealID){
//     console.log("hey");
//     likedListButton.addEventListener('click',event=>{
//         if(event.target.classList.contains('liked')){
//             console.log(mealID);
//             console.log(mealName);
//             redirectToWishlistDetailsPage(mealName,mealID);
//         }
//     })
// }
// function redirectToWishlistDetailsPage(mealName,mealID){
//     console.log(mealID);
//     console.log(mealName);
//     if (mealID && mealName) {
//         window.location.href = `wishlist-details.html?mealID=${mealID}&mealName=${mealName}`;
//     } else {
//         console.error("Meal ID or Meal Name is missing");
//     }
// }


// working func
// const likedListButton = document.getElementById('wishlist-liked');

// // Simulating an asynchronous function to fetch meal details
// function fetchMealDetails() {
//     return new Promise((resolve, reject) => {
//         // Assuming an API call or any asynchronous operation
//         // Replace this with your actual data retrieval logic
//         setTimeout(() => {
//             const mealName = "YourMealName";
//             const mealID = "YourMealID";
//             resolve({ mealName, mealID });
//         }, 1000); // Simulating a 1-second delay
//     });
// }

// function wishlisteddata(mealName, mealID) {
//     console.log("hey");
//     likedListButton.addEventListener('click', event => {
//         if (event.target.classList.contains('liked')) {
//             console.log(mealID);
//             console.log(mealName);
//             redirectToWishlistDetailsPage(mealName, mealID);
//         }
//     })
// }

// function redirectToWishlistDetailsPage(mealName, mealID) {
//     console.log(mealID);
//     console.log(mealName);
//     if (mealID && mealName) {
//         console.log("heyaaaa");
//         window.location.href = `wishlist-details.html?mealID=${mealID}&mealName=${mealName}`;
        
//     } else {
//         console.error("Meal ID or Meal Name is missing");
//     }
// }

// // Fetch meal details and then call wishlisteddata
// fetchMealDetails()
//     .then(({ mealName, mealID }) => {
//         wishlisteddata(mealName, mealID);
//     })
//     .catch(error => {
//         console.error("Error fetching meal details: ", error);
//     });

// woriking done

// 

// 123




// 123




mealsList.addEventListener('click', event => {
    if (event.target.classList.contains('wishlist')) {
        const mealName = event.target.getAttribute('data-meal-name');
        const mealID = event.target.getAttribute('data-meal-id');
        // console.log(`Added "${mealName}" to wishlisted items`);
        wishlisteddata(mealName,mealID);
        wishlist.push({ mealName, mealID });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`Added "${mealName}" to wishlisted items`);
    }
});
const likedListButton = document.getElementById('wishlist-liked');
        // const wishlist = []; 
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        console.log(wishlist);
        function wishlisteddata(mealName, mealID) {
            likedListButton.addEventListener('click', event => {
                if (event.target.classList.contains('liked')) {
                    redirectToLikedPage(mealID,mealName);
                    console.log(wishlist);
                }
            }); 
    
        }

        function redirectToLikedPage(mealID,mealName) {
            // Prepare the wishlisted items for display in the URL
            const wishlistedItems = wishlist.map(item => `${item.mealName}-${item.mealID}`).join(';');
            // window.open(`wishlist-details.html?wishlist=${wishlistedItems}`, '_blank');
            window.location.href = `wishlist-details.html?mealID=${mealID}&mealName=${mealName}&wishlist=${wishlistedItems}`;
           
        }
        // function redirectToLikedPage() {
        //     const wishlistedItems = wishlist.map(item => `${item.mealName}-${item.mealID}`).join(';');
        //     window.location.href = `wishlist-details.html?wishlist=${wishlistedItems}`;
        // }
        
