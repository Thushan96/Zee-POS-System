function saveItem() {
    //gather customer information
    let itemCode = $("#Item-id").val();
    let itemName = $("#Item-name").val();
    let itemPrice = $("#Item-price").val();
    let itemQty = $("#Item-quantity").val();

    //create Object
    var itemObject=new ItemDT0(itemCode,itemName,itemPrice,itemQty);
    for (let i = 0; i < itemDB.length; i++) {
        if(itemDB[i].getItemCode()==itemCode){
            itemDB[i].setItemName(itemName);
            itemDB[i].setItemprice(itemPrice);
            itemDB[i].setItemQuantity(itemQty);
            $("#ItemstaticBackdrop").modal('hide');
            $("#save-Item").attr('disabled', true);
            $('#Item-id').attr('readonly', false);
            return;
        }
    }

    itemDB.push(itemObject);
    $("#ItemstaticBackdrop").modal('hide');
    $("#save-Item").attr('disabled', true);
    $('#Item-id').attr('readonly', false);
}

function searchItemFromID(iCode){
    for (let i = 0; i < itemDB.length; i++) {
        if(itemDB[i].getItemCode()==iCode){
            return itemDB[i];
        }
    }
}


function clearAllItems() {
    $('#Item-id,#Item-name,#Item-price,#Item-quantity').val("");
    $('#Item-id,#Item-name,#Item-price,#Item-quantity').css('border', '2px solid #ced4da');
    $('#Item-id').focus();
    $("#save-Item").attr('disabled', true);
    loadAllCustomers();
    $("#lblItemCode,#lblItemName,#lblItemPrice,#lblItemQty").text("");
}

function loadAllItems() {
    $("#item-Tbody").empty();
    for (var i of itemDB) {
        /*create a html row*/
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemprice()}</td><td>${i.getItemQuantity()}</td></tr>`;
        /*select the table body and append the row */
        $("#item-Tbody").append(row);
    }
}



$("#save-Item").click(function () {
    saveItem();
    clearAllItems();
    loadAllItems();
    loadItemId();
});



$("#clear-Item").click(function (){
    clearAllItems();
    $("#save-Item").attr('disabled', true);
    // $("#update-customer").attr('disabled', true);
    $('#Item-id').attr('readonly', false);
});

$('#itemSearch_button').click(function (){
    var code=$("#txtItem").val();
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode()==code){
            $("#staticBackdrop2").modal('show');
            var item=searchItemFromID(code);
            $("#Item-Code1").val(item.getItemCode());
            $("#item-name1").val(item.getItemName());
            $("#item-price1").val(item.getItemprice());
            $("#Item-Quantity1").val(item.getItemQuantity());

        }
    }
    if (item){
        $('#txtItem').val("");
    }else{
        alert("Invalid Item Code.Try Again!")
    }
    $("#itemSearch_button").attr('disabled', true);

});

function clearAfterItemUpdate() {
    $('#Item-Code1,#item-name1,#item-price1,#Item-Quantity1').val("");
    $('#Item-Code1,#item-name1,#item-price1,#Item-Quantity1').css('border', '2px solid #ced4da');
    loadAllItems();
    $("#lblItemCode1,#lblItemName1,#lblItemPrice1,#lblItemQty1").text("");
}


$("#update-item1").click(function (){
    updateItem();
    clearAfterItemUpdate();
    loadItemId();
});

$("#item_closebtn").click(function (){
    clearAfterItemUpdate();
});

function updateItem(){
    var itemCode=$("#Item-Code1").val();
    var itemName=$("#item-name1").val();
    var itemPrice=$("#item-price1").val();
    var itemQty=$("#Item-Quantity1").val();
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode()==itemCode){
            itemDB[i].setItemName(itemName);
            itemDB[i].setItemprice(itemPrice);
            itemDB[i].setItemQuantity(itemQty);
        }
    }
    $("#staticBackdrop2").modal('hide');
}

$("#delete-item1").click(function (){
    deleteItem();
    loadAllItems();
    loadItemId();
});

function deleteItem(){
    var code=$("#Item-Code1").val();
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode()==code){
            itemDB.splice(i,1);
        }
    }
    $("#staticBackdrop2").modal('hide');
}

$('#clear-item2').click(function (){
    $('#txtItem').val("");
    $('#txtItem').css('border', '2px solid #ced4da');
    $("#lblICode").text("");
    $("#itemSearch_button").attr('disabled', true);
});

// VALIDATIONS

const itemCodeRegEx =  /^(I00-)[0-9]{3,4}$/;
const itemNameRegEx = /^[A-z ]{3,20}$/;
const itemPriceRegEx = /^[0-9](.){1,6}$/;
const itemQtyRegEx = /^[0-9]{1,3}$/;

function itemformValid() {
    var itemID = $("#Item-id").val();
    $("#Item-id").css('border', '2px solid green');
    $("#lblItemCode").text("");
    if (itemCodeRegEx.test(itemID)) {
        var itemName = $("#Item-name").val();
        if (itemNameRegEx.test(itemName)) {
            $("#Item-name").css('border', '2px solid green');
            $("#lblItemName").text("");
            var itemPrice = $("#Item-price").val();
            if (itemPriceRegEx.test(itemPrice)) {
                var ItemQuantity = $("#Item-quantity").val();
                var resp = itemQtyRegEx.test(ItemQuantity);
                $("#Item-price").css('border', '2px solid green');
                $("#lblItemPrice").text("");
                if (resp) {
                    $("#Item-quantity").css('border', '2px solid green');
                    $("#lblItemQty").text("");
                    return true;
                } else {
                    $("#Item-quantity").css('border', '2px solid red');
                    $("#lblItemQty").text("Item Quantity is a required field : Minimum 7");
                    return false;
                }
            } else {
                $("#Item-price").css('border', '2px solid red');
                $("#lblItemPrice").text("Item Price is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#Item-name").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#Item-id").css('border', '2px solid red');
        $("#lblItemCode").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function itemcheckIfValid() {
    var itemID = $("#Item-id").val();
    if (itemCodeRegEx.test(itemID)) {
        $("#Item-name").focus();
        var itemName = $("#Item-name").val();
        if (itemNameRegEx.test(itemName)) {
            $("#Item-price").focus();
            var itemPrice = $("#Item-price").val();
            if (itemPriceRegEx.test(itemPrice)) {
                $("#Item-quantity").focus();
                var itemQty = $("#Item-quantity").val();
                var resp = itemQtyRegEx.test(itemQty);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAllItems();
                    }
                } else {
                    $("#Item-quantity").focus();
                }
            } else {
                $("#Item-price").focus();
            }
        } else {
            $("#Item-name").focus();
        }
    } else {
        $("#Item-id").focus();
    }
}

$('#Item-id,#Item-name,#Item-price,#Item-quantity,#txtItem,#Item-Code1,#item-name1,#item-price1,#Item-Quantity1').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#Item-id,#Item-name,#Item-price,#Item-quantity').on('blur', function () {
    itemformValid();
});

function setItemButton() {
    let b = itemformValid();
    if (b) {
        $("#save-Item").attr('disabled', false);
    } else {
        $("#save-Item").attr('disabled', true);
    }
}

$("#Item-id").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        itemcheckIfValid();
    }
    if (eventOb.key == "Control") {
        var typedItemID = $("#Item-id").val();
        var srcItem = searchItemFromID(typedItemID);
        $("#Item-id").val(srcItem.getItemCode());
        $("#Item-name").val(srcItem.getItemName());
        $("#Item-price").val(srcItem.getItemprice());
        $("#Item-quantity").val(srcItem.getItemQuantity());
        $("#update-Item").attr('disabled', false);
        $("#save-Item").attr('disabled', true);
        $('#Item-id').attr('readonly', true);
    }
});

$("#Item-name").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        itemcheckIfValid();
    }
});

$("#Item-price").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        itemcheckIfValid();
    }
});

$("#Item-quantity").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        itemcheckIfValid();
    }
});

$("#txtItem").on('keyup',function (eventOb){
    itemSearchButton();
});

function itemCheckformValid() {
    var itemCode = $("#txtItem").val();
    if (itemCodeRegEx.test(itemCode)) {
        $("#txtItem").css('border', '2px solid blue');
        $("#lblICode").text("");
        return true;
    } else {
        $("#txtItem").css('border', '2px solid red');
        $("#lblICode").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}


function itemSearchButton() {
    let b = itemCheckformValid();
    if (b) {
        $("#itemSearch_button").attr('disabled', false);
    } else {
        $("#itemSearch_button").attr('disabled', true);
    }
}
// ------
function checkFormValidate() {
    var itemID = $("#Item-Code1").val();
    $("#Item-Code1").css('border', '2px solid green');
    $("#lblItemCode1").text("");
    if (itemCodeRegEx.test(itemID)) {
        var itemName = $("#item-name1").val();
        if (itemNameRegEx.test(itemName)) {
            $("#item-name1").css('border', '2px solid green');
            $("#lblItemName1").text("");
            var itemPrice = $("#item-price1").val();
            if (itemPriceRegEx.test(itemPrice)) {
                var ItemQuantity = $("#Item-Quantity1").val();
                var resp = itemQtyRegEx.test(ItemQuantity);
                $("#item-price1").css('border', '2px solid green');
                $("#lblItemPrice1").text("");
                if (resp) {
                    $("#Item-Quantity1").css('border', '2px solid green');
                    $("#lblItemQty1").text("");
                    return true;
                } else {
                    $("#Item-Quantity1").css('border', '2px solid red');
                    $("#lblItemQty1").text("Item Quantity is a required field : Minimum 7");
                    return false;
                }
            } else {
                $("#item-price1").css('border', '2px solid red');
                $("#lblItemPrice1").text("Item Price is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#item-name1").css('border', '2px solid red');
            $("#lblItemName1").text("Item Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#Item-id").css('border', '2px solid red');
        $("#lblItemCode1").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function itemIfValid() {
    var ItemCode = $("#Item-Code1").val();
    if (itemCodeRegEx.test(ItemCode)) {
        $("#item-name1").focus();
        var itemName = $("#item-name1").val();
        if (itemNameRegEx.test(itemName)) {
            $("#item-price1").focus();
            var itemPrice = $("#item-price1").val();
            if (itemPriceRegEx.test(itemPrice)) {
                $("#Item-Quantity1").focus();
                var itemQty = $("#Item-Quantity1").val();
                var resp = itemQtyRegEx.test(itemQty);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveItem();
                        clearAllItems();
                    }
                } else {
                    $("#Item-Quantity1").focus();
                }
            } else {
                $("#item-price1").focus();
            }
        } else {
            $("#item-name1").focus();
        }
    } else {
        $("#Item-Code1").focus();
    }
}

$('#Item-Code1,#item-name1,#item-price1,#Item-Quantity1').on('blur', function () {
    checkFormValidate();
});

function setItemUpdateButton() {
    let b = checkFormValidate();
    if (b) {
        $("#update-item1").attr('disabled', false);
    } else {
        $("#update-item1").attr('disabled', true);
    }
}

$("#Item-Code1").on('keyup', function (eventOb) {
    setItemUpdateButton();
    if (eventOb.key == "Enter") {
        itemIfValid();
    }

});

$("#item-name1").on('keyup', function (eventOb) {
    setItemUpdateButton();
    if (eventOb.key == "Enter") {
        itemIfValid();
    }
});

$("#item-price1").on('keyup', function (eventOb) {
    setItemUpdateButton();
    if (eventOb.key == "Enter") {
        itemIfValid();
    }
});

$("#Item-Quantity1").on('keyup', function (eventOb) {
    setItemUpdateButton();
    if (eventOb.key == "Enter") {
        itemIfValid();
    }
});



