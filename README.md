# Food Delivery Platform

A full-stack food delivery application with user and admin interfaces, built using React (Vite) for the frontend and admin dashboard, and Node.js/Express with MongoDB for the backend.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This platform allows users to browse food items, add them to cart, place orders, and make payments. Admins can manage food items and view orders. The backend handles authentication, data storage, and payment integration.

---

## Folder Structure

```
Food-delivery/
│
├── admin/       # Admin dashboard (React + Vite)
├── backend/     # Node.js/Express backend API
└── frontend/    # User-facing frontend (React + Vite)
```

---

## Tech Stack

- **Frontend & Admin:** React, Vite, CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Passport.js, JWT
- **Payments:** Razorpay
- **File Uploads:** Multer, ImageKit

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/Food-delivery.git
cd Food-delivery
```

### 2. Install Dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../frontend
npm install
```

#### Admin

```sh
cd ../admin
npm install
```

### 3. Configure Environment Variables

- Copy `.env.example` to `.env` in each folder (if available).
- Fill in MongoDB URI, JWT secrets, Razorpay keys, etc.

### 4. Run the Applications

#### Backend

```sh
cd backend
npm start
```

#### Frontend

```sh
cd ../frontend
npm run dev
```

#### Admin

```sh
cd ../admin
npm run dev
```

---

## Environment Variables

**Backend `.env` example:**

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
```

---

## Scripts

| Folder    | Script        | Description                |
|-----------|--------------|----------------------------|
| backend   | `npm start`  | Start backend server       |
| frontend  | `npm run dev`| Start user frontend (Vite) |
| admin     | `npm run dev`| Start admin dashboard      |

---

## Features

### User Frontend

- Browse food items by category
- Add/remove items to cart
- Place orders and track order status
- User authentication (login/register)
- Payment integration (Razorpay)

### Admin Dashboard

- Add, edit, delete food items
- View all orders
- Manage food inventory

### Backend

- RESTful API for all operations
- JWT-based authentication
- File uploads for food images
- Payment order creation (Razorpay)
- MongoDB data storage

---

## API Endpoints

### Auth

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Food

- `GET /api/food` - List all food items
- `POST /api/food` - Add new food (admin)
- `PUT /api/food/:id` - Update food (admin)
- `DELETE /api/food/:id` - Delete food (admin)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:itemId` - Remove from cart

### Orders

- `POST /api/order` - Place order
- `GET /api/order` - Get user orders
- `GET /api/order/all` - Get all orders (admin)

### Payments

- `POST /api/razorpay/order` - Create Razorpay order

---

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any queries, open an issue or contact the maintainer.
