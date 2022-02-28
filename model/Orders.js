function OrderDTO(oId,oDate,cusId,cusName,itemCode,itemName,OrderQty,unitPrice,total){
var __oId=oId;
var __oDate=oDate;
var __cusId=cusId;
var __cusName=cusName;
var __itemCode=itemCode;
var __itemName=itemName;
var __OrderQty=OrderQty;
var __unitPrice=unitPrice;
var __total=total;

    this.setOrderId=function (oId){
        __oId=oId;
    }
    this.getOrderId=function (){
        return __oId;
    }
    this.setOrderDate=function (Date){
        __oDate=Date;
    }
    this.getOrderDate=function (){
        return __oDate;
    }
    this.setOrderCusId=function (cusId){
        __cusId=cusId;
    }
    this.getOrderCusId=function (){
        return __cusId;
    }
    this.setOrderCusName=function (cusName){
        __cusName=cusName;
    }
    this.getOrderCusName=function (){
        return __cusName;
    }
    this.setOrderItemCode=function (ItemCode){
        __itemCode=ItemCode;
    }
    this.getOrderItemCode=function (){
        return __itemCode;
    }
    this.setOrderItemName=function (ItemName){
        __itemName=ItemName;
    }
    this.getOrderItemName=function (){
        return __itemName;
    }
    this.setOrderedQty=function (OrderQty){
        __OrderQty=OrderQty;
    }
    this.getOrderedQty=function (){
        return __OrderQty;
    }
    this.setUnitPrice=function (unitPrice){
        __unitPrice=unitPrice;
    }
    this.getUnitPrice=function (){
        return __unitPrice;
    }
    this.setTotal=function (Total){
        __total=Total;
    }
    this.getTotal=function (){
        return __total;
    }

}