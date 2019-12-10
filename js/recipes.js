$(document).ready(function () {
    getApi();
    $('#recipes').on('change', function () {
        var id = $('#recipes').val();
        recipe(id);
    })
})
//get API
var allData = [];
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => {
            getRecipes(data.recipes);
        },
        error: () => {
            console.log("error something");
        }
    })
}
// get url
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
//get recipes
function getRecipes(myData) {
    allData = myData;
    console.log(allData);
    myData.forEach(element => {
        seleteValue(element);
    });
}
//get value to seleted
function seleteValue(value) {
    var getValue = "";
    getValue += `
    <option value="${value.id}">${value.name}</option>
    `
    printOut(getValue);
}
// output select
function printOut(out) {
    $('#recipes').append(out);
}
// condition of selete
function recipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            icon(item.iconUrl, item.name);
            getIngradient(item.ingredients);
            getGuest(item.nbGuests);
            getInstructions(item);
        }
    })
}
// icon
function icon(img, name) {
    var result = "";
    console.log(img)
    result += `
    <img src="${img}" class="img-fluid">
    <h2>${name}</h2>
    `;
    $("#profile").html(result);
}
// get Ingradient
function getIngradient(ing) {
    var ingred = "";
    ing.forEach(item => {
        ingred += `
        <tr>
            <td><img src="${item.iconUrl}" class="img-fluid" style="width:80px;"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
        </tr>
    `;
    });
    $("#ing").html(ingred);
}
//get guest
function getGuest(guest) {
    var guest = $("#person").val(guest);
}
// get instructions
function getInstructions(instruc){
    var instruction = "";
    instruction +=`
        <p>${instruc.instructions}</p>
    `
    $('#instruction').html(instruction);
}

