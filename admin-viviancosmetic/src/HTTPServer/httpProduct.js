import axios from 'axios';

var domain="http://localhost:34383/api/IProduct/api/Product";

function callApi(endpoint, method='GET',body){
        return axios({
            method,
            url:`${domain}/${endpoint}`,
            data:body,
        }).catch(e=>{console.log(e)})
}

export function GET_ALL_PRODUCTS(endpoint){
    return callApi(endpoint,"GET");
}

export function GET_PRODUCT(endpoint,id){
    return callApi(endpoint+"/"+id,"GET");
}

export function ADD_PRODUCT(endpoint,data){
    return callApi(endpoint,"POST",data);
}
    
export function EDIT_PRODUCT(endpoint,data){
    return callApi(endpoint,"PUT",data);
}

export function DELETE_PRODUCT(endpoint){
    return callApi(endpoint,"DELETE");
}
