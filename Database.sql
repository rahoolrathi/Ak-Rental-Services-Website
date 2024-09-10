drop database Car_rental;
CREATE DATABASE Car_rental;
USE Car_rental;

CREATE TABLE Car (
  Reg_no VARCHAR(20) NOT NULL,
  C_name VARCHAR(50) NOT NULL,
  Model INTEGER NOT NULL,
  Available CHAR(1) NOT NULL,
  Descripton VARCHAR(4000) NOT NULL,
  Price_Per_Day INTEGER NOT NULL,
  Transmission VARCHAR(20) NOT NULL,
  Mileage INTEGER NOT NULL,
  Int_img varchar(4000), -- Storing the entire image as Binary Large Object
  Ext_img varchar(4000), -- Storing the entire image as Binary Large Object
  Reg_Year VARCHAR(4) NOT NULL,
  Color VARCHAR(50) NOT NULL,
  Owner_O_id int  NOT NULL,
  Doors INTEGER,
  Passengers INTEGER,
  Luggage INTEGER,
  AC VARCHAR(1)
);

ALTER TABLE Car ADD CONSTRAINT Car_PK PRIMARY KEY (Reg_no);

CREATE TABLE car_registration 
( 
  CR_id INT AUTO_INCREMENT PRIMARY KEY , 
  Car_Reg_no VARCHAR(20) NOT NULL 
) AUTO_INCREMENT = 1000;

CREATE TABLE Customer 
( 
  Cus_id INT AUTO_INCREMENT PRIMARY KEY , 
  Name VARCHAR(50) NOT NULL , 
  Address VARCHAR(4000) NOT NULL , 
  ph_Number VARCHAR(13) NOT NULL , 
  Age INTEGER NOT NULL , 
  Zip_code INTEGER NOT NULL , 
  Gender VARCHAR(1) NOT NULL 
) AUTO_INCREMENT = 1000;

CREATE TABLE owner 
( 
  O_id INT AUTO_INCREMENT PRIMARY KEY , 
  Name VARCHAR(50) NOT NULL , 
  Address VARCHAR(4000) NOT NULL , 
  ph_Number VARCHAR(13) NOT NULL , 
  Gender VARCHAR(1) NOT NULL ,
  Password VARCHAR(255) NOT NULL 
) AUTO_INCREMENT = 1000;

CREATE TABLE Rental_Reg 
( 
  Reg_id INT AUTO_INCREMENT PRIMARY KEY, 
  Days INTEGER NOT NULL , 
  Commision INTEGER NOT NULL , 
  Total_Price INTEGER NOT NULL , 
  Pick_up_TD TIMESTAMP NOT NULL , 
  Drop_off_TD TIMESTAMP NOT NULL , 
  Customer_Cus_id int NOT NULL , 
  Car_Reg_no VARCHAR(20) NOT NULL 
) AUTO_INCREMENT = 1000;

CREATE TABLE Transactions (
  T_id INT AUTO_INCREMENT PRIMARY KEY,
  Rental_Reg_Reg_id Int UNIQUE,
  FOREIGN KEY (Rental_Reg_Reg_id) REFERENCES Rental_Reg(Reg_id)
) AUTO_INCREMENT = 1000;

ALTER TABLE Car ADD CONSTRAINT Car_Owner_FK FOREIGN KEY (Owner_O_id) 
REFERENCES owner (O_id);

ALTER TABLE car_registration ADD CONSTRAINT Car_Registration_Car_FK FOREIGN KEY (Car_Reg_no) 
REFERENCES Car (Reg_no);

ALTER TABLE Rental_Reg ADD CONSTRAINT Rental_Reg_Car_FK FOREIGN KEY (Car_Reg_no) 
REFERENCES Car (Reg_no);

ALTER TABLE Rental_Reg ADD CONSTRAINT Rental_Reg_Customer_FK FOREIGN KEY (Customer_Cus_id) 
REFERENCES Customer (Cus_id);

DELIMITER //

CREATE PROCEDURE GetOwnerCars(IN ownerID INT)
BEGIN
    SELECT *
    FROM Car
    WHERE Owner_O_id = ownerID;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetOwnerRentalRegistrations(IN ownerID INT)
BEGIN
    -- Temporary table to store car registration numbers of the owner
    CREATE TEMPORARY TABLE TempCarRegistrations AS
    SELECT Reg_no
    FROM Car
    WHERE Owner_O_id = ownerID;

    -- Retrieve all rental registration data for the cars owned by the specified owner
    SELECT Rental_Reg.*
    FROM Rental_Reg
    JOIN TempCarRegistrations ON Rental_Reg.Car_Reg_no = TempCarRegistrations.Reg_no;

    -- Drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS TempCarRegistrations;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetCustomerInfoByRentalRegNo;

DELIMITER //

CREATE PROCEDURE GetCustomerInfoByRentalRegNo(IN rentalRegNo INT)
BEGIN
    -- Retrieve customer information based on the given rental registration number
    SELECT Customer.Name, Customer.ph_Number
    FROM Customer
    JOIN Rental_Reg ON Customer.Cus_id = Rental_Reg.Customer_Cus_id
    WHERE Rental_Reg.Reg_id = rentalRegNo;
END //

DELIMITER ;

-- Create Trigger
DELIMITER //

CREATE PROCEDURE UpdateCarAvailability()
BEGIN
  UPDATE Car C
  JOIN Rental_Reg R ON C.Reg_no = R.Car_Reg_no
  SET C.Available = 'Y'
  WHERE R.Car_Reg_no = C.Reg_no
    AND R.Drop_off_TD <= CURRENT_TIMESTAMP
    AND R.Drop_off_TD = (
      SELECT MAX(Drop_off_TD)
      FROM Rental_Reg
      WHERE Car_Reg_no = C.Reg_no
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE DeleteCarData(IN regNo VARCHAR(20))
BEGIN
    -- Declare variables
    DECLARE curId INT;
    DECLARE done BOOLEAN DEFAULT FALSE;

    DECLARE carRegIds CURSOR FOR
        SELECT CR_id FROM car_registration WHERE Car_Reg_no = regNo;

    -- Declare handler for exceptions
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Loop through all car_registration IDs
    OPEN carRegIds;
    read_loop: LOOP
        FETCH carRegIds INTO curId;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Delete records from Transactions table
        DELETE FROM Transactions WHERE Rental_Reg_Reg_id IN (SELECT Reg_id FROM Rental_Reg WHERE Car_Reg_no = regNo);

        -- Delete records from car_registration table
        DELETE FROM car_registration WHERE Car_Reg_no = regNo;

        -- Delete records from Rental_Reg table
        DELETE FROM Rental_Reg WHERE Car_Reg_no = regNo;

        -- Delete the car entry itself
        DELETE FROM Car WHERE Reg_no = regNo;
    END LOOP;

    CLOSE carRegIds;

    -- You can add additional logic or error handling as needed
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER AfterRentalRegistration
AFTER INSERT ON Rental_Reg
FOR EACH ROW
BEGIN
    -- Update the availability of the rented car to 'N'
    UPDATE Car
    SET Available = 'N'
    WHERE Reg_no = NEW.Car_Reg_no;
END //


DELIMITER ;
select * from owner;