var tbody, tfoot, rowtotal, currentKey;
var netTotal = 0;

var xyz;

$(document).ready(function () {
    checkoutPage = true;
    tbody = $(".checkout-table-body");
    tfoot = $("#net-total-number")[0];
    $("#modal-delete-item").on("click", function() {
        removeRow($("body").data("key"));
    });
    buildCartTable();
});

function buildCartTable() {
    $.each(cart, function (key, value) { 
        rowTotal = Number(value["amount"]) * Number(value["item"].price);
        netTotal += rowTotal;
        tbody.append("<tr id='checkout-table-row-" + key +"'>"+
        "<td>" + value["item"].name + "</td>" +
        "<td>" + value["item"].selectedColour + "</td>" +
        "<td>" + value["item"].price + ":-</td>" +
        "<td>" + "<input type='number' min='0' max='20' id='checkout-table-row-amount-" + key +"'>" + "</td>" +
        "<td id='checkout-table-row-net-" + key + "'>" + rowTotal + "</td>" +
        "</tr>");
        $("#checkout-table-row-amount-" + key)[0].value = value["amount"];
        $("#checkout-table-row-amount-" + key).on("change, keyup, input",
            function() {
                $("body").data("key", key);
                updateRow(key, this.value, value["item"].price);
            });
        });
    tfoot.innerText = netTotal;
}

function updateRow(key, newamt, priceper) {
    let na = Number(newamt);
    let oldnet = Number(tfoot.innerText) - Number($("#checkout-table-row-net-" + key)[0].innerText);
    if (na < 1) {
        $("#checkout-table-row-amount-" + key)[0].value = 1;
        $("#modal-confirmDelete").modal("show");
    } else {
        cart[key]["amount"] = newamt;
        let x = Number(newamt) * Number(priceper);
        $("#checkout-table-row-net-" + key)[0].innerText = x;
        localStorage.setItem("cartItems", JSON.stringify(cart));
        tfoot.innerText = Number(oldnet) + Number(x);
    }
}

function removeRow(key) {
    let newnet = Number(tfoot.innerText);
    newnet -= cart[key]["item"].price;
    tfoot.innerText = newnet;
    cart = cart.filter(function(item) {
        return item != cart[key];
    });
    localStorage.setItem("cartItems", JSON.stringify(cart));
    refreshCart();
    $("#checkout-table-row-" + key).remove();
}