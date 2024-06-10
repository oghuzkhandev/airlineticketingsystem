import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import background from "../images/maldives.jpeg";
import { Button, Radio, DatePicker, InputNumber, Modal } from "antd";
import "../styles/content.css";
import australia from "../images/Australia.jpeg";
import tkwallet from "../images/TK-Wallet.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneCircleCheck } from "@fortawesome/free-solid-svg-icons";

const { RangePicker } = DatePicker;

const MainPage = () => {
  const [flightType, setFlightType] = useState("roundtrip");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("Economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dates, setDates] = useState(null);
  const [locations, setLocations] = useState({
    fromLocations: [],
    toLocations: [],
  });
  const navigate = useNavigate();
  const isMilesMember = localStorage.getItem("isMilesMember") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/flights/locations"
        );
        const data = await response.json();
        if (response.ok) {
          setLocations(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching locations.");
      }
    };

    fetchLocations();
  }, []);

  const handleFlightTypeChange = (e) => {
    setFlightType(e.target.value);
  };

  const handleClassTypeChange = (e) => {
    setClassType(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setPassengers(adults + children);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = () => {
    if (!from || !to || !dates) {
      alert("Please fill in all fields before searching.");
      return;
    }
    const searchParams = {
      from,
      to,
      startDate:
        flightType === "roundtrip"
          ? dates[0].format("YYYY-MM-DD")
          : dates.format("YYYY-MM-DD"),
      endDate:
        flightType === "roundtrip"
          ? dates[1].format("YYYY-MM-DD")
          : dates.format("YYYY-MM-DD"),
      passengers,
      classType,
    };

    navigate("/search-flights", {
      state: { searchParams, passengers, classType },
    });
  };

  return (
    <div
      className="flex-grow bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container mx-auto px-4 py-40">
        <div className="h-[150px] w-full text-white text-center">
          <span>
            <p className="text-2xl font-bold text-white">HELLO</p>
            <p className="text-4xl font-bold text-white">
              Where do you want to explore?
            </p>
          </span>
        </div>
        <div className="rounded-lg card shadow-2xl p-8 w-[900px] mx-auto mb-10">
          <div className="flex justify-start mb-10 space-x-4">
            <Button className="!h-8 !px-4 text-lg" type="primary" danger>
              Flight
            </Button>
            <Button className="!h-8 !px-4 text-lg" type="primary" danger>
              Check-in / Manage booking
            </Button>
            <Button className="!h-8 !px-4 text-lg" type="primary" danger>
              Flight status
            </Button>
            {isAdmin && (
              <Link to="/add-flight">
                <button className="bg-purple-700 flex items-center justify-end text-white px-4 py-2 h-8 rounded-lg ml-4 hover:bg-white hover:text-purple-700 hover:border-purple-700 hover:border transition duration-500 ease-in-out">
                  Add Flight{" "}
                  <FontAwesomeIcon className="ml-4" icon={faPlaneCircleCheck} />
                </button>
              </Link>
            )}
          </div>
          <div className="flex justify-start items-center gap-5 mb-4">
            <Radio.Group onChange={handleFlightTypeChange} value={flightType}>
              <Radio value="roundtrip">Round Trip</Radio>
              <Radio value="oneway">One Way</Radio>
            </Radio.Group>
          </div>
          <div className="flex flex-row md:grid-cols-4 gap-3 mb-4 placeholderdiv">
            <select
              className="w-[200px] p-2 border border-gray-300 rounded bg-gray-200"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option value="">From</option>
              {locations.fromLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <select
              className="w-[200px] p-2 border border-gray-300 rounded bg-gray-200"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              <option value="">To</option>
              {locations.toLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
            {flightType === "roundtrip" ? (
              <RangePicker
                className="w-[200px] p-2 border border-gray-300 rounded bg-gray-200 cursor-pointer"
                onChange={(dates) => setDates(dates)}
              />
            ) : (
              <DatePicker
                className="w-[200px] p-2 border border-gray-300 rounded bg-gray-200 cursor-pointer"
                onChange={(date) => setDates(date)}
              />
            )}
            <div
              className="relative-placeholder cursor-pointer w-[250px] bg-gray-200 hover:bg-white hover:border-blue-400 p-2 border border-gray-300 rounded text-left text-sm"
              onClick={showModal}
            >
              <span>
                {passengers} {passengers === 1 ? "Passenger" : "Passengers"} (
                {classType})
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="!h-8 !px-4 text-lg"
              type="primary"
              onClick={handleSearch}
            >
              Search Flights
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg card">
            <img
              className="w-full h-[300px] rounded-t-lg"
              src={tkwallet}
              alt="TK Wallet"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                For advantageous refunds and fast payment: TK Wallet!
              </h3>
              <p className="text-gray-700">
                With TK Wallet, our special product for Miles&Smiles members,
                you can perform payments and complete refund processes quickly
                and easily via a digital wallet created in one of four available
                currencies. In addition, you can earn incremental TK Money via
                refunds to your digital wallet.
              </p>
              <Button type="primary" danger className="mt-4">
                Discover
              </Button>
            </div>
          </div>
          <div className="p-6 rounded-lg card">
            <img
              className="w-full rounded-t-lg"
              src={australia}
              alt="Australia"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                The sixth continent: Australia
              </h3>
              <p className="text-gray-700">
                Our journey to Australia, the world's largest island country,
                begins with Melbourne on 1st of March. Book your flight now on
                our website or app to explore this unique continent.
              </p>
              <Button type="primary" danger className="mt-4">
                Discover
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Cabin and passenger selection"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex justify-center mb-4 space-x-4">
          <Radio.Group
            onChange={handleClassTypeChange}
            value={classType}
            buttonStyle="solid"
          >
            <Radio.Button value="Economy">Economy Class</Radio.Button>
            <Radio.Button value="Business">Business Class</Radio.Button>
          </Radio.Group>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>Adult (12+)</div>
          <InputNumber min={1} max={10} value={adults} onChange={setAdults} />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>Child (0-12)</div>
          <InputNumber
            min={0}
            max={10}
            value={children}
            onChange={setChildren}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MainPage;
