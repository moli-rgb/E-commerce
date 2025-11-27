# E-Commerce Platform

A modern, full-stack e-commerce application built with Next.js, Express.js, and MongoDB.

## Features

### Frontend
- 🛍️ **Product Catalog** - Browse all products with beautiful card layouts
- 🔍 **Smart Search** - Real-time product filtering by name and description
- 🛒 **Shopping Cart** - Add items to cart with instant feedback notifications
- ✨ **Animated Notifications** - Elegant slide-in notifications for cart actions
- 🎨 **Premium UI** - Glassmorphism effects, gradients, and smooth animations
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔐 **Authentication** - User login and registration

### Backend
- 🔒 **JWT Authentication** - Secure user authentication with JSON Web Tokens
- 📦 **Product Management** - CRUD operations for products
- 🛒 **Cart Management** - Add, update, and remove cart items
- 📝 **Order Processing** - Create and manage orders
- 🖼️ **File Upload** - Support for product images and videos
- 🗄️ **MongoDB Database** - Scalable NoSQL database

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & bcryptjs
- **File Upload**: Multer
- **CORS**: Enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/moli-rgb/E-commerce.git
cd E-commerce
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Configuration

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Frontend Environment Variables
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

#### Start Frontend Application
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Seed Database (Optional)
To populate the database with sample products:
```bash
cd backend
node seedProducts.js
```

## Project Structure

```
E-commerce/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files
│   ├── server.js        # Entry point
│   └── seedProducts.js  # Database seeder
│
├── frontend/
│   ├── app/             # Next.js app directory
│   │   ├── cart/        # Cart page
│   │   ├── login/       # Login/Register page
│   │   ├── products/    # Products pages
│   │   └── page.tsx     # Home page
│   ├── components/      # React components
│   ├── lib/             # Utilities (API client)
│   ├── store/           # Redux store & slices
│   └── public/          # Static assets
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order status (Admin)

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import repository in Vercel
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy

### Backend (Vercel/Render/Railway)
1. Create `vercel.json` in backend directory
2. Set root directory to `backend`
3. Add environment variables (MONGO_URI, JWT_SECRET)
4. Deploy

## Features Showcase

### Smart Search
Type in the search bar to filter products in real-time by name or description.

### Add to Cart Notification
When you add an item to cart, a beautiful green notification slides in from the right showing:
- Success checkmark
- Product name
- Quantity added

The notification automatically disappears after 3 seconds.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**moli-rgb**
- GitHub: [@moli-rgb](https://github.com/moli-rgb)

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database
- Vercel for hosting capabilities
