function CustomerDT0(id, name, address,cN0){
    var __id=id;
    var __name=name;
    var __address=address;
    var __cNo=cN0;

    this.setCustomerId=function (id){
        __id=id;
    }
    this.getCustomerId=function (){
        return __id;
    }

    this.setCustomerName=function (name){
        __name=name;
    }
    this.getCustomerName=function (){
        return __name;
    }
    this.setCustomerAddress=function (address){
        __address=address;
    }
    this.getCustomerAddress=function (){
        return __address;
    }
    this.setCustomerContactNo=function (cNo){
        __cNo=cNo;
    }
    this.getCustomerContactNo=function (){
        return __cNo;
    }
}
