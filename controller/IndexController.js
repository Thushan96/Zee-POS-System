$("#sec1").css("display","block");
$("#sec2").css("display","none");
$("#sec3").css("display","none");
$("#sec4").css("display","none");

$("#home-nav").click(function (){
    $("#sec1").css("display","block");
    $("#sec2").css("display","none");
    $("#sec3").css("display","none");
    $("#sec4").css("display","none");
});

$("#customer-nav").click(function (){
    $("#sec1").css("display","none");
    $("#sec2").css("display","block");
    $("#sec3").css("display","none");
    $("#sec4").css("display","none");
});

$("#Item-nav").click(function (){
    $("#sec1").css("display","none");
    $("#sec2").css("display","none");
    $("#sec3").css("display","block");
    $("#sec4").css("display","none");
});

$("#ODetails-nav").click(function (){
    $("#sec1").css("display","none");
    $("#sec2").css("display","none");
    $("#sec3").css("display","none");
    $("#sec4").css("display","block");
});

// $("#add-order").click(function (){
//      var id=$("#cmbItem").val();
//      var qty=$("#qty-order").val();
//     $("#tbl-order").append("<tr><td>"+id+"</td><td>Pizza</td><td>"+qty+"</td><td>900</td><td>1800</td></tr>");
//
// });

// $("#add-order").click(function (){
//     let id=$("#cmbItem").val();
//     let qty=$("#qty-order").val();
//     let row=`<tr><td>${id}</td><td>Pizza</td><td>${qty}</td><td>900</td><td>1800</td></tr>`
//     $("#tbl-order").append(row);
//     $("#tbl-order tr").click(function (){
//         console.log(this);
//     });
//
// });
//
//
// $("#save-customer").click(function (){
//     let id=$("#customer-id").val();
//    let name=$("#customer-name").val();
//    let address=$("#customer-address").val();
//    let mobile=$("#customer-mobile").val();
//
//     let row=` <tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${mobile}</td></tr>`;
//     $("#customer-Tbody").append(row);
//
//     $("#customer-Tbody").click(function (){
//         console.log(this);
//     });
//
// });
//
// $("#save-Item").click(function(){
//     let code=$("#Item-Code").val();
//     let name=$("#Item-name").val();
//     let price=$("#Item-price").val();
//     let qty=$("#Item-quantity").val();
//     let row= `<tr><td>${code}</td><td>${name}</td><td>${price}</td><td>${qty}</td></tr>`;
//
//     $("#item-Tbody").append(row);
//
//     $("#item-Tbody tr").click(function(){
//         console.log(this)
//     });
//
//
// });