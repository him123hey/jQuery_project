$(document).ready(function () {
    getApi();
    getValueSelect();
})
//get API
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => {
            getRecipes(data);
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
    myData.recipes.forEach(element => {
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
//get value from select
function getValueSelect(){
    $('#recipes').on('change', function(){
        var recipes = $('#recipes').val();
        recipe(recipes);
    })
}
// condition of selete
function recipe(data){
    switch(data){
        case '1':
        console.log("id = 1");
        break; 
    }
}