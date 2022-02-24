
function loadCustomerId(){

    $("#cmbCustomer").empty();
        var option = $('<option value="0">select Id</option>');
         $("#cmbCustomer").append(option);
    customerDB.forEach(function (e){
        $("#cmbCustomer").append($("<option></option>").attr("value",e).text(e.getCustomerId()));;
    });
}
