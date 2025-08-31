# Food Delivery Application

A full-stack food delivery platform with separate admin and user frontends, and a Node.js backend. Features include user authentication, food item management, cart, order placement, and payment integration.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Details](#folder-details)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
Food-delivery/
│
├── admin/       # Admin dashboard (React + Vite)
├── backend/     # Node.js/Express backend API
└── frontend/    # User-facing frontend (React + Vite)
```

---

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Passport.js, JWT
- **Payments:** Razorpay
- **File Uploads:** Multer, ImageKit
- **Linting:** ESLint

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
- Set up MongoDB URI, JWT secrets, Razorpay keys, etc.

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

## Folder Details

### `/backend`

- `server.js` - Entry point for Express server.
- `config/` - DB, passport, Razorpay, etc. configs.
- `controllers/` - Route logic for auth, food, cart, orders, users.
- `middleware/` - Auth and admin checks.
- `models/` - Mongoose schemas.
- `routes/` - Express routers for all endpoints.
- `uploads/` - Uploaded images.
- `utils/` - Multer and ImageKit helpers.

### `/frontend`

- `src/` - React app for users.
- `components/` - UI components (Navbar, FoodItem, etc.).
- `pages/` - Main pages (Home, Cart, Orders, etc.).
- `context/` - Global state management.

### `/admin`

- `src/` - React app for admins.
- `components/` - Navbar, Sidebar, etc.
- `pages/` - Add, List, Orders management.

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
