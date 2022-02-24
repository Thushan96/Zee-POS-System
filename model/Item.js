function ItemDT0(code, name, price,Qty){
    var __code=code;
    var __name=name;
    var __price=price;
    var __Qty=Qty;

    this.setItemCode=function (code){
        __code=code;
    }
    this.getItemCode=function (){
        return __code;
    }

    this.setItemName=function (name){
        __name=name;
    }
    this.getItemName=function (){
        return __name;
    }
    this.setItemprice=function (price){
        __price=price;
    }
    this.getItemprice=function (){
        return __price;
    }
    this.setItemQuantity=function (Qty){
        __Qty=Qty;
    }
    this.getItemQuantity=function (){
        return __Qty;
    }
}
