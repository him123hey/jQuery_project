$(document).ready(function () {
    getApi();
    $("#thead").hide();
    // Check action on select option
    $('#recipes').on('change', function () {
        var id = $('#recipes').val();
        recipe(id);
        $("#thead").show();
    })

    // code for sum of guest
    $("#sum").on("click", function () {
        selectnewGuest($("#person").val());
    })

    // code for minus guest
    $("#minuse").on("click", function () {
        selectnewMinusGuest($("#person").val());
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
            footer(data.recipes);
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
    myData.forEach(element => {
        seleteValue(element);
    });
}

//get value put into select option
function seleteValue(value) {
    var getValue = "";
    getValue += `
    <option value="${value.id}">${value.name}</option>
    `
    printOut(getValue);
}

//function for output select
function printOut(out) {
    $('#recipes').append(out);
}

//fucntion check condition of selete from input
var quantity = [];
var firstGuest = 0;
function recipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            icon(item.iconUrl, item.name);
            getIngradient(item.ingredients);
            getInstructions(item.instructions);
            quantity = item.ingredients;
            firstGuest = item.nbGuests;
            selectnewGuest(item.nbGuests);
        }
    })
}

// function use to icon of food
function icon(img, name) {
    var result = "";
    result += `
    <img src="${img}" class="img-fluid img-thumbnail">
    <h2 class="text-center text-light">${name}</h2>
    `;
    $("#profile").html(result);
}

//function loop to get Ingradient
function getIngradient(ing) {
    var ingred = "";
    ing.forEach(item => {
        quan = item.quantity;
        ingred += `
        <tr>
            <td><img src="${item.iconUrl}" class="img-fluid rounded-circle" style="width:40px; height:40px;"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
        </tr>
    `;
    });
    $("#ing").html(ingred);
}

//function get instructions
function getInstructions(step) {
    var instruction = "";
    var steps = step.split("<step>");
    for (let i = 1; i < steps.length; i++) {
        instruction += `
           <h5 class="text-warning"> Instruction: ${i} </h5>
            <p class="text-light">${steps[i]}</p>
            `;
    }
    $("#instruction").html(instruction);
}

// function get new guest after sum
function selectnewGuest(guest) {
    var getNewGuest = parseInt(guest) + 1;
    if (getNewGuest <= 15) {
        $("#person").val(getNewGuest);
        calculateData($("#person").val());
    }
}

// function get new guest after mines
function selectnewMinusGuest(minusGuest) {
    var guestMinus = parseInt(minusGuest) - 1;
    if (guestMinus >= 1) {
        $("#person").val(guestMinus);
        calculateData($("#person").val());

    }
}

// function calculate new quantity
function calculateData(quan) {
    var newQuantity;
    var oldQuantity;
    var result = "";
    quantity.forEach(el => {
        oldQuantity = el.quantity / firstGuest;
        newQuantity = oldQuantity * quan;
        result += `
        <tr>
       
        <td><img src="${el.iconUrl}" style="width:40px; height:40px;" class="img-fluid rounded-circle"></td>
        <td id='quantity'>${newQuantity}</td>
        <td>${el.unit[0]}</td>
        <td>${el.name}</td>
        </tr>
        `;
        $("#ing").html(result);
    });
}
// get recipes for footer
function footer(getDatafooter) {
    var result = "";
    getDatafooter.forEach(el => {
        result += `
        <div class="col-lg-3 col-md-6 col-sm-12" >
            <div class="card">
                <div class="card-body">
                    <img src="${el.iconUrl}" class="img-fluid"style="width:380px; height:200px">
                </div>
                <div class="card-footer">
                    <h5>${el.name}</h5>
                </div>
            
            </div>
        </div>
    `;
        $("#footer").html(result);
    });
}