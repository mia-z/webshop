var clicky;

$(document).ready(function () {
    $("#catprodBreadcrumb").html(localStorage.getItem("selectedCategory"));
    addproducts();
        clicky = document.querySelectorAll(".prod-group");
        clicky.forEach(element => {
            element.addEventListener("click", function() {
                selectedProduct(this);
            });
        })
});

function addproducts() {
    var filteredProducts = db.filter(function (item) {
        return item.category == localStorage.getItem("selectedCategory");
    });
    filteredProducts.forEach(element => {
        $(".products-container").append(""+
        "<div class='prod-group'>" +
            "<a href='productpage.html'>"  +
            "<img class='prod-image figure-img' "   +
            "src='"+element.imageUrl+"' "   +
            "alt='"+element.name+"'>" +
            "</a>" +
            "<div class='prod-bottom'>" +
                "<a class='left-text' href='productpage.html'>" 
                + element.name + "</a>" +
                "<a class='right-text' href='productpage.html'>" 
                + element.price +":-"+ "</a>" +
            "</div>" +
        "</div>");
    });
}

function selectedProduct(x) {    
    localStorage.setItem("selectedProduct", x.children[1].children[0].text);
}