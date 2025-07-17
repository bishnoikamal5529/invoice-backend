# InvoiceIt Backend

This is the **backend API** for [InvoiceIt](https://invoice-backend-s4y6.onrender.com), a full-stack application that automates the workflow of managing inventory, suppliers, invoices, customers, and users. It is built using **Node.js**, **Express**, and **MongoDB**, with secure JWT-based authentication and role-level access control.

---

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT + bcrypt
- **Security Middleware:**
  - CORS
  - dotenv
  - Helmet
  - express-rate-limit
  - express-mongo-sanitize

---

## 🚀 Features

- 🔐 Secure JWT authentication (with guest session support)
- 🔑 Password hashing using bcrypt
- 🧑‍💼 Role-based access (Admin, Manager, Staff)
- 🌐 RESTful API structure for CRUD operations:
  - Users
  - Invoices
  - Customers
  - Inventory
  - Suppliers
- 🛡️ Middleware for API security and sanitization

---

## 🛠️ Getting Started

### Prerequisites

- Node.js
- MongoDB (local or cloud, e.g., MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bishnoikamal5529/invoice-backend.git
   cd invoiceit-backend

2. **Install dependencies**

   ```bash
   npm install

3. **Create a .env file in the root with the following environment variables:**
 
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRY=1d
    JWT_GUEST_EXPIRY=2h

4. **Start the development server**

    npm run dev


5. **Routes**

    Swagger Documentation: 


6. **Author**
    Kamal Suthar
    GitHub
    LinkedIn (optional)


