import axios from 'axios';

var domain="https://viviancosmetic.azurewebsites.net/api/IUser/api/User";

function callApi(endpoint, method='GET',body){
        return axios({
            method,
            url:`${domain}/${endpoint}`,
            data:body,
        }).catch(e=>{console.log(e)})
}
 
export function GET_ALL_CUSTOMER(endpoint){
    return callApi(endpoint,"GET");
}

export function GET_CUSTOMER(endpoint,id){
    return callApi(endpoint+"/"+id,"GET");
}

export function ADD_CUSTOMER(endpoint,data){
    return callApi(endpoint,"POST",data);
}
    
export function EDIT_CUSTOMER(endpoint,data){
    return callApi(endpoint,"PUT",data);
}

export function DELETE_CUSTOMER(endpoint){
    return callApi(endpoint,"DELETE");
}
