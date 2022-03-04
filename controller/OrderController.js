
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

function updateQty(){
    var itemCode=$("#cmbItem option:selected").text();
    orderQTY= parseInt($("#qty-order").val());
    for (let i = itemDB.length - 1; i >= 0; i--) {
        if (itemDB[i].getItemCode()==itemCode){
            itemDB[i].setItemQuantity(itemDB[i].getItemQuantity()-orderQTY);
        }
    }

}


let grandTotal,Total,orderQTY,OrderDetailsObject;
$("#add-order").click(function (){
    $("#cmbCustomer").attr("disabled", true);
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



    var OrderObject=new OrderDTO(orderId,orderDate,CusId,CusName,itemCode,ItemName,orderQTY,unitPrice,Total);

    if (orderDB.length==0){
        orderDB.push(OrderObject);
    }else{
                let check=ifExists();
            if (ifExists()==-1){
               orderDB.push(OrderObject);
            }
            else{
                orderQTY=orderQTY+orderDB[check].getOrderedQty();
                orderDB[check].setOrderedQty(orderQTY);
                orderDB[check].setTotal(Number(orderDB[check].getTotal())+Total);
            }
        }

    setTotal();
    setEnable();
    loadDataToOrderTable();
    updateQty();
    setItemData(itemCode);
    $("#qty-order").val("");
});

$("#place-order").click(function (){
    var orderId=$("#order-id").val();
    OrderDetailsObject=new OrderDetailsDTO(orderId,setTotalAfterDiscount());
    orderDetailsDB.push(OrderDetailsObject);
    clearData();
    setOrderId();
    var d = new Date();
    $("#order-date").val(d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate());

})

function clearData(){
    $("#order-id,#customer-name-order,#item-name-order,#qty-order,#unit-price-order,#qtyOnHand-order").val("");
    $("#TotalPrice,#Discount,#Cash,#Balance").val("");
    $("#cmbCustomer").val(0);
    $("#cmbItem").val(0);
    $("#cmbItem").attr("disabled",false);
    $("#cmbCustomer").attr("disabled",false);
    $("#Discount").attr("disabled", true);
    $("#Cash").attr("disabled", true);
    $("#place-order").attr("disabled",true);
    $("#add-order").attr("disabled",true);
    $("#place-order-Tbody").empty();
    $("#subTotal").text("");
}

function setEnable(){
    $("#Discount").attr("disabled", false);
    $("#Cash").attr("disabled", false);
}

function getTotal(){
    var orderId=$("#order-id").val();
    grandTotal=0;
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].getOrderId()==orderId){
            grandTotal+=orderDB[i].getTotal();
        }
    }
    return grandTotal;
}

function setTotal(){
if (orderDB.length==0){
    $("#TotalPrice").val("");
    $("#subTotal").text("");
}else{
    $("#TotalPrice").val(getTotal());
    $("#subTotal").text("SubTotal :RS."+getTotal()+".00");
}
}

function ifExists(){
    var orderId=$("#order-id").val();
    var itemCode=$("#cmbItem option:selected").text();
    for (let i = 0; i <orderDB.length; i++) {
        if (orderDB[i].getOrderItemCode()==itemCode && orderDB[i].getOrderId()==orderId){
            return i;
        }
    }
    return -1;
}

function loadDataToOrderTable(){
    var orderId=$("#order-id").val();
    $("#place-order-Tbody").empty();
    let row;
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].getOrderId()==orderId){
            row = `<tr><td>${orderDB[i].getOrderItemCode()}</td><td>${orderDB[i].getOrderItemName()}</td><td>${orderDB[i].getOrderedQty()}</td><td>${orderDB[i].getUnitPrice()}</td><td>${orderDB[i].getTotal()}</td>
                <td><button id="btnItemCartDelete" type="button" class="btn-sm btn-danger">Delete</button>`;
        }
        $("#place-order-Tbody").append(row);
    }
}

// $("#place-order").click(function (){
//     for (let i = 0; i < orderDB.length; i++) {
//         for (let j = 0; j < itemDB.length; j++) {
//             if (orderDB[i].getOrderItemCode()==itemDB[j].getItemCode()){
//                 itemDB[j].setItemQuantity(itemDB[j].getItemQuantity()-orderDB[i].getOrderedQty());
//             }
//         }
//     }
// })

$("#place-order-Tbody").on('click', '#btnItemCartDelete', function () {
    let tblOrderRow=$(this);
    let text = "Are you sure you want to remove this Item from cart?";

        if (confirm(text)) {
            $(this).closest('tr').remove();
            deleteRow(tblOrderRow);
            loadDataToOrderTable();
            setTotal();
        }

});

function updateBackQty(id,qty){
    for (let i = itemDB.length - 1; i >= 0; i--) {
        if(itemDB[i].getItemCode()==id){
            itemDB[i].setItemQuantity(itemDB[i].getItemQuantity()+qty);
        }
    }
}

function deleteRow(row){
    let rowId=row.closest('tr').children(':nth-child(1)').text();
    let rowQty=parseInt(row.closest('tr').children(':nth-child(3)').text());
    var itemCode=$("#cmbItem option:selected").text();
    let orderId=$("#order-id").val();
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].getOrderItemCode()==rowId && orderDB[i].getOrderId()==orderId){
            updateBackQty(orderDB[i].getOrderItemCode(),rowQty);
            orderDB.splice(i,1);
        }
    }
    setItemData(itemCode);

}


function getBalance(){
    let cash=parseInt($("#Cash").val());
    let grossTotal=setTotalAfterDiscount();
    let balance=cash-grossTotal;
    $("#Balance").val(balance);

}


// VALIDATIONS

const cusQtyRegEx = /^[0-9]{1,3}$/;
var CashRegEx= /^[0-9](.){1,6}$/;
var DiscountRegEx=/^[0-9]{1,2}$/;

$("#Cash").keyup(function (event) {

    let cash = $("#Cash").val();
    if (CashRegEx.test(cash)){
        $("#Cash").css('border','2px solid blue');
        $("#errorCash").text("");
        if (cash >= setTotalAfterDiscount()){
            $("#Cash").css('border','2px solid blue');
            $("#errorCash").text("");
            if($("#place-order-Tbody tr").length > 0){
                $("#place-order").attr("disabled", false);
                if(event.key=="Enter"){
                    getBalance();
                }
            }
        }else {
            $("#Cash").css('border','2px solid red');
            $("#errorCash").text("Cash amount should be more than total");
        }
    }else {
        $("#Cash").css('border','2px solid red');
        $("#errorCash").text("Cash is a required field: Pattern 00 or 00.00");
    }
});

$("#Discount").keyup(function (event) {

    let discount = $("#Discount").val();
    if (DiscountRegEx.test(discount)){
        $("#Discount").css('border','2px solid blue');
        $("#errorFinalDiscount").text("");
        if(event.key=="Enter"){
            setTotalAfterDiscount();
        }
    }else {
        $("#Discount").css('border','2px solid red');
        $("#errorFinalDiscount").text("Discount is a required field: Pattern 0");
    }
});

function setTotalAfterDiscount() {
        let discount=parseInt($("#Discount").val());
        let  total=parseInt($("#TotalPrice").val());
        if (discount){
            let grossTotal=total-(total*discount/100);
            $("#subTotal").text("SubTotal :RS."+grossTotal+".00");
            return grossTotal;
        }else{
            $("#subTotal").text("SubTotal :RS."+total+".00");
            return total;
        }

}

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
                        if (parseInt($("#qty-order").val()) > parseInt($("#qtyOnHand-order").val())){
                            $("#qty-order").css('border', '2px solid red');
                            $("#lblReqQty").text("Check available Quantity & Try again");
                            return false;
                        }else{
                            $("#qty-order").css('border', '2px solid blue');
                            $("#lblReqQty").text("");
                            return true;
                        }
                    }else{
                        $("#qty-order").css('border', '2px solid red');
                        $("#lblReqQty").text("Order Quantity is a required field : maximum 3 digits");
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

