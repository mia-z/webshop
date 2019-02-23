var spo; //selected product object
var pname, pprice, pdesc;
var quantityChangers;
var quant = 0;

$(document).ready(function () {
    $("#catprodBreadcrumb").html(localStorage.getItem("selectedCategory")+ " - " +
    localStorage.getItem("selectedProduct"));
    spo = db.find(x => x.name == localStorage.getItem("selectedProduct"));
    //$("#product-image").attr("src", spo.imageUrl); //idk why this doesnt work lol

    $(".left").append("<img class='page-image' src='"+spo.imageUrl+"'>") //but this does?
    $("#colour-select").append("<option selected='true' disabled>Choose Colour</option>");
    
    buildQuantitySelector();
    buildDropDown(spo.colours);
    buildInfo(spo);
    buildButtonFunction();
    buildPopovers();
});

function buildDropDown(x) {
    $.each(x, function(key, entry) {
        $("#colour-select").append($("<option></option>")
            .attr("value", entry).text(entry));
    });
}

function buildInfo(a) {
    pname = $("#product-name")[0].innerText = a.name;
    pprice = $("#product-price")[0].innerText = a.price;
    pdesc = $("#product-desc")[0].innerText = a.desc;
}

function buildQuantitySelector() {
    quantityChangers = document.querySelectorAll(".quant-changer");
    quantityChangers.forEach(element => {
        element.addEventListener("click", function() {
            incdec(this);
        });
    });
}

function buildButtonFunction() {
    $("#btn-add-to-cart")[0].addEventListener("click", function() {
        addToCartAndValidate();
    });
}

function buildPopovers() {
    $("#btn-add-to-cart").popover({
        placement: "bottom",
        content: "Make sure you have selected a quantity and colour!",
        trigger: "manual"
    });

    $(".cart-button-dropdown").popover({
        placement: "bottom",
        content: "Added to cart!",
        trigger: "manual"
    });
}

function addToCartAndValidate() {
    if ($("#quantity-select")[0].value > 0 
    && $("#colour-select")[0].value != "Choose Colour") {
        spo.selectedColour = $("#colour-select")[0].value;
        cart.push(
            {
                amount: $("#quantity-select")[0].value,
                item: spo
            }
        );
        localStorage.setItem("cartItems", JSON.stringify(cart));
        $(".cart-button-dropdown").popover("show");
        setTimeout(() => {
            $(".cart-button-dropdown").popover("hide");
        }, 2000);
    } else {
        $("#btn-add-to-cart").popover("show");
        setTimeout(() => {
            $("#btn-add-to-cart").popover("hide");
        }, 2000);
    }
}

function incdec(x) {
    if (x.id == "increment" && quant <= 9) {
        quant++;
        $("#quantity-select")[0].value = quant;
        return;
    } else if (quant > 9) {
        //MEMES
    }

    if (x.id == "decrement" && quant >= 1) {
        quant--;
        $("#quantity-select")[0].value = quant;
        return;
    } else if (quant < 1) {
        //MEMES V2
    }
}