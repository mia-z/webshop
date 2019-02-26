var db = [];
var categorylist = [];
var colourlist = [];
var cart = JSON.parse(localStorage.getItem("cartItems"));
if (cart == undefined) { cart = []; localStorage.setItem("cartItems", JSON.stringify(cart)); }
var cartsum, cartcontent, cartbutton, cartclear;
/*
if (navigator.userAgent.indexOf("Firefox") != -1) {
    setInterval(function() {
        alert("DONT VIEW SITE IN FIREFOX\nUSE CHROME OR EDGE");
    }, 1);
}*/
   
$.getJSON("/webshop/wwwroot/data/products.json", function(data) { //initializes products from json file
    data.forEach(element => {
        let p = new Product(element.id, element.name, element.category, element.price, element.imageUrl, element.desc);
        p.setColours = element.colours;
        db.push(p);
    });
});

$.getJSON("/webshop/wwwroot/data/categories.json", function(data) { //initializes categories from json file
    data.forEach(element => {
        categorylist.push(element);
        $("#catDropDown").append("<a class='dropdown-item' href='category.html'>"+element+"</a>")
        $("#catDropDown").on("click", function() {
            selectedCat(event.target);
        });
    });
});

$.getJSON("/webshop/wwwroot/data/colours.json", function(data) { //initializes colours from json file
    data.forEach(element => {
        colourlist.push(element);
    });
});

$(document).ready(function () {
    $("#ifEmptyCart").hide();
    $("#hideable").hide();
    var clrcart = $("#clear-cart")[0];
    buildCart();
});

function selectedCat(x) {
    localStorage.setItem("selectedCategory", x.innerText);
    console.log(localStorage.getItem("selectedCategory"));
}

//CART MEMES ARE DOWN HERE HEHEHEH
function buildCart() {
    cartclear = $("#clear-cart");
    cartclear.on("click", function() {
        clearcart();
    });
    cartsum = $("#cartSum")[0];
    cartcontents = $("#dropdownMenuLink");
    cartcontents.on("click", function() {
        refreshCart();
    });
}

function refreshCart() {
    if (cart.length == 0) {
        $("#ifEmptyCart").show();
        $("#hideable").hide();
    } else {
        $("#ifEmptyCart").hide();
        $("#hideable").show();

        $(".cart-list").empty();
        showItems(cart, $(".cart-list"));
        cartsum.text = "Cart Sum: " + calcCartSum(cart) + ":-";
    }
}

function clearcart() {
    cart = []; 
    localStorage.setItem("cartItems", JSON.stringify(cart));
    refreshCart();
}

function showItems(range, element) {
    $.each(range, function(key, entry) {
        element.append(
        "<div class='prod-line' id='cart-prod-"+key+"'>" +
            "<a class='prod-line-anchor'" + 
            "href='productpage.html'>" +
            //text for anchor goes here
            entry["amount"] + " x " + entry["item"].selectedColour + " " + entry["item"].name +
            //text for anchor ends here
            " </a>" +
            "<div class='prod-line-button'><button class='btn btn-danger rounded-0' id='btn-cart-delete-"+key+"'>" +
            "X"  +
            "</button></div>" +
        "</div>");
        $("#cart-prod-"+key).on("click", function() {
            localStorage.setItem("selectedProduct", entry["item"].name);
        });
        $("#cart-prod-"+key).on("mouseleave", function() {
            $("#btn-cart-delete-"+key).hide();
        });
        $("#cart-prod-"+key).on("mouseenter", function() {
            $("#btn-cart-delete-"+key).show();
        });
        $("#btn-cart-delete-"+key).on("click", function() {
            deleteCartItem(cart[key]);
        });
    });
}

function deleteCartItem(x) {
    cart = cart.filter(function(item) {
        return item != x;
    });
    localStorage.setItem("cartItems", JSON.stringify(cart));
    refreshCart();
}

function calcCartSum(x) {
    let sum = 0;
    $.each(x, function(key, entry) {
        sum += Number(entry["item"].price) *  Number(entry["amount"]);
    });
    return sum;
}

//MISC FUNCTIONS
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
