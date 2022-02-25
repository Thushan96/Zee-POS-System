
function loadCustomerId(){
    $("#cmbCustomer").empty();
        var option = $('<option value="0">Select Customer ID</option>');
         $("#cmbCustomer").append(option);
    customerDB.forEach(function (e){
        $("#cmbCustomer").append($("<option></option>").attr("value",e).text(e.getCustomerId()));;
    });
}

$("#cmbCustomer").change(function (){
    var selectedId=$("#cmbCustomer option:selected").text();
    setCustomerData(selectedId);
});

function  setCustomerData(Cid){
    for (let c of customerDB) {
        if (c.getCustomerId()==Cid){
            $("#customer-name-order").val(c.getCustomerName());
        }
    }
}

function loadItemId(){
    $("#cmbItem").empty();
    var option = $('<option value="0">Select Item ID</option>');
    $("#cmbItem").append(option);
    itemDB.forEach(function (e){
        $("#cmbItem").append($("<option></option>").attr("value",e).text(e.getItemCode()));;
    });
}

$("#cmbItem").change(function (){
    var selectedId=$("#cmbItem option:selected").text();
    setItemData(selectedId);
});

function  setItemData(code){
    for (let i of itemDB) {
        if (i.getItemCode()==code){
            $("#item-name-order").val(i.getItemName());
            $("#qtyOnHand-order").val(i.getItemQuantity());
            $("#unit-price-order").val(i.getItemprice());
        }
    }

}

$(document).ready(function () {
    var d = new Date();
$("#order-date").val(d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate());
});

$("#add-order").click(function (){
    var orderQTY=$("#qty-order").val();

});