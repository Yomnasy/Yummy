async function getCategory() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    console.log(data);
    category(data);
}
async function getdata(x) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${x}=list`);
    let data = await response.json();
    console.log(data);
    if (x == "i") {
        Ingredients(data);
    } else if (x == "a") {
        Area(data);
    }
}
let first = 1;
async function search(t, x) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${t}=${x}`);
    let data = await response.json();
    console.log(data);
    if (x == "" && first == 1) {
        HomePage(data);
        first = 0;
    } else {
        searchResult(data);

    }
}
function searchResult(data) {
    $("#container").removeClass("d-flex align-items-center");
    let cartona = ``;
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
        <div class="col-md-3 my-5">
        <div class="inner">
                <div class="cover">
                    <h4 class="ps-2">${data.meals[i].strMeal} </h4>
                </div>
                <img src=${data.meals[i].strMealThumb} alt="">
        </div>
    </div>
    `;
    }

    document.getElementById("inrow").innerHTML = cartona;
}
async function getOne(t, x) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${t}=${x}`);
    let data = await response.json();
    console.log(data);
    lists(data);
}
let boxColorWidth = $("#unFixed").width();
let flag = true;
function openClose() {
    if (flag == true) {
        $("#close").removeClass("fa-solid fa-bars");
        $("#close").addClass("fa-solid fa-xmark");
        $("#sideBar").animate({ left: 0 }, 500)
        $(".wow").addClass("bounceInUp");
        flag = false
    }
    else if (flag == false) {
        $("#close").removeClass("fa-solid fa-xmark");
        $(".wow").removeClass("bounceInUp");
        $("#close").addClass("fa-solid fa-bars");
        $("#sideBar").animate({ left: `-${boxColorWidth + 5}` }, 500)
        flag = true
    }
}
$("#close").click(() => {
    openClose();
})

function HomePage(data) {
    let cartona = ``;
    for (let i = 0; i < 20; i++) {
        cartona += `
            <div class="col-md-3 my-2">
                <div class="inner">
                        <div class="cover">
                            <h5 onClick="openDeta(${data.meals[i].idMeal})" class="ps-2">${data.meals[i].strMeal}</h5>
                        </div>
                        <img src=${data.meals[i].strMealThumb} alt="">
                </div>
            </div>
    `;
    }

    document.getElementById("row").innerHTML = cartona;
}

function getReady() {
    $(document).ready(() => {
        $("#spinner").fadeOut(2000, function () {
            $("body").css("overflow", "auto")
        })
    })
}

$(document).ready(() => {
    $("#spinner").fadeOut(1000, function () {
        $("body").css("overflow", "auto")
    })
    search("s", "", function () {

    });
})
new WOW().init();
$("#contact").click(() => {
    submit();
    openClose();
    $("#container").addClass("d-flex align-items-center");
    let cartona = ``;
    cartona += `
    <div class="col-md-6">
        <input id="inpName" class="form-control my-2" onkeyup="checkName(this)" type="text" placeholder="enter your Name">
        <input id="inpPhone" class="form-control my-2" onkeyup="checkPhone(this)" type="number" placeholder="enter your Phone">
        <input id="inpPassword" class="form-control my-2" type="password" placeholder="enter your Password">
    </div>
    <div class="col-md-6">
        <input id="inpEmail" class="form-control my-2" onkeyup="checkMail(this)" type="email" placeholder="enter your Email">
        <input id="inpEmail" class="form-control my-2" onkeyup="checkAge(this)" type="number" placeholder="enter your Age">
        <input id="inpRePassword" class="form-control my-2" type="password" placeholder="enter your Repassword">
    </div>
    <button id="bttn" class="btn btn-success disabled" onClick="submit()">submit</button>     
    `;
    document.getElementById("row").innerHTML = cartona;
})
$("#search").click(() => {
    openClose();
    $("#container").removeClass("d-flex align-items-center");
    let cartona = ``;
    cartona += `
    <div class="col-md-6">
        <input id="Name" class="form-control my-2 " onkeyup="searchName(this)" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input id="FName" class="form-control my-2 " onkeyup="searchFName(this)" type="text" placeholder="Search By First Letter">
    </div>
    </div>
    <div id="inrow" class="row">
    `;
    document.getElementById("row").innerHTML = cartona;
})
function category(data) {
    console.log(data.categories[0].strCategory);
    openClose();
    $("#container").removeClass("d-flex align-items-center");
    let cartona = ``;
    for (let i = 0; i < data.categories.length; i++) {
        cartona += `
        <div class="col-md-3 my-2">
            <div class="inner">
                <div class="cover text-center">
                    <div class="text-center w-100">
                        <h1 onClick="fire(this)" class="py-2">${data.categories[i].strCategory}</h1>
                        <p>${data.categories[i].strCategoryDescription.split(" ").slice(0, 16).join(" ")}</p>
                    </div>
                </div>
                <img src=${data.categories[i].strCategoryThumb} alt="">
            </div>
        </div>
        `;
    }
    document.getElementById("row").innerHTML = cartona;
}
$("#categories").click(() => {
    $("#spinner").css("display", "flex");
    getReady();
    getCategory();
})
$("#area").click(() => {
    $("#spinner").css("display", "flex");
    getReady();
    getdata("a");
})
$("#ingredients").click(() => {
    $("#spinner").css("display", "flex");
    getReady();
    getdata("i");
})
function Area(data) {
    console.log(data);
    openClose();
    $("#container").removeClass("d-flex align-items-center");
    let cartona = ``;
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
            <div class="col-md-3 my-2 text-center">
                <div class="inner">
                    <div class="text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 onClick="fire2(this)">${data.meals[i].strArea} </h3>
                    </div>
                </div>
            </div>
            `;
    }
    document.getElementById("row").innerHTML = cartona;
}
function Ingredients(data) {
    console.log(data);
    openClose();
    $("#container").removeClass("d-flex align-items-center");
    let cartona = ``;
    for (let i = 0; i < 20; i++) {
        cartona += `
        <div class="col-md-3 my-2 text-center">
            <div class="inner">
                <div class="text-white">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 onClick="fire3(this)">${data.meals[i].strIngredient} </h3>
                    <p>${data.meals[i].strDescription.split(" ").slice(0, 15).join(" ")}</p>
                </div>
            </div>
        </div>  
    `;
    }

    document.getElementById("row").innerHTML = cartona;
}
function searchName(e) {
    search("s", e.value);
};
function searchFName(e) {
    search("f", e.value);
};
var emailValid = /(^[a-zA-Z0-9]+)(@)([a-zA-Z0-9]+)(\.com)$/;
var nameValid = /^[a-zA-Z ]{3,}$/;
var phoneValid = /^01[0125][0-9]{8}$/;
var ageValid = /^(1[89]|[2-9]\d)$/;
var testName, testPhone, testMail, testAge;
function checkName(e) {
    testName = nameValid.test(e.value)
    submit()
    console.log("name  " + testName);
}
function checkPhone(e) {
    testPhone = phoneValid.test(e.value)
    submit()
    console.log("phone  " + testPhone);
}
function checkMail(e) {
    testMail = emailValid.test(e.value)
    submit()
    console.log("mail  " + testMail);
}
function checkAge(e) {
    testAge = ageValid.test(e.value)
    submit()
    console.log("age  " + testAge);
}
function submit() {
    if (testAge && testMail && testName && testPhone) {
        $("#bttn").removeClass("disabled");
    }
}

function lists(data) {
    let cartona = ``;
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
            <div class="col-md-3 my-2">
                <div class="inner">
                        <div class="cover">
                            <h4 onClick="openDeta(${data.meals[i].idMeal})" class="ps-2">${data.meals[i].strMeal}</h4>
                        </div>
                        <img src=${data.meals[i].strMealThumb} alt="">
                </div>
            </div>
    `;
    }
    document.getElementById("row").innerHTML = cartona;
}

function fire(e) {
    $("#spinner").css("display", "flex")
    getReady();
    console.log(e.innerHTML);
    getOne("c", e.innerHTML);
}
function fire2(e) {
    $("#spinner").css("display", "flex")
    getReady();
    console.log(e.innerHTML);
    getOne("a", e.innerHTML);
}
function fire3(e) {
    $("#spinner").css("display", "flex")
    getReady();
    console.log(e.innerHTML);
    getOne("i", e.innerHTML);
}

async function getDetails(idMeal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let data = await response.json();
    console.log(data);
    openDetails(data);
}

function openDetails(data) {
    let cartona = ``;
    cartona += `
        <div class="col-md-5 mt-2">
        <img class="imgBor" src=${data.meals[0].strMealThumb} alt="">
        <h4 class="py-2 text-white">${data.meals[0].strMeal}</h4>
    </div>
    <div class="col-md-7 text-white mt-2">
        <h3>Instructions</h3>
        <p>${data.meals[0].strInstructions}</p>
        <div>
            <h5 class="d-inline-block">Area : </h5>
            <p class="d-inline-block">${data.meals[0].strArea}</p>
        </div>
        <div>
            <h5 class="d-inline-block">Category : </h5>
            <p class="d-inline-block">${data.meals[0].strCategory}</p>
        </div>
        <h5 class="pb-3">Recipes :</h5>
        <div id="recip" class="row">
             
        </div>
        <h5 class="py-2">Tags : </h5>
        <span class="stew">${data.meals[0].strTags}</span>
        <div class="bton">
            <button class="btn btn-success"><a href=${data.meals[0].strSource} >Source</a></button>
            <button class="btn btn-danger text-white"><a href=${data.meals[0].strYoutube}>Youtube</a></button>
        </div>
    </div>
    `;
    document.getElementById("row").innerHTML = cartona;
    let cartona2 = ``;
    for (let z = 1; z <= 20; z++) {
        if (data.meals[0][`strMeasure${z}`] != " " && data.meals[0][`strMeasure${z}`] != null) {
            cartona2 += `
                <span class="recipe col-md-2 m-1">${data.meals[0][`strMeasure${z}`]} ${data.meals[0][`strIngredient${z}`]} </span> 
            `;
        }
        else {
            break;
        }
    }
    document.getElementById("recip").innerHTML = cartona2;
}

function openDeta(idMeal) {
    $("#spinner").css("display", "flex");
    getReady();
    console.log(idMeal);
    getDetails(idMeal);
}


