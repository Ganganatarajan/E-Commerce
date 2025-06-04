
import apiInstance from '../interceptors/axios';


export const GetHotel = async() =>{
    const response = await apiInstance.get('hotel/get-all');
    return response;
}

