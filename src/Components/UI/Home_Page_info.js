import React from "react";
import './Home_info.css'
const HomeInfo = () => {
  const intro =
    "At AK, we are dedicated to providing premium car rentals all over Pakistan. We have a fleet of the latest models of cars, an expert vehicle maintenance team, and robust car booking software—to provide you with excellent rental vehicles.  Dustgo Yoga Mat: Ideal for Home Fitness – Approvatoperte.it winstrol pill blonde fitness enthusiast all sweaty and  We pride ourselves on stellar services at affordable rates. To rent a car in Karachi, simply select your car on our website, provide us with basic information, including date and time, and we’ll send a prepped car with a professional driver to your doorstep.";

  const forShopping =
    "Karachi hosts a number of fantastic shopping areas. Whether you need to refresh household items, buy local or international brand clothing, or stock up on wholesale edible goods, you will find a market or mall for your needs. To make this shopping spree a relaxed one, why not rent a sleek car from Nafees Rent A Car? We offer car rental services with driver facilities for your trips to any of these places in Karachi.";

  const weddingsInfo =
    "Weddings in Karachi can be as complex as they are enjoyable. After a whole day of rushing to sort gifts and get glammed up, the last thing you need is to worry about transportation to the venue. No worries—Nafees Rent A Car has you covered. We have a fleet of high-end cars with comfortable interiors to give you a hassle-free ride to get you to the venue on time!";

  const chauffeuredInfo =
    "In addition to our car rentals, we also offer car driver services. If you opt for a rented car with chauffeur services, we will send you a skilled, licensed, and highly professional driver to your doorstep to pick you up and whisk you away to your wedding festivities securely and punctually. Rent a chauffeured car with us today!";

  const airportTransfersInfo =
    "Travelling can be quite a hassle. Starting and ending a journey right with a nice ride at the airport is vital. Let Nafees Rent A Car facilitate a fantastic car rental service with a trained driver for all your airport transfers. We are available 24/7 for airport transfer services in Pakistan.";

  const executiveClassInfo =
    "AK  A Car provides car rental services for various purposes, from casual to executive trips. Start your business deals in style to make a lasting impression by renting an excellent brand car, complete with a professional driver.";

  const oneWayTripsInfo =
    "When it comes to one-way car rentals, and you need a comfy alternative to a cab or public transport, why not rent a remarkable ride at Nafees Rent A Car? We promise a smooth journey to any destination.";

  const marketsInKarachi = [
    "Bolton Market",
    "Empress Market",
    "Paper Market",
    "Soldier Bazaar",
    "Sunday Bazaar",
    "Tariq Road",
    "Urdu Bazaar",
    "Zainab Market",
  ];

  const famousSupermarketsInKarachi = [
    "Al-Fatah",
    "Bin Hashim",
    "Carrefour",
    "Chase/Chase Up/Chase Value",
    "Imtiaz Supermarket",
    "Metro",
    "SPAR Supermarket",
  ];

  const famousShoppingMallsInKarachi = [
    "Atrium Mall",
    "Dolmen Mall",
    "Lucky One Mall",
    "Millennium Mall",
    "Ocean Mall",
  ];

  return (
    <div className="container">
      <div className="section">
        <h1 className="title">CAR RENTAL SERVICES IN KARACHI, PAKISTAN</h1>
        <p className="paragraph">{intro}</p>
      </div>

      <div className="section">
        <h1 className="title">RENT A CAR IN KARACHI FOR SHOPPING</h1>
        <h3 className="subtitle">NEED A COMFY RIDE FOR A SHOPPING SPREE AROUND THE CITY?</h3>
        <p className="paragraph">{forShopping}</p>
      </div>

      <div className="section">
        <h1 className="title">FAMOUS MARKETS (BAZAARS) IN KARACHI</h1>
        <ul className="list">
          {marketsInKarachi.map((market, index) => (
            <li key={index} className="list-item">{market}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h1 className="title">FAMOUS SUPERMARKETS IN KARACHI</h1>
        <ul className="list">
          {famousSupermarketsInKarachi.map((supermarket, index) => (
            <li key={index} className="list-item">{supermarket}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h1 className="title">FAMOUS SHOPPING MALLS IN KARACHI</h1>
        <ul className="list">
          {famousShoppingMallsInKarachi.map((mall, index) => (
            <li key={index} className="list-item">{mall}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h1 className="title">RENT A CAR IN KARACHI FOR WEDDINGS</h1>
        <h3 className="subtitle">MAKE YOUR OCCASIONS MORE MEMORABLE WITH A LUXURY RIDE!</h3>
        <p className="paragraph">{weddingsInfo}</p>
      </div>

      <div className="section">
        <h1 className="title">CHAUFFEURED CAR RENTALS</h1>
        <p className="paragraph">{chauffeuredInfo}</p>
        <p className="paragraph">Rent a chauffeured car with us today!</p>
      </div>

      <div className="section">
        <h1 className="title">RENT A CAR IN KARACHI FOR AIRPORT TRANSFERS</h1>
        <h3 className="subtitle">A QUICK AND RELAXING RIDE TO AND FROM THE AIRPORT</h3>
        <p className="paragraph">{airportTransfersInfo}</p>
      </div>

      <div className="section">
        <h1 className="title">EXECUTIVE CLASS RENT A CAR IN KARACHI</h1>
        <p className="paragraph">{executiveClassInfo}</p>
        <p className="paragraph">LUXURY CAR, PROFESSIONAL TRANSPORT—A SEAMLESS EXECUTIVE EXPERIENCE!</p>
      </div>

      <div className="section">
        <h1 className="title">RENT A CAR IN KARACHI FOR ONE WAY TRIPS</h1>
        <h3 className="subtitle">NEED A CAR FOR A ONE-WAY TRIP TO YOUR LOCATION?</h3>
        <p className="paragraph">{oneWayTripsInfo}</p>
      </div>
    </div>
  );
};

export default HomeInfo;
