import React, { useState } from "react";
import background from "../images/view.jpeg";
import { Button, Radio, Input, DatePicker, InputNumber, Modal } from "antd";
import "../styles/content.css";

const { RangePicker } = DatePicker;

const MainPage = () => {
  const [flightType, setFlightType] = useState("roundtrip");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("Economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <div
      className="h-[450px] bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container mx-auto px-4 py-40">
        <div className="flex h-[150px] w-full items-start ml-20 text-white">
          <span>
            <p className="text-2xl">HELLO</p>
            <p className="text-4xl">Where do you want to explore?</p>
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-2xl p-8 w-[900px] mx-auto">
          <div className="flex justify-start mb-10 space-x-4">
            <Button type="primary" danger>
              Flight
            </Button>
            <Button type="primary" danger>
              Check-in / Manage booking
            </Button>
            <Button type="primary" danger>
              Flight status
            </Button>
          </div>
          <div className="flex justify-start items-center gap-5 mb-4">
            <Radio.Group onChange={handleFlightTypeChange} value={flightType}>
              <Radio value="roundtrip">Round Trip</Radio>
              <Radio value="oneway">One Way</Radio>
            </Radio.Group>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span className="text-sm">
                Award ticket - Buy a ticket with Miles
              </span>
            </label>
          </div>
          <div className="flex flex-row md:grid-cols-4 gap-3 mb-4 placeholderdiv">
            <Input
              className="w-[200px] p-2 border border-gray-300 rounded bg-gray-200"
              placeholder="From"
            />
            <Input
              className="w-[200px] p-2 border border-gray-300 rounded bg-gray-200"
              placeholder="To"
            />
            {flightType === "roundtrip" ? (
              <RangePicker className="w-[200px] p-2 border border-gray-300 rounded bg-gray-200 cursor-pointer" />
            ) : (
              <DatePicker className="w-[200px] p-2 border border-gray-300 rounded bg-gray-200 cursor-pointer" />
            )}
            <div
              className="relative-placeholder cursor-pointer w-[250px] bg-gray-200 hover:bg-white hover:border-blue-400 p-2 border border-gray-300 rounded text-left text-sm"
              onClick={showModal}
            >
              <span>
                {passengers} {passengers === 1 ? "Passanger" : "Passengers"} (
                {classType})
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="primary" Primary Button>
              Search Flights
            </Button>
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
