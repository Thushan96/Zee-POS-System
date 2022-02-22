function saveCustomer() {
    //gather customer information
    let customerID = $("#customer-id").val();
    let customerName = $("#customer-name").val();
    let customerAddress = $("#customer-address").val();
    let customerMobile = $("#customer-mobile").val();

    //create Object
    var customerObject=new CustomerDT0(customerID,customerName,customerAddress,customerMobile);

    customerDB.push(customerObject);
    $("#save-customer").attr('disabled', true);
}

function searchCustomerFromID(cId){
    for (let i = 0; i < customerDB.length; i++) {
        if(customerDB[i].getCustomerId()==cId){
            return customerDB[i];
        }
    }
}


function clearAll() {
    $('#customer-id,#customer-name,#customer-address,#customer-mobile').val("");
    $('#customer-id,#customer-name,#customer-address,#customer-mobile').css('border', '2px solid #ced4da');
    $('#customer-id').focus();
    $("#btnCustomer").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcusCno").text("");
}

function loadAllCustomers() {
    $("#customer-Tbody").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerContactNo()}</td></tr>`;
        /*select the table body and append the row */
        $("#customer-Tbody").append(row);
    }
}

$("#save-customer").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
});

$("#update-customer").click(function (){
    for (let i = 0; i < customerDB.length; i++) {
        if(customerDB[i].getCustomerId()==$("#customer-id").val()){
            customerDB[i].setCustomerName($("#customer-name").val());
            customerDB[i].setCustomerAddress($("#customer-address").val());
            customerDB[i].setCustomerContactNo($("#customer-mobile").val());
        }
    }
    clearAll();
    loadAllCustomers();
    $('#customer-id').attr('readonly', false);
    $("#update-customer").attr('disabled', true);
    $("#save-customer").attr('disabled', true);
});

$("#clear-customer").click(function (){
   clearAll();
    $("#save-customer").attr('disabled', true);
    $("#update-customer").attr('disabled', true);
    $('#customer-id').attr('readonly', false);
});

// VALIDATIONS

const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusMobileRegEx = /^[0-9]{10}$/;

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
                    $("#lblcusCno").text("Cus Mobile No is a required field : 10 digits");
                    return false;
                }
            } else {
                $("#customer-address").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#customer-id").val();
    if (cusIDRegEx.test(cusID)) {
        $("#customer-name").focus();
        var cusName = $("#customer-name").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customer-address").focus();
            var cusAddress = $("#customer-address").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#customer-mobile").focus();
                var cusMobile = $("#customer-mobile").val();
                var resp = cusMobileRegEx.test(cusMobile);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                        $("#update-customer").attr('disabled', true);
                    }
                } else {
                    $("#customer-mobile").focus();
                }
            } else {
                $("#customer-address").focus();
            }
        } else {
            $("#customer-name").focus();
        }
    } else {
        $("#customer-id").focus();
    }
}

$('#customer-id,#customer-name,#customer-address,#customer-mobile').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#customer-id,#customer-name,#customer-address,#customer-mobile').on('blur', function () {
    formValid();
});

function setButton() {
    let b = formValid();
    if (b) {
        $("#save-customer").attr('disabled', false);
    } else {
        $("#save-customer").attr('disabled', true);
    }
}

$("#customer-id").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
    if (eventOb.key == "Control") {
        var typedCustomerID = $("#customer-id").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#customer-id").val(srcCustomer.getCustomerId());
        $("#customer-name").val(srcCustomer.getCustomerName());
        $("#customer-address").val(srcCustomer.getCustomerAddress());
        $("#customer-mobile").val(srcCustomer.getCustomerContactNo());
        $("#update-customer").attr('disabled', false);
        $("#save-customer").attr('disabled', true);
        $('#customer-id').attr('readonly', true);
    }
});

$("#customer-name").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#customer-address").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#customer-mobile").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
