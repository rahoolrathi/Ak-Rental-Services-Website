import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../owner_SignIn/index1.css';
import ReactDOM from 'react-dom';
import { FaClock } from 'react-icons/fa'; // Import the clock icon

import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
// import { ProductService } from '../service/ProductService';
import './Rentallist.css';

const RentalList = (props) => {
    const [products, setProducts] = useState([]);
    const itemTemplate = (item) => {
        const matchingCar = props.car.find((car) => car.Reg_no === item.Car_Reg_no);

    
        return (
            <div className="product-item">
                <div className="image-container">
                    <img src={require(`../../Assets/${matchingCar.Int_img}`)} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} />
                </div>
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.Car_Reg_no}-{matchingCar.C_name}</h5>
                    <FaClock size={15} color="gray"/>
                    <span className="product-category">({item.Pick_up_TD.substring(0, 10)}  to  {item.Drop_off_TD.substring(0, 10)})--{item.Drop_off_TD.substring(11, 16)}</span>
                </div>
                <div className="product-list-action">
                    <h6 className="mb-2">RS:{item.Total_Price}</h6>
                    {item.inventoryStatus && (
                        <span className={`product-badge status-${item.inventoryStatus.toLowerCase()}`}>{item.inventoryStatus}</span>
                    )}
                </div>
            </div>
        );
    }
    
    
    return (
        <div className="orderlist-demo">
          <div className="card">
            <OrderList
             value={props.items}
              header="Rental Registrations"
              dragdrop
              listStyle={{ height: 'auto' }}
              dataKey="Reg_id" // Change the dataKey based on your data structure
              itemTemplate={itemTemplate}
              onChange={(e) => setProducts(e.value)}
            ></OrderList>
          </div>
        </div>
      );
    };
                
export default RentalList;