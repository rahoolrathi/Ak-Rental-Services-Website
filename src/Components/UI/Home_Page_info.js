import React from 'react';

const HomeInfo = () => {
  const intro = "At AK, we are dedicated to providing premium car rentals all over Pakistan. We have a fleet of the latest models of cars, an expert vehicle maintenance team, and robust car booking software—to provide you with excellent rental vehicles.  Dustgo Yoga Mat: Ideal for Home Fitness – Approvatoperte.it winstrol pill blonde fitness enthusiast all sweaty and  We pride ourselves on stellar services at affordable rates. To rent a car in Karachi, simply select your car on our website, provide us with basic information, including date and time, and we’ll send a prepped car with a professional driver to your doorstep.";

  const forShopping = "Karachi hosts a number of fantastic shopping areas. Whether you need to refresh household items, buy local or international brand clothing, or stock up on wholesale edible goods, you will find a market or mall for your needs. To make this shopping spree a relaxed one, why not rent a sleek car from Nafees Rent A Car? We offer car rental services with driver facilities for your trips to any of these places in Karachi.";

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
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem', color: 'blue' }}>CAR RENTAL SERVICES IN KARACHI, PAKISTAN</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: '0 2rem 2rem 2rem', color: 'green' }}>{intro}</p>

      <div style={{ textAlign: 'center', marginBottom: '2rem', backgroundColor: '#f0f0f0' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'purple' }}>RENT A CAR IN KARACHI FOR SHOPPING</h1>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'darkorange' }}>NEED A COMFY RIDE FOR A SHOPPING SPREE AROUND THE CITY?</h3>
        <p style={{ fontSize: '1rem', margin: '0 2rem 2rem 2rem', color: 'black' }}>{forShopping}</p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'blue' }}>FAMOUS MARKETS (BAZAARS) IN KARACHI</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {marketsInKarachi.map((market, index) => (
            <li key={index} style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'green' }}>{market}</li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'blue' }}>FAMOUS SUPERMARKETS IN KARACHI</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {famousSupermarketsInKarachi.map((supermarket, index) => (
            <li key={index} style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'green' }}>{supermarket}</li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'blue' }}>FAMOUS SHOPPING MALLS IN KARACHI</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {famousShoppingMallsInKarachi.map((mall, index) => (
            <li key={index} style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'green' }}>{mall}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeInfo;
