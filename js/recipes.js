$(document).ready(function () {
    getApi();
    $('#recipes').on('change', function () {
        var id = $('#recipes').val();
        recipe(id);
    })
    $("#sum").on('click', function () {
        var person = $('#person').val();
        if (person < 15) {
            sumGuest(person);
        }
    })
    $('#minuse').on('click', function () {
        var person = $('#person').val();
        if (person > 1) {
            minuseGuest(person);
        }
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
            getInstructions(item.instructions);
        }
    })
}
// get Guest
function getGuest(p) {
    $('#person').val(p);
}
function sumGuest(newperson) {
    var newGuest = parseInt(newperson);
    newGuest += 1;
    $('#person').val(newGuest);

}
function minuseGuest(newperson) {
    var newGuest = parseInt(newperson);
    newGuest -= 1;
    $('#person').val(newGuest);
}
// icon
function icon(img, name) {
    var result = "";
    console.log(img)
    result += `
    <h2 class="text-center text-light">${name}</h2>
    <img src="${img}" class="img-fluid" style="width:1300px; height:350px;">
    `;
    $("#profile").html(result);
}
// get Ingradient
function getIngradient(ing) {
    var ingred = "";
    ing.forEach(item => {
        quan = item.quantity;
        console.log(quan);
        ingred += `
        <tr>
            <td><img src="${item.iconUrl}" class="img-fluid" style="width:80px;"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
        </tr>
    `;
    });
    $("#ing").html(ingred);
}
// get instructions
function getInstructions(step) {
    var instruction = "";
    var steps = step.split("<step>");
    for (let i = 1; i < steps.length; i++) {
        instruction += `
           <h5 class="text-primary"> Step ${i} </h5>
            <p class="text-light">${steps[i]}</p>
            `;
        }
    $("#instruction").html(instruction);
}
