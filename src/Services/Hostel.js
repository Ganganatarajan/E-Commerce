
import apiInstance from '../interceptors/axios';


export const GetHostel = async() =>{
    const response = await apiInstance.get('hostel/get-all');
    return response;
}
