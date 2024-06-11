import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import { Button, Modal, message } from "antd";

const SearchFlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [isMilesMember, setIsMilesMember] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [useMiles, setUseMiles] = useState(false);
  const location = useLocation();
  const { searchParams, passengers, classType } = location.state || {};
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail");
  const firstName = localStorage.getItem("userFirstName");
  const milesMemberNumber = localStorage.getItem("milesMemberNumber");

  useEffect(() => {
    console.log("Stored User ID:", userId);
    const fetchFlights = async () => {
      if (!searchParams) return;

      const { from, to, startDate, endDate } = searchParams;

      try {
        const response = await fetch(
          `http://localhost:4000/api/flights/search-flights?from=${from}&to=${to}&startDate=${startDate}&endDate=${endDate}&userId=${userId}`
        );
        const data = await response.json();

        console.log("API Response:", data);

        if (response.ok) {
          setFlights(data.flights);
          setIsMilesMember(data.isMilesMember);
          if (data.flights.length === 0) {
            setMessageText("No flights found.");
          }
        } else {
          setMessageText(
            data.message || "An error occurred while fetching flights."
          );
        }
      } catch (error) {
        setMessageText("An error occurred while fetching flights.");
      }
    };

    fetchFlights();
  }, [searchParams, userId]);

  const showModal = (flight, useMiles = false) => {
    setSelectedFlight(flight);
    let price;
    if (useMiles) {
      price =
        classType === "Economy"
          ? flight.economyMilesPoints
          : flight.businessMilesPoints;
    } else {
      price =
        classType === "Economy" ? flight.economyPrice : flight.businessPrice;
    }
    setTotalPrice(price * passengers);
    setUseMiles(useMiles);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log("Sending userId:", userId);
    console.log("Sending flightId:", selectedFlight._id);
    console.log(
      "Sending milesMemberNumber:",
      localStorage.getItem("milesMemberNumber")
    );
    console.log("Token:", token);
    console.log("Email:", email);
    console.log("First Name:", firstName);
    console.log("Miles Member Number:", milesMemberNumber);

    try {
      const response = await fetch(
        `http://localhost:4000/api/flights/update-capacity/${selectedFlight._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ passengers, useMiles, userId, classType }),
        }
      );

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        message.success(
          "Congratulations, you have successfully purchased your flight ticket. OGUZHAN Airlines wishes you a good flight."
        );

        try {
          const purchaseResponse = await fetch(
            `http://localhost:4000/api/purchase-ticket`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                flightId: selectedFlight._id,
                milesMemberNumber: localStorage.getItem("milesMemberNumber"),
                paymentMethod: useMiles ? "miles" : "creditCard",
                amount: totalPrice,
                milesUsed: useMiles ? totalPrice : 0,
              }),
            }
          );

          const purchaseData = await purchaseResponse.json();

          if (purchaseResponse.ok) {
            console.log("Purchase saved successfully", purchaseData);
            if (!useMiles && localStorage.getItem("isMilesMember") === "true") {
              const milesPointsEarned = totalPrice * 0.1;
              message.success(
                `Congratulations! You have earned ${milesPointsEarned} Miles Points.`
              );
              const updateMilesResponse = await fetch(
                `http://localhost:4000/api/miles-points/update-miles`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify({
                    milesMemberNumber:
                      localStorage.getItem("milesMemberNumber"),
                    points: milesPointsEarned,
                  }),
                }
              );
              if (updateMilesResponse.ok) {
                console.log("Miles points updated successfully");

                const emailResponse = await fetch(
                  "http://localhost:4000/api/send-points-update-email",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      email,
                      firstName,
                      points: milesPointsEarned,
                    }),
                  }
                );

                if (emailResponse.ok) {
                  console.log("Email sent successfully");
                } else {
                  console.error("Failed to send email");
                }
              } else {
                console.error("Failed to update miles points");
              }
            }
          } else {
            console.error("Failed to save purchase:", purchaseData.message);
            message.error(`Failed to save purchase: ${purchaseData.message}`);
          }

          setIsModalVisible(false);
          const updatedFlights = flights.map((flight) =>
            flight._id === selectedFlight._id
              ? { ...flight, capacity: flight.capacity - passengers }
              : flight
          );
          setFlights(updatedFlights);
          navigate("/");
        } catch (purchaseError) {
          console.error("Error while saving purchase:", purchaseError);
          message.error(
            `Error while saving purchase: ${purchaseError.message}`
          );
        }
      } else {
        message.error(`Hata: ${responseData.message}`);
      }
    } catch (error) {
      message.error(`Hata: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl mt-20">
        {!isMilesMember && (
          <div className="text-center text-red-500 mb-4">
            <p>
              You are not a Miles&Smiles member. Would you like to benefit from
              its advantages?
            </p>
            <a href="/signup-miles&smiles" className="text-blue-500 underline">
              Sign up here.
            </a>
          </div>
        )}
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div
              key={index}
              className="border bg-gray-200 rounded-lg p-4 mb-4 shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">
                    Airline ID : {flight.flightCode}
                  </span>
                  <span className="block">
                    {flight.from} - {flight.to}
                  </span>
                  <span className="block">
                    Flight Date:{" "}
                    {new Date(flight.flightDate).toLocaleDateString([], {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">
                    {new Date(flight.flightDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="block">
                    Flight Duration: {flight.flightDuration}
                  </span>
                  <span className="block">
                    Operated by: {flight.operatedBy}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">Economy</span>
                    <span className="text-sm">Per passenger</span>
                    <span className="text-xl font-bold">
                      TRY {flight.economyPrice}
                    </span>
                    {isMilesMember && (
                      <span className="text-sm text-blue-500">
                        Miles Points: {flight.economyMilesPoints}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">Business</span>
                    <span className="text-sm">Per passenger</span>
                    <span className="text-xl font-bold">
                      TRY {flight.businessPrice}
                    </span>
                    {isMilesMember && (
                      <span className="text-sm text-blue-500">
                        Miles Points: {flight.businessMilesPoints}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <Button
                    type="primary"
                    danger
                    onClick={() => showModal(flight)}
                  >
                    Buy Ticket
                  </Button>
                  {isMilesMember && flight.economyMilesPoints > 0 && (
                    <Button
                      type="primary"
                      onClick={() => showModal(flight, true)}
                    >
                      Buy with Miles
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-red-500">
            <p>{messageText}</p>
          </div>
        )}
      </div>

      <Modal
        title="Ticket Purchase"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Total Price is:{" "}
          {useMiles ? totalPrice + " Miles" : "TRY " + totalPrice}
        </p>
      </Modal>
    </div>
  );
};

export default SearchFlightsPage;
