const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql2');
const uuid = require('uuid');

app.use(cors()); // Enable CORS
// Middleware to parse JSON request bodies


const connection =mysql.createConnection({
  host:'localhost',
  user:"root",
  password:"root",
  database:'Car_rental'

})
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});
app.use(express.json());





//Showing Data

app.get('/', (req, res) => {
  // Update Car availability for cars with drop_off_TD in the past
  const updateQuery = `
    UPDATE Car C
    JOIN Rental_Reg R ON C.reg_no = R.car_reg_no
    SET C.available = 'Y'
    WHERE R.car_reg_no = C.reg_no
      AND R.drop_off_TD <= CURRENT_TIMESTAMP
      AND R.drop_off_TD = (
        SELECT MAX(drop_off_TD)
        FROM Rental_Reg
        WHERE car_reg_no = C.reg_no
      )
  `;

  connection.query(updateQuery, (err) => {
    if (err) {
      console.error('Error updating Car availability:', err);
      return res.status(500).send('Error updating Car availability');
    }

    // Select available cars
    const selectQuery = 'SELECT * FROM Car WHERE Available = "Y"';

    connection.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Error selecting available cars:', error);
        return res.status(500).send('Error selecting available cars');
      }

      res.json(results);
    });
  });
});





//For car registration Takes Owner Car and Resgisration info

// app.js

// ... (other imports and configurations)

app.post('/RegisterCar', async (req, res) => {
  console.log(req.body)
  const {
    O_id,
    Name,
    Address,
    ph_Number,
    Gender,
    Reg_no,
    C_name,
    Model,
    Available,
    Descripton,
    Price_Per_Day,
    Transmission,
    Mileage,
    Int_img,
    Ext_img,
    Reg_Year,
    Color,
    Owner_O_id,
    CR_id,
    Car_Reg_no,
    Doors,         // Include Doors in the request
    Passengers,    // Include Passengers in the request
    Luggage,       // Include Luggage in the request
    Air_Conditioning,  // Keeping Air_Conditioning as per previous request
  } = req.body;

  const owner = [O_id, Name, Address, ph_Number, Gender];
  const Car = [
    Reg_no,
    C_name,
    Model,
    Available,
    Descripton,
    Price_Per_Day,
    Transmission,
    Mileage,
    Int_img,
    Ext_img,
    Reg_Year,
    Color,
    Owner_O_id,
    Doors,         // Include Doors in the Car array
    Passengers,    // Include Passengers in the Car array
    Luggage,       // Include Luggage in the Car array
    Air_Conditioning
  ];
  console.log(Car)
  const CR = [CR_id, Car_Reg_no];
  const queryOwner = 'INSERT INTO owner (O_id, Name, Address, ph_Number, Gender) VALUES (?, ?, ?, ?, ?)';
  const queryCar = `
    INSERT INTO Car 
      (Reg_no, C_name, Model, Available, Descripton, Price_Per_Day, Transmission, Mileage, Int_img, Ext_img, Reg_Year, Color, Owner_O_id, Doors, Passengers, Luggage, AC) 
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const queryCR = 'INSERT INTO car_registration (CR_id, Car_Reg_no) VALUES (?, ?)';
  let rollbackNeeded = false;

  connection.beginTransaction((err) => {
    if (err) throw err;

    connection.query(queryOwner, owner, (err) => {
      if (err) {
        rollbackNeeded = true;
        console.log("owner")
        return connection.rollback(() => {
          res.status(500).send("Error inserting Owner: " + err.message);
        });
      }

      connection.query(queryCar, Car, (err) => {
        if (err) {
          rollbackNeeded = true;
          console.log("Car"+err.message)
          return connection.rollback(() => {
            res.status(500).send("Error inserting Car: " + err.message);
          });
        }

        connection.query(queryCR, CR, (err) => {
          if (err) {
            rollbackNeeded = true;
            console.log("Cr"+err.message)
            return connection.rollback(() => {
              res.status(500).send("Error inserting CR: " + err.message);
            });
          }

          if (!rollbackNeeded) {
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  res.status(500).send("Error committing transaction: " + err.message);
                });
              }

              res.send("Car registered successfully!");
            });
          }
        });
      });
    });
  });
});




//For Customer Registration


app.post('/customer', (req, res) => {
  console.log(req.body)
  const { Name, Address, ph_Number, Age, Zip_code, Gender } = req.body;

  // Generate a UUID for Cus_id
  const Cus_id = 'C'+uuid.v4().substring(0, 9);

  const values = [Cus_id, Name, Address, ph_Number, Age, Zip_code, Gender];

  const query = 'INSERT INTO Customer (Cus_id, Name, Address, ph_Number, Age, Zip_code, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, values, (error, result) => {
    if (error) {
      res.status(500).send("Not inserted error: " + error.message);
    } else {
      res.send(["Customer Inserted Successfully",Cus_id]);
    }
  });
});




//For Renting  car

app.post('/rental', (req, res) => {
  console.log(req.body)
  const { Days, Commision, Total_Price, Pick_up_TD, Drop_off_TD, Customer_Cus_id, Car_Reg_no } = req.body;
  Reg_id='R'+uuid.v4().substring(0, 10);
  T_id='T'+uuid.v4().substring(0, 10);
  const pickUpDate = new Date(Pick_up_TD);
  const formattedPickUpDate = pickUpDate.toISOString().slice(0, 19).replace('T', ' ');
  const dropOffDate = new Date(Drop_off_TD);
  const formattedDropOffDate = dropOffDate.toISOString().slice(0, 19).replace('T', ' ');

  const queryAvailability = `SELECT Available FROM Car WHERE Reg_no = '${Car_Reg_no}'`;

  connection.query(queryAvailability, (error, results) => {
    if (error) {
      return res.status(500).send("Error checking car availability");
    }

    connection.query(`SELECT * FROM Customer WHERE Cus_id='${Customer_Cus_id}'`, (error, result2) => {
      if (error) {
        return res.status(500).send("Error checking customer availability");
      }

      if (results.length > 0 && results[0].Available === 'Y' && result2.length > 0) {
        const insertQuery = 'INSERT INTO Rental_Reg (Reg_id, Days, Commision, Total_Price, Pick_up_TD, Drop_off_TD, Customer_Cus_id, Car_Reg_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [Reg_id, Days, Commision, Total_Price, formattedPickUpDate, formattedDropOffDate, Customer_Cus_id, Car_Reg_no];

        connection.query(insertQuery, values, (error, result) => {
          if (error) {
            return res.status(500).send("Error inserting rental data");
          }

          const transactionQuery = "INSERT INTO Transactions (T_id, Rental_Reg_Reg_id) VALUES (?, ?)";
          const transactionValues = [T_id, Reg_id];

          connection.query(transactionQuery, transactionValues, (error, result) => {
            if (error) {
              return res.status(500).send("Error inserting transaction data");
            }

            const updateAvailabilityQuery = `UPDATE Car SET Available = 'N' WHERE Reg_no = '${Car_Reg_no}'`;
            connection.query(updateAvailabilityQuery, (error, result) => {
              if (error) {
                return res.status(500).send("Error updating car availability");
              }

              return res.send("Rental, Transactions, and availability updated successfully");
            });
          });
        });
      } else {
        return res.send("Car not available or customer not found");
      }
    });
  });
});




app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
