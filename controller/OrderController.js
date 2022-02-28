
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

let grandTotal,Total,orderQTY;
$("#add-order").click(function (){
    grandTotal=0;
    Total=0;
    orderQTY=0;
    var orderId=$("#order-id").val();
    var orderDate=$("#order-date").val();
    var CusId=$("#cmbCustomer option:selected").text();
    var CusName=$("#customer-name-order").val();
    var itemCode=$("#cmbItem option:selected").text();
    var ItemName=$("#item-name-order").val();
    orderQTY= parseInt($("#qty-order").val());
    var unitPrice=$("#unit-price-order").val();
    Total=orderQTY*unitPrice;
    grandTotal+=Total;

    var status;
    var OrderObject=new OrderDTO(orderId,orderDate,CusId,CusName,itemCode,ItemName,orderQTY,unitPrice,Total);

    if (orderDB.length==0){
        status=orderDB.push(OrderObject);
        loadDataToOrderTable();
        alert("empty")
    }else{
        // for (let ob of orderDB) {
        //     alert("checked");
        //     alert(itemCode);
        //     alert(ob.getOrderItemCode());
        //     alert(orderId);
        //     alert(ob.getOrderId());
        //     if (ob.getOrderItemCode()==itemCode && ob.getOrderId()==orderId){
        //         orderQTY=orderQTY+ob.getOrderedQty();
        //         ob.setOrderedQty(orderQTY);
        //         ob.setTotal(Number(ob.getTotal())+Total);
        //         loadDataToOrderTable();
        //         alert("if");
        //         return;
        //         status=true;
        //     }else{
        //         status=orderDB.push(OrderObject);
        //         loadDataToOrderTable();
        //         alert("else");
        //         return;
        //     }
        //     ob++;
        //
        // }
        for (let i = 0; i < orderDB.length; i++) {
            alert(itemCode);
            alert(orderDB[i].getOrderItemCode());
            if (orderDB[i].getOrderItemCode()==itemCode && orderDB[i].getOrderId()==orderId){
                alert("checked");
                orderQTY=orderQTY+orderDB[i].getOrderedQty();
                orderDB[i].setOrderedQty(orderQTY);
                orderDB[i].setTotal(Number(orderDB[i].getTotal())+Total);
                loadDataToOrderTable();
                status=true;
            }
            else{
                status=orderDB.push(OrderObject);
                loadDataToOrderTable();
            }
        }
    }



    if (status){
        alert("done")
    }else {
        alert("not done")
    }

    $("#TotalPrice").val(grandTotal);

    var OrderDetailsObject=new OrderDetailsDTO(orderId,grandTotal);
    orderDetailsDB.push(OrderDetailsObject);

    var itemName=$("#item-name-order").val();

    loadDataToOrderTable();
});

function loadDataToOrderTable(){
    $("#place-order-Tbody").empty();
    let row;
    for (let i = 0; i < orderDB.length; i++) {
        row = `<tr><td>${orderDB[i].getOrderItemCode()}</td><td>${orderDB[i].getOrderItemName()}</td><td>${orderDB[i].getOrderedQty()}</td><td>${orderDB[i].getUnitPrice()}</td><td>${orderDB[i].getTotal()}</td>
                <td><button id="btnItemCartDelete" type="button" class="btn-sm btn-danger">Delete</button>`;
        $("#place-order-Tbody").append(row);
    }
}

$("#place-order").click(function (){
    for (let i = 0; i < orderDB.length; i++) {
        for (let j = 0; j < itemDB.length; j++) {
            if (orderDB[i].getOrderItemCode()==itemDB[j].getItemCode()){
                itemDB[j].setItemQuantity(itemDB[j].getItemQuantity()-orderDB[i].getOrderedQty());
            }
        }
    }
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

