
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

$("#qty-order").on('keyup', function (){
    var resp=OrderformValid();
    alert(resp);
    if (resp){
        $("#add-order").attr('disabled',false);
    }else{
        $("#add-order").attr('disabled',true);
    }
});


$("#add-order").click(function (){
    var orderQTY=$("#qty-order").val();
});


// VALIDATIONS

const cusQtyRegEx = /^[0-9]{1,3}$/;



function OrderformValid() {
    var cusID=$("#customer-name-order").val();
    if (cusNameRegEx.test(cusID)) {
        var itemName=$("#item-name-order").val();
        if(itemNameRegEx.test(itemName)){
            var itemPrice=$("#unit-price-order").val();
            if (itemPriceRegEx.test(itemPrice)){
                var QtyOnHand=$("#qtyOnHand-order").val();
                if (itemQtyRegEx.test(QtyOnHand)){
                    var reqQty=$("#qty-order").val();
                    var status=cusQtyRegEx.test(reqQty);
                    if (status){
                        $("#qty-order").css('border', '2px solid blue');
                        $("#lblReqQty").text("");
                        return true;
                    }else{
                        $("#qty-order").css('border', '2px solid red');
                        $("#lblReqQty").text("Order Quantity is a required field : maximum 3 digits");
                        return false;
                    }

                }else{
                    return false;
                }

            }else{
                return false;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }

}

function formValid() {
    var cusID = $("#customer-id").val();
    $("#customer-id").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#customer-name").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customer-name").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#customer-address").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusMobile = $("#customer-mobile").val();
                var resp = cusMobileRegEx.test(cusMobile);
                $("#customer-address").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#customer-mobile").css('border', '2px solid green');
                    $("#lblcusCno").text("");
                    return true;
                } else {
                    $("#customer-mobile").css('border', '2px solid red');
                    $("#lblcusCno").text("Customer Mobile No is a required field : 10 digits");
                    return false;
                }
            } else {
                $("#customer-address").css('border', '2px solid red');
                $("#lblcusaddress").text("Customer Address  is a required field : Minimum 7");
                return false;
            }
        } else {
            $("#customer-name").css('border', '2px solid red');
            $("#lblcusname").text("Customer Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#customer-id").css('border', '2px solid red');
        $("#lblcusid").text("Customer ID is a required field : Pattern C00-000");
        return false;
    }
}
