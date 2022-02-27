
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

function getOrderId(){
    if (orderDB.length==0){
        return "O-001";
    }else{
        var length=orderDB.length;
        length=length+1;
        if (length<=9){
            return "O-00"+length;
        }else if(length<=99){
            return "O-0"+length;
        }else{
            return "O-"+length;
        }
    }
}

function setOrderId(){
    $("#order-id").val(getOrderId());
}

$(document).ready(function () {
    setOrderId();
    var d = new Date();
$("#order-date").val(d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate());
});

$("#qty-order").on('keyup', function (){
    var resp=OrderformValid();
    if (resp){
        $("#add-order").attr('disabled',false);
    }else{
        $("#add-order").attr('disabled',true);
    }
});

let grandTotal,Total;
$("#add-order").click(function (){
    grandTotal=0;
    Total=0;
    var orderId=$("#order-id").val();
    var orderDate=$("#order-date").val();
    var CusId=$("#cmbCustomer option:selected").text();
    var CusName=$("#customer-name-order").val();
    var itemCode=$("#cmbItem option:selected").text();
    var orderQTY=$("#qty-order").val();
    var unitPrice=$("#unit-price-order").val();
    Total=orderQTY*unitPrice;
    grandTotal+=Total;

    var OrderObject=new OrderDTO(orderId,orderDate,CusId,CusName,itemCode,orderQTY,unitPrice,Total);
    var status=orderDB.push(OrderObject);

    if (status){
        alert("done")
    }else {
        alert("not done")
    }

    $("#TotalPrice").val(grandTotal);

    var OrderDetailsObject=new OrderDetailsDTO(orderId,grandTotal);
    orderDetailsDB.push(OrderDetailsObject);

    var itemName=$("#item-name-order").val();


    let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${orderQTY}</td><td>${unitPrice}</td><td>${Total}</td>
                <td><button id="btnItemCartDelete" type="button" class="btn-sm btn-danger">Delete</button>`;

    $("#place-order-Tbody").append(row);

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

