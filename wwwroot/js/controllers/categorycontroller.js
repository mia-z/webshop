var clicky;
var filteredProducts = [];

$(document).ready(function () {
    $("#catprodBreadcrumb").html(localStorage.getItem("selectedCategory"));
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        setTimeout(() => { 
            //this is the only thing that made firefox work. 
            //ive spent literally 20+ hours trying to fix this stupid bullshit without
            //having to use a setTimeout to halt the page loading because
            //of the nature of how firefox works. if u find me with a bullet
            //in my head and no note this is the reason why. fuck firefox.
            //apparently this also happens in Safari, but not as often.
            addproducts();
            clicky = document.querySelectorAll(".prod-group");
            clicky.forEach(element => {
                element.addEventListener("click", function() {
                    selectedProduct(this);
                });
            });
        }, 400);
    }  else {
        //oh look no setTimeout and everything works perfectly
        //yes - even in Microsoft edge!
        addproducts();
        clicky = document.querySelectorAll(".prod-group");
        clicky.forEach(element => {
            element.addEventListener("click", function() {
                selectedProduct(this);
            });
        });
    }
});

function addproducts() {
    filteredProducts = db.filter(function (item) {
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