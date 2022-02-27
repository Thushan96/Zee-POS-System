function OrderDetailsDTO(){
    var __OrderId;
    var __OrderTotal;
    // var __OrderDiscount;

    this.setOrderId=function (oId){
        __OrderId=oId;
    }
    this.getOrderId=function (){
        return __OrderId;
    }
    this.setOrderTotal=function (total){
        __OrderTotal=total;
    }
    this.getOrderTotal=function (){
        return __OrderTotal;
    }
    // this.setOrderDiscount=function (discount){
    //     __OrderDiscount=discount;
    // }
    // this.getOrderDiscount=function (){
    //     return __OrderDiscount;
    // }
}