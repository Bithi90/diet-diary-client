import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUserFood = () => {
    const { user, loading } = useContext(AuthContext);
    
    const [axiosSecure] = useAxiosSecure();

    const { isLoading, refetch, data: addFood = [] } = useQuery({
        queryKey: ['addFood', user?.email],
        enabled: !loading,
        
        queryFn: async  () =>{
            const result = await axiosSecure.get(`/addFood?email=${user?.email}`)
            console.log('res from axios', result);
            return result.data;
        },
    })
    
    return [addFood,refetch, isLoading]
};

export default useUserFood;