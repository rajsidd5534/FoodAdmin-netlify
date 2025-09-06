import axios from 'axios';
import { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';

const Orders = () => {
   const [data , setData] = useState([]);

    const fetchOrders = async () => {
      const response = await axios.get("https://fooapi-backend-production.up.railway.app/api/orders/all");
      setData(response.data);
    };

     const updateStatus = async (event, orderId) => {
      const response =  await axios.patch(`https://fooapi-backend-production.up.railway.app/api/orders/status/${orderId}?status=${event.target.value}`);
      if (response.status === 200) {
       await fetchOrders(); 
      }
    };

      useEffect(() => {
        fetchOrders();
      }, []);
    
  return (
   <div className="container">
    <div className="py-5 row justify-content-center">
        <div className="col-11 card">
             <table className='table table-responsive'>
                <tbody>
                    {
                    data.map((order , index ) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <img src={assets.parcel} alt=""  height={48} width={48}/>
                                </td>
                                <td>
                                     <div>
                                        {order.orderedItems.map((item , index ) =>{
                                    if(index === order.orderedItems.length - 1) {
                                        return item.name + "x" + item.quantity;
                                    } else{
                                        return item.name + "x" + item.quantity + ", ";
                                    }
                                })}
                                     </div>
                                     <div>
                                        {order.userAddress}
                                     </div>
                                </td>
                                <td>&#8377;{order.amount}</td>
                                <td>Items : {order.orderedItems.length}</td>
                                <td>
                                    <select className='form-control' onChange={(event) => updateStatus(event, order.id)} value={order.orderStatus}>
                                        <option value="Food Preparing">Food Preparing</option>
                                        <option value="out-for-delivery">Out for delivery</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        )

                    })
                }
                </tbody>
             </table>
        </div>
    </div>
   </div>
  );
};

export default Orders;
