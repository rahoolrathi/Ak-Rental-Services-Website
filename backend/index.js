const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql2');

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
  var query=`update Car C join  Rental_Reg R on C.reg_no =R.car_reg_no set C.available= 'Y' where R.car_reg_no=reg_no and R.drop_off_TD <=CURRENT_TIMESTAMP`
  connection.query(query,(err)=>
  {
    if(err)
    {
      console.log("Error happened");
    }
  })
  
    query='select * from Car';
  connection.query(query,(error,results)=>{
    if(error)
    {
      res.send("Error Happened");
    }
    res.send(results);
  })

});




//For car registration Takes Owner Car and Resgisration info


app.post('/RegisterCar', (req, res) => {
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
      Car_Reg_no
  } = req.body;

  const owner = [O_id, Name, Address, ph_Number, Gender];
  const Car = [Reg_no, C_name, Model, Available, Descripton, Price_Per_Day, Transmission, Mileage, Int_img, Ext_img, Reg_Year, Color, Owner_O_id];
  const CR = [CR_id, Car_Reg_no];
  const queryOwner = 'insert into owner ( O_id, Name, Address, ph_Number, Gender) values (?,?,?,?,?)';
  const queryCar = 'insert into Car (Reg_no  ,  C_name  ,   Model ,   Available  ,   Descripton  ,   Price_Per_Day  ,  Transmission  ,  Mileage  ,  Int_img  ,  Ext_img  ,  Reg_Year  ,  Color  ,    Owner_O_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?)';
  const queryCR = 'insert into car_registration (CR_id,Car_Reg_no) values(?,?)';
  let rollbackNeeded = false;

  connection.beginTransaction((err) => {
      if (err) throw err;

      connection.query(queryOwner, owner, (err) => {
          if (err) {
              rollbackNeeded = true;
              return connection.rollback(() => {
                  res.status(500).send("Error inserting Owner: " + err.message);
              });
          }

          connection.query(queryCar, Car, (err) => {
              if (err) {
                  rollbackNeeded = true;
                  return connection.rollback(() => {
                      res.status(500).send("Error inserting Car: " + err.message);
                  });
              }

              connection.query(queryCR, CR, (err) => {
                  if (err) {
                      rollbackNeeded = true;
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
  const { Cus_id, Name, Address, ph_Number, Age, Zip_code, Gender } = req.body;

  const values = [Cus_id, Name, Address, ph_Number, Age, Zip_code, Gender];

  const query = 'INSERT INTO Customer (Cus_id, Name, Address, ph_Number, Age, Zip_code, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, values, (error, result) => {
    if (error) {
      res.status(500).send("Not inserted error: " + error.message);
      res.send(values)
    } else {
      res.send("Customer Inserted Successfully");
    }
  });
});





//For Renting  car

app.post('/rental', (req, res) => {
  const { Reg_id, Days, Commision, Total_Price, Pick_up_TD, Drop_off_TD, Customer_Cus_id, Car_Reg_no, T_id } = req.body;
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
