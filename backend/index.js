const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql2');
const uuid = require('uuid');
const multer = require('multer');


const storage = multer.diskStorage({
  destination:function(req,file,cb)
  {
    return cb(null,"../Frontend/src/Components/Assets")
  },
  filename:function(req,file,cb)
  {
    return cb(null,`${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage: storage });
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



app.get('/getOwnerData/:ownerId', async (req, res) => {
  console.log("like " + req.params.ownerId);
  try {
    const ownerId = req.params.ownerId;

    // Call the GetOwnerCars procedure
    const [cars] = await connection.promise().query('CALL GetOwnerCars(?)', [ownerId]);

    // Call the GetOwnerRentalRegistrations procedure
    const [rentalRegistrations] = await connection.promise().query('CALL GetOwnerRentalRegistrations(?)', [ownerId]);

    // Send the result as JSON
    res.json({ cars: cars[0], rentalRegistrations: rentalRegistrations[0] });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//ak cars


app.get('/ak', (req, res) => {
  // Update Car availability for cars with drop_off_TD in the past
  const updateProcedure = 'CALL UpdateCarAvailability()';
  connection.query(updateProcedure, (err) => {
    if (err) {
      console.error('Error updating Car availability:', err);
      return res.status(500).send('Error updating Car availability');
    }

    // Select available cars
    const selectQuery = 'SELECT * FROM Car WHERE Available = "Y" and Owner_O_id=52';

    connection.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Error selecting available cars:', error);
        return res.status(500).send('Error selecting available cars');
      }

      res.json(results);
    });
  });
});

//Showing Data

app.get('/', (req, res) => {
  // Update Car availability for cars with drop_off_TD in the past
  const updateProcedure = 'CALL UpdateCarAvailability()';
  connection.query(updateProcedure, (err) => {
    if (err) {
      console.error('Error updating Car availability:', err);
      return res.status(500).send('Error updating Car availability');
    }

    // Select available cars
    const selectQuery = 'SELECT * FROM Car WHERE Available = "Y" and Owner_O_id <> 52';

    connection.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Error selecting available cars:', error);
        return res.status(500).send('Error selecting available cars');
      }

      res.json(results);
    });
  });
});

app.post('/getUserDataByRegNo', async (req, res) => {
  try {
    const { Reg_no } = req.body;

    // Call the GetCustomerInfoByRentalRegNo procedure
    const [userData] = await connection.promise().query('CALL GetCustomerInfoByRentalRegNo(?)', [Reg_no]);

    // Send the result as JSON
    console.log(userData)
    res.json({ userData: userData[0] });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/SignIn', async (req, res) => {
  try {
    const { id, password } = req.body;

    connection.query("SELECT * FROM Owner WHERE O_id = ? AND Password = ?", [id, password], (error, result) => {
      if (error) {
        console.error('Error during owner sign-in:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (result && result.length > 0) {
        // Owner with the given ID and password found, handle successful login
        console.log(result)
        res.status(200).json({ message: result });
      } else {
        // No matching owner found, handle login failure
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  } catch (error) {
    console.error('Error during owner sign-in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/RegisterCar', upload.array('file', 2), async (req, res) => {
  
    // Ensure files were uploaded
    if (!req.files || req.files.length < 2) {
      return res.status(400).send("Please upload both interior and exterior images.");
    }

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
      Reg_Year,
      Color,
      Owner_O_id,
      CR_id,
      Car_Reg_no,
      Doors,
      Passengers,
      Luggage,
      Air_Conditioning,
      password
    } = req.body;

    const owner = [O_id, Name, Address, ph_Number, Gender,password];
    const Car = [
      Reg_no,
      C_name,
      Model,
      Available,
      Descripton,
      Price_Per_Day,
      Transmission,
      Mileage,
      null, // Int_img path will be stored in the database
      null, // Ext_img path will be stored in the database
      Reg_Year,
      Color,
      Owner_O_id,
      Doors,
      Passengers,
      Luggage,
      Air_Conditioning,
    ];

    const CR = [Car_Reg_no];
    const intImgPath = req.files[0].filename; // Assuming the first file is the interior image
    const extImgPath = req.files[1].filename;
    // Check if file paths are available
    if (!intImgPath || !extImgPath) {
      return res.status(500).send("Error: Interior and exterior image paths are required.");
    }

    Car[8] = intImgPath; // Set the path for the interior image
    Car[9] = extImgPath; // Set the path for the exterior image

    const queryOwner = 'INSERT INTO owner (O_id, Name, Address, ph_Number, Gender,password) VALUES (?, ?, ?, ?, ?,?)';
    const queryCar = `
      INSERT INTO Car 
        (Reg_no, C_name, Model, Available, Descripton, Price_Per_Day, Transmission, Mileage, Int_img, Ext_img, Reg_Year, Color, Owner_O_id, Doors, Passengers, Luggage, AC) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const queryCR = 'INSERT INTO car_registration (Car_Reg_no) VALUES (?)';
    let rollbackNeeded = false;
  
    connection.beginTransaction((err) => {
      if (err) throw err;
  
      connection.query(queryOwner, owner, (err) => {
        if (err) {
          rollbackNeeded = true;
          console.log("owner"+err.message)
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
                res.status=200;
                res.send("Car registered successfully!");
              });
            }
          });
        });
      });
    });
  });

  app.post('/RegisterCarSec', upload.array('file', 2), async (req, res) => {
  
    // Ensure files were uploaded
    if (!req.files || req.files.length < 2) {
      return res.status(400).send("Please upload both interior and exterior images.");
    }

    const {
      Reg_no,
      C_name,
      Model,
      Available,
      Descripton,
      Price_Per_Day,
      Transmission,
      Mileage,
      Reg_Year,
      Color,
      Owner_O_id,
      CR_id,
      Car_Reg_no,
      Doors,
      Passengers,
      Luggage,
      Air_Conditioning,
      password
    } = req.body;
    const Car = [
      Reg_no,
      C_name,
      Model,
      Available,
      Descripton,
      Price_Per_Day,
      Transmission,
      Mileage,
      null, // Int_img path will be stored in the database
      null, // Ext_img path will be stored in the database
      Reg_Year,
      Color,
      Owner_O_id,
      Doors,
      Passengers,
      Luggage,
      Air_Conditioning,
    ];

    const CR = [Car_Reg_no];
    const intImgPath = req.files[0].filename; // Assuming the first file is the interior image
    const extImgPath = req.files[1].filename;
    // Check if file paths are available
    if (!intImgPath || !extImgPath) {
      return res.status(500).send("Error: Interior and exterior image paths are required.");
    }

    Car[8] = intImgPath; // Set the path for the interior image
    Car[9] = extImgPath; // Set the path for the exterior image

    
    const queryCar = `
      INSERT INTO Car 
        (Reg_no, C_name, Model, Available, Descripton, Price_Per_Day, Transmission, Mileage, Int_img, Ext_img, Reg_Year, Color, Owner_O_id, Doors, Passengers, Luggage, AC) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const queryCR = 'INSERT INTO car_registration (Car_Reg_no) VALUES (?)';
    let rollbackNeeded = false;
  
    connection.beginTransaction((err) => {
      if (err) throw err;
  
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
  //to delete car
  app.delete('/api/deleteCar/:regId', async (req, res) => {
    const regId = req.params.regId;
  
    try {
      // Call the stored procedure
      await connection.promise().execute('CALL DeleteCarData(?)', [regId]);
  
      res.status(200).send("Successfully Deleted");
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).send("Error");
    }
  });
//For Customer Registration


app.post('/customer', (req, res) => {
  console.log(req.body)
  const {Cus_id, Name, Address, ph_Number, Age, Zip_code, Gender } = req.body;

  // Generate a UUID for Cus_id

  const values = [Cus_id, Name, Address, ph_Number, Age, Zip_code, Gender];

  const query = 'INSERT INTO Customer (Cus_id, Name, Address, ph_Number, Age, Zip_code, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  connection.query(query, values, (error, result) => {
    if (error) {
      console.log(error.message)
      res.status(500).send("Not inserted error: " + error.message);
    } else {
      res.send(["Customer Inserted Successfully",Cus_id]);
    }
  });
});




//For Renting  car

app.post('/rental', (req, res) => {
  console.log(req.body)
  const { Days, Commision, Total_Price, Pick_up_TD, Drop_off_TD, Customer_Cus_id, Car_Reg_no,Reg_id } = req.body;
  
  
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
        console.log(error.message);
        return res.status(500).send("Error checking customer availability");
      }

      if (results.length > 0 && results[0].Available === 'Y' && result2.length > 0) {
        const insertQuery = 'INSERT INTO Rental_Reg (Reg_id, Days, Commision, Total_Price, Pick_up_TD, Drop_off_TD, Customer_Cus_id, Car_Reg_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [Reg_id, Days, Commision, Total_Price, formattedPickUpDate, formattedDropOffDate, Customer_Cus_id, Car_Reg_no];

        connection.query(insertQuery, values, (error, result) => {
          if (error) {
            console.log(error.message);
            return res.status(500).send("Error inserting rental data");
          }

          const transactionQuery = "INSERT INTO Transactions ( Rental_Reg_Reg_id) VALUES (?)";
          const transactionValues = [Reg_id];

          connection.query(transactionQuery, transactionValues, (error, result) => {
            if (error) {
              console.log(error.message);
              return res.status(500).send("Error inserting transaction data");
            }

            const updateAvailabilityQuery = `UPDATE Car SET Available = 'N' WHERE Reg_no = '${Car_Reg_no}'`;
            connection.query(updateAvailabilityQuery, (error, result) => {
              if (error) {
                console.log(error.message);
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
