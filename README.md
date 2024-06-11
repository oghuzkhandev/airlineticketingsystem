Airline Ticketing System

DATA MODELS ( ER DIAGRAM )

Below is the ER diagram representing the data models used in the system:

User
•	firstName: String
•	lastName: String
•	username: String, unique
•	password: String, hashed
•	email: String, unique
•	dateOfBirth: Date
•	country: String
•	city: String
•	gender: String
•	isMilesMember: Boolean, default: false
•	milesPoints: Number, default: 0
•	milesMemberNumber: String, unique
•	isAdmin: Boolean, default: false

Flight
•	flightCode: String, unique
•	from: String
•	to: String
•	flightDate: Date
•	flightDuration: String
•	operatedBy: String
•	economyPrice: Number
•	businessPrice: Number
•	economyMilesPoints: Number
•	businessMilesPoints: Number
•	capacity: Number

Purchased
•	userId: ObjectId, reference to User
•	flightId: ObjectId, reference to Flight
•	paymentMethod: String
•	amount: Number
•	milesUsed: Number
•	purchaseDate: Date

PROJECT STRUCTURE :

Client
•	Users can search for flights, buy tickets, and login to the Miles&Smiles program.
•	Interfaces are designed to be accessible from mobile, browser, and admin panels.

API Gateway
•	Provides endpoints for:
o	Adding flights
o	Searching flights
o	Buying tickets
o	Adding Miles to accounts

Flight Service
•	Handles flight-related operations and interacts with the queue system for new Miles&Smiles customers.

Notification Service
•	Sends emails for new customers and Miles points updates.
•	Interacts with the queue system to process new customer registrations and points updates.

TECHNOLOGIES :

•Backend: Node.js, Express.js
•Frontend: React.js
•Database: MongoDB
•Messaging: RabbitMQ
•Caching: node-cache

Setup and Installation

Prerequisites

•	Node.js
•	MongoDB
•	RabbitMQ
• Cache

Installation :

Install dependencies for both frontend and backend:

# Backend
cd api
npm install

# Frontend
cd ../client
npm install

Create a .env file in the api directory with the following content:

MONGO_URI
PORT
EMAIL_USER
EMAIL_PASS
JWT_SECRET
RABBITMQ_URL

FEATURES:

-	Admin Functionality:
  o	Authenticated Admin users can add flights to specified dates with capacity.
-	User Functionality:
  o	Users can search for flights by airport, dates, and number of passengers.
  o	Options for flexible dates and direct flights.
  o	Ticket purchasing with capacity management.
  o	Miles&Smiles members can:
    	Login and have their information populated.
    	Buy tickets with miles points if they have enough.
    	Create a profile and receive a welcome email.
-	Points Update:
  o	Nightly process to update points in member accounts.
  o	Other airlines in the Miles&Smiles program can also update miles points (Authenticated Service).
  o	Scheduled tasks to send emails for new customers and miles points updates.
-	Caching:
  o	Airport names and airline destinations are cached for performance.

ENDPOINTS:

User
•	Signup:
o	POST /api/signup
•	Login:
o	POST /api/login
•	Find User by ID:
o	GET /api/finduserbyid/:id

Miles
•	Miles Signup:
o	POST /api/miles-signup
•	Send Points Update Email:
o	POST /api/send-points-update-email
•	Update Miles:
o	POST /api/update-miles
•	Miles Members:
o	GET /api/miles-members
•	Miles Member by Number:
o	GET /api/miles-member/:milesMemberNumber

Purchase
•	Purchase Ticket:
o	POST /api/purchase-ticket

Flights
•	Add Flight:
o	POST /api/add-flight
•	Search Flights:
o	GET /api/search-flights
•	Update Flight Capacity:
o	PUT /api/update-capacity/:flightId
•	Get Locations:
o	GET /api/locations

Caching
•	Airports:
o	GET /api/airports
•	Airline Destinations:
o	GET /api/airline-destinations

Protected Route
•	Protected Route:
o	GET /api/protected-route

DOCKER SETUP :

This project includes Dockerfile configurations for both the API and Client applications.

### API Dockerfile
The `Dockerfile.api` sets up the environment for the Node.js API application.

### Client Dockerfile
The `Dockerfile.client` sets up the environment for the React client application and uses NGINX to serve the built files.

### How to Build and Run Docker Containers

#### API
To build and run the API container:

docker build -t myapi -f Dockerfile.api .
docker run -d -p 4000:4000 --name myapi-container myapi

VIDEO : 

https://drive.google.com/file/d/1nc5PERg8-Ps3H0umWpWZEtFi6w3G60oj/view?usp=sharing

