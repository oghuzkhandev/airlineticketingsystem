import React from "react";
import Header from "../components/header";
import image from "../images/reception.png";
import cardimg from "../images/milessmilesCards.jpeg";
import { Button } from "antd";
import { Link } from "react-router-dom";

const MilesAndSmilesPage = () => {
  return (
    <div className="">
      <Header />
      <img
        src={image}
        alt="Miles&Smiles"
        className="w-full h-[500px] object-fill"
      />
      <main className="p-8 w-3/4 mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Miles and Smiles program features
        </h1>
        <p className="text-lg mb-6">
          Step into the privileged world of Miles&Smiles. Get award tickets,
          flight upgrades with your Miles, and benefit from Mile transfers and
          Mile conversion.
        </p>
        <div className="bg-white border border-gray-300 h-[100px] p-4 rounded-lg flex items-center justify-center">
          <span className="bg-red-500 text-white rounded-full w-7 h-7 p-3 flex items-center justify-center font-bold mr-2">
            i
          </span>
          <span className="text-xs ml-3">
            The Miles&Smiles card is now digital! You can access your
            Miles&Smiles digital card via the Turkish Airlines mobile
            application, and enjoy all the advantages and features of your
            physical card. Miles&Smiles program members will no longer receive
            physical Miles&Smiles cards.
          </span>
        </div>
        <div className="cardcontainer">
          <h2 className="text-2xl font-bold mt-6 text-center">
            Miles&Smiles card status
          </h2>
          <div className="space-y-4 mt-8 text-xs">
            <div className="bg-white border border-gray-300 p-4 rounded-lg flex">
              <img
                src={cardimg}
                alt="Classic Card"
                className="w-1/2 object-contain"
              />
              <div className="w-1/2 pl-4 text-left">
                <h3 className="text-xl font-bold mb-2">Classic</h3>
                <ul className="list-disc list-inside">
                  <li>
                    Earn Miles as you fly with Turkish Airlines and Star
                    Alliance Program partners
                  </li>
                  <li>Award tickets and cabin upgrade</li>
                  <li>
                    Earn Miles from Miles&Smiles credit cards transactions
                  </li>
                  <li>1,000 Welcome Miles after first flight</li>
                </ul>
              </div>
            </div>
            <div className="bg-white border border-gray-300 p-4 rounded-lg flex">
              <img
                src={cardimg}
                alt="Classic Plus Card"
                className="w-1/2 object-contain"
              />
              <div className="w-1/2 pl-4 text-left">
                <h3 className="text-xl font-bold mb-2">Classic Plus</h3>
                <ul className="list-disc list-inside">
                  <li>Is active over 25,000 Miles or on 40 flights.</li>
                  <li>Classic privileges</li>
                  <li>
                    Check-in at Business Class counters for domestic flights
                  </li>
                  <li>CIP passenger lounge access for domestic flights</li>
                  <li>Star Alliance Silver card privileges</li>
                  <li>
                    Additional baggage allowance of 10 kg *Except on flights
                    implementing piece baggage concept.
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white border border-gray-300 p-4 rounded-lg flex">
              <img
                src={cardimg}
                alt="Elite Card"
                className="w-1/2 object-contain"
              />
              <div className="w-1/2 pl-4 text-left">
                <h3 className="text-xl font-bold mb-2">Elite</h3>
                <ul className="list-disc list-inside">
                  <li>When you reach 40,000 Status Miles</li>
                  <li>Classic Plus Privileges</li>
                  <li>
                    Istanbul Airport International Arrivals Terminal special
                    passport desk
                  </li>
                  <li>
                    Istanbul International Arrivals Terminal special entrance
                    (Gate 5)
                  </li>
                  <li>
                    Use of CIP lounges on Turkish Airlines domestic and
                    international flights with a spouse and children or one
                    guest
                  </li>
                  <li>Private telephone helpline: +90 444 1 849</li>
                  <li>
                    Benefit from the advantages of Star Alliance Gold card
                  </li>
                  <li>
                    On routes with the weight concept, passengers may check an
                    additional 20kg in baggage. On routes with piece concept,
                    passengers may check 1 additional piece of baggage.
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white border border-gray-300 p-4 rounded-lg flex">
              <img
                src={cardimg}
                alt="Elite Plus Card"
                className="w-1/2 object-contain"
              />
              <div className="w-1/2 pl-4 text-left">
                <h3 className="text-xl font-bold mb-2">Elite Plus</h3>
                <ul className="list-disc list-inside">
                  <li>When you reach 80,000 Status Miles</li>
                  <li>Elite card privileges</li>
                  <li>
                    The right to 2 free of charge cabin upgrades on Turkish
                    Airlines flights
                  </li>
                  <li>Elite card gift for 3 people</li>
                  <li>Guaranteed seat on certain cabin classes</li>
                  <li>
                    On routes with the weight concept, passengers may check an
                    additional 25kg in baggage. On routes with piece concept,
                    passengers may check 1 additional piece of baggage.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Link to={"/signup-miles&smiles"}>
          <Button type="primary" danger className="w-full mt-5">
            Become a Miles&Smiles member
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default MilesAndSmilesPage;
