$(document).ready(function () {
    $("#recipes").on('change', function () {
        getValueSelect();
    })
})
//get value from input
function getValueSelect() {
    var recipes = $("#recipes").val();
    conditionSelection(recipes);
    console.log(recipes);
}
//get api
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getRecipe(data),
        error: () => getError(),
    })
}
// get url
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
// get error
function getError() {
    console.log("Have something error");
}
// Condition of selection
function conditionSelection(recipes) {
    if (recipes == 1) {
        getApi();
    } else {
        console.log("Hello number 2");
    }
}
//get recipes loop 
function getRecipe(mydata) {
    mydata.recipes.forEach(element => {
        profile(element);
        getIngredient(element.ingredients);
    });
}
// get profile
function profile(icon){
    if(icon.id == 0){
        
    }
}
// get ingradient
function getIngredient(ing) {
    ing.forEach(item => {
        computeHTML(item);
    });
}
function computeHTML(display) {
    var compute = "";
    compute += `
    <tr>
    <td><img src="${display.iconUrl}" width="100"></td>
    <td>${display.quantity}</td>
    <td>${display.unit[0]}</td>
    <td>${display.name}</td>
    </tr>
    `;
    printOut(compute);
}

function printOut(out) {
    $('#ingredient').append(out);
}