
import apiInstance from '../interceptors/axios';


export const GetHotel = async() =>{
    const response = await apiInstance.get('hostel/get-all');
    return response;
}
export const DeleteHostel = async(id) =>{
    const response = await apiInstance.delete(`hostel/delete/${id}`)
    return response;
}

