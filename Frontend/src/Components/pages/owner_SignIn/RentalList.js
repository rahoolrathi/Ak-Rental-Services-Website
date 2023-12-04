import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { FaClock } from 'react-icons/fa';
import './Rentallist.css';

const RentalList = (props) => {
  const [userDataMap, setUserDataMap] = useState({});

  const fetchUserData = async (Reg_no) => {
    try {
      const response = await axios.post('http://localhost:3001/getUserDataByRegNo', { Reg_no });
      return response.data.userData;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      return null;
    }
  };

  const loadUserData = async (Reg_id) => {
    if (!userDataMap[Reg_id]) {
      const userData = await fetchUserData(Reg_id);
      setUserDataMap((prevUserDataMap) => ({ ...prevUserDataMap, [Reg_id]: userData }));
    }
  };

  useEffect(() => {
    // Load user data whenever props.items changes
    props.items.forEach((item) => loadUserData(item.Reg_id));
  }, [props.items]);

  const itemTemplate = (item) => {
    const matchingCar = props.car.find((car) => car.Reg_no === item.Car_Reg_no);
    const user = userDataMap[item.Reg_id] || {};
    console.log(user)

    return (
      <div className="product-item">
        <div className="image-container">
          <img
            src={require(`../../Assets/${matchingCar.Int_img}`)}
            onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
            alt={item.name}
          />
        </div>
        <div className="product-list-detail">
          <h5 className="mb-2">{item.Car_Reg_no}-{matchingCar.C_name}</h5>
          <FaClock size={15} color="gray" />
          <span className="product-category">
            ({item.Pick_up_TD.substring(0, 10)} to {item.Drop_off_TD.substring(0, 10)})--{item.Drop_off_TD.substring(11, 16)}
          </span>
        </div>
        <div className="product-list-action">
          {user[0] && (
            <>
              <h6 className="mb-2">Name: {user[0].Name}</h6>
              <h6 className="mb-2">Ph: {user[0].ph_Number}</h6>
            </>
          )}
          <h6 className="mb-2">RS: {item.Total_Price}</h6>
          {item.inventoryStatus && (
            <span className={`product-badge status-${item.inventoryStatus.toLowerCase()}`}>{item.inventoryStatus}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="orderlist-demo">
      <div className="card">
        <OrderList value={props.items} header="Rental Registrations" dragdrop listStyle={{ height: 'auto' }} dataKey="Reg_id" itemTemplate={itemTemplate} />
      </div>
    </div>
  );
};

export default RentalList;
