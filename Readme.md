# Insura Connect
A comprehensive insurance portal that allows users to explore, purchase, manage, and claim insurance policies.
Built with the MERN stack (MongoDB, Express, React, Node.js), Insura Connect provides a seamless and secure experience for both users and administrators.



## Features
- **User Authentication**: Secure registration and login system.
- **Policy Management**: Users can browse, purchase, and renew insurance policies.
- **User Dashboard**: View active policies, renewal status, and claim history.
- **Claims Section**: Users can submit claims, and admins can approve or reject them.
- **Admin Panel**: Manage users, policies, and claim requests.
- **Payment Integration**: Secure payment gateway for policy purchases. ( //optional ) [exapmle instamojo or razorpay]
- **Notifications**: Alerts for policy expirations, claim updates, and admin approvals.(optional)
- **Responsive Design**: Optimized for all devices.

## Tech Stack
- **Frontend**: React, Vite, Axios, Material-UI,Tilwind css
- **Backend**: Node.js, Express, JWT for authentication
- **Database**: MongoDB with Mongoose ORM
- **Storage**: MongoDB for user data and policy information
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend), MongoDB Atlas (Database)

## Installation

### Prerequisites
-VS Code
- Node.js (v16 or higher)           (Download node js in ur sysytem)
- MongoDB (local or MongoDB Atlas)   [download MONGO-DB COMPASS )
- Git (Downlaod github desktop )

### Steps
#### Clone the repository: in github desktop and open in vs code

#### Set up the backend:
cd backend
npm install


#### Set up the frontend

cd frontend
npm install


#### Configure environment variables
Create a `.env` file in the backend directory:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
PORT=5000
JWT_SECRET=your_jwt_secret
```
Replace `<username>`, `<password>`, and `dbname` with your MongoDB credentials.

#### Run the backend

cd backend
npm start
```

#### Run the frontend

cd frontend
npm run dev


#### Access the application
Open your browser and navigate to `http://localhost:5173`.

## API Endpoints
| Method | Endpoint                 | Description                         |
|--------|--------------------------|-------------------------------------|
| POST   | /api/auth/register       | Register a new user                |
| POST   | /api/auth/login          | Login and get JWT token            |
| GET    | /api/policies            | Get available policies             |
| POST   | /api/policies/purchase   | Purchase an insurance policy       |
| GET    | /api/claims              | Get user claims                    |
| POST   | /api/claims/submit       | Submit an insurance claim          |
| PUT    | /api/claims/:id/approve  | Admin approves a claim             |
| DELETE | /api/policies/:id        | Admin removes a policy             |

## Folder Structure
```
insura-connect/
├── backend/
│   ├── config/            # Database and middleware configuration
│   ├── controllers/       # API logic and request handling
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   └── server.js          # Backend entry point
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Entry point for the frontend
│   └── vite.config.js     # Vite configuration
└── README.md              # Project documentation
```

## Contributing
Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- MongoDB Documentation
- JWT Authentication Guide
- Express.js API Development

