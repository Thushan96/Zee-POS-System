function saveCustomer() {
    //gather customer information
    let customerID = $("#customer-id").val();
    let customerName = $("#customer-name").val();
    let customerAddress = $("#customer-address").val();
    let customerMobile = $("#customer-mobile").val();

    //create Object
    var customerObject=new CustomerDT0(customerID,customerName,customerAddress,customerMobile);
    for (let i = 0; i < customerDB.length; i++) {
        if(customerDB[i].getCustomerId()==customerID){
            customerDB[i].setCustomerName(customerName);
            customerDB[i].setCustomerAddress(customerAddress);
            customerDB[i].setCustomerContactNo(customerMobile);
            $("#staticBackdrop").modal('hide');
            $("#save-customer").attr('disabled', true);
            $('#customer-id').attr('readonly', false);
            return;
        }
    }

    customerDB.push(customerObject);
    $("#staticBackdrop").modal('hide');
    $("#save-customer").attr('disabled', true);
    $('#customer-id').attr('readonly', false);
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
    loadCustomerId();
});



$("#clear-customer").click(function (){
   clearAll();
    $("#save-customer").attr('disabled', true);
    $("#update-customer").attr('disabled', true);
    $('#customer-id').attr('readonly', false);
});

$('#search-button').click(function (){
    var cusId=$("#txtCustomer").val();
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId()==cusId){
            $("#staticBackdrop1").modal('show');
            var customer=searchCustomerFromID(cusId);
            $("#customer-id1").val(customer.getCustomerId());
            $("#customer-name1").val(customer.getCustomerName());
            $("#customer-address1").val(customer.getCustomerAddress());
            $("#customer-mobile1").val(customer.getCustomerContactNo());

        }
    }
    if (customer){
        $('#txtCustomer').val("");
    }else{
        alert("Invalid Customer Id.Try Again!")
    }
    $("#search-button").attr('disabled', true);

});

function clearAfterUpdate() {
    $('#customer-id1,#customer-name1,#customer-address1,#customer-mobile1').val("");
    $('#customer-id1,#customer-name1,#customer-address1,#customer-mobile1').css('border', '2px solid #ced4da');
    loadAllCustomers();
    $("#lblcusId1,#lblcusname1,#lblcusaddress1,#lblcusCno1").text("");
}


$("#update-customer1").click(function (){
    updateCustomer();
    clearAfterUpdate();
    loadCustomerId();
});

$("#closebtn").click(function (){
    clearAfterUpdate();
});

function updateCustomer(){
    var cusId=$("#customer-id1").val();
    var cusName=$("#customer-name1").val();
    var cusAddress=$("#customer-address1").val();
    var cusContact=$("#customer-mobile1").val();
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId()==cusId){
            customerDB[i].setCustomerName(cusName);
            customerDB[i].setCustomerAddress(cusAddress);
            customerDB[i].setCustomerContactNo(cusContact);
        }
    }
    $("#staticBackdrop1").modal('hide');
}

$("#delete-customer1").click(function (){
    deleteCustomer();
    loadAllCustomers();
    loadCustomerId();
});

function deleteCustomer(){
    var cusId=$("#customer-id1").val();
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId()==cusId){
            customerDB.splice(i,1);
        }
    }
    $("#staticBackdrop1").modal('hide');
}

$('#clear-customer2').click(function (){
    $('#txtCustomer').val("");
    $('#txtCustomer').css('border', '2px solid #ced4da');
    $("#lblCustId").text("");
    $("#search-button").attr('disabled', true);
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

$('#customer-id,#customer-name,#customer-address,#customer-mobile,#txtCustomer,#customer-id1,#customer-name1,#customer-address1,#customer-mobile1').on('keydown', function (eventOb) {
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

$("#txtCustomer").on('keyup',function (eventOb){
    searchButton();
});

function checkformValid() {
    var cusID = $("#txtCustomer").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCustomer").css('border', '2px solid blue');
        $("#lblCustId").text("");
        return true;
    } else {
        $("#txtCustomer").css('border', '2px solid red');
        $("#lblCustId").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}


function searchButton() {
    let b = checkformValid();
    if (b) {
        $("#search-button").attr('disabled', false);
    } else {
        $("#search-button").attr('disabled', true);
    }
}
// ------
function checkFormValid() {
    var cusID = $("#customer-id1").val();
    $("#customer-id1").css('border', '2px solid green');
    $("#lblcusId1").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#customer-name1").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customer-name1").css('border', '2px solid green');
            $("#lblcusname1").text("");
            var cusAddress = $("#customer-address1").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusMobile = $("#customer-mobile1").val();
                var resp = cusMobileRegEx.test(cusMobile);
                $("#customer-address1").css('border', '2px solid green');
                $("#lblcusaddress1").text("");
                if (resp) {
                    $("#customer-mobile1").css('border', '2px solid green');
                    $("#lblcusCno1").text("");
                    return true;
                } else {
                    $("#customer-mobile1").css('border', '2px solid red');
                    $("#lblcusCno1").text("Customer Mobile No is a required field : 10 digits");
                    return false;
                }
            } else {
                $("#customer-address1").css('border', '2px solid red');
                $("#lblcusaddress1").text("Customer Address is a required field : Minimum 7");
                return false;
            }
        } else {
            $("#customer-name1").css('border', '2px solid red');
            $("#lblcusname1").text("Customer Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#customer-id1").css('border', '2px solid red');
        $("#lblcusId1").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function IfValid() {
    var cusID = $("#customer-id1").val();
    if (cusIDRegEx.test(cusID)) {
        $("#customer-name1").focus();
        var cusName = $("#customer-name1").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customer-address1").focus();
            var cusAddress = $("#customer-address1").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#customer-mobile1").focus();
                var cusMobile = $("#customer-mobile1").val();
                var resp = cusMobileRegEx.test(cusMobile);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#customer-mobile1").focus();
                }
            } else {
                $("#customer-address1").focus();
            }
        } else {
            $("#customer-name1").focus();
        }
    } else {
        $("#customer-id1").focus();
    }
}

$('#customer-id1,#customer-name1,#customer-address1,#customer-mobile1').on('blur', function () {
    checkFormValid();
});

function setUpdateButton() {
    let b = checkFormValid();
    if (b) {
        $("#update-customer1").attr('disabled', false);
    } else {
        $("#update-customer1").attr('disabled', true);
    }
}

$("#customer-id1").on('keyup', function (eventOb) {
    setUpdateButton();
    if (eventOb.key == "Enter") {
        IfValid();
    }

});

$("#customer-name1").on('keyup', function (eventOb) {
    setUpdateButton();
    if (eventOb.key == "Enter") {
        IfValid();
    }
});

$("#customer-address1").on('keyup', function (eventOb) {
    setUpdateButton();
    if (eventOb.key == "Enter") {
        IfValid();
    }
});

$("#customer-mobile1").on('keyup', function (eventOb) {
    setUpdateButton();
    if (eventOb.key == "Enter") {
        IfValid();
    }
});



