# Vendoo

<div align="center">
  <h3>🛍️ Modern E-commerce Store Management Platform</h3>
  <p>Create, manage, and grow your online store with ease</p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Store Management](#store-management)
- [User Dashboard](#user-dashboard)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**Vendoo** is a comprehensive e-commerce platform that empowers users to create and manage their own online stores. With an intuitive interface and powerful features, Vendoo makes it easy for anyone to start selling online, manage products, track orders, and grow their business.

### Why Vendoo?

- **Easy Store Creation**: Set up your online store in minutes
- **Complete Product Management**: Add, edit, and organize your products effortlessly
- **Professional Dashboard**: Monitor your business with real-time insights
- **Secure Authentication**: Multiple authentication options including Google Auth
- **Customizable Themes**: Switch between light and dark modes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

---

## ✨ Features

### 🔐 Authentication & Security

- **Google OAuth Integration**: Quick sign-in with Google account
- **Email Authentication**: Traditional email/password login
- **Email Verification**: Secure account verification via email links
- **Password Recovery**: Easy password reset functionality
- **Session Management**: Secure user sessions with auto-logout

### 🏪 Store Management

- **Store Creation**: Create and customize your online store
- **Store Settings**: Manage store information, description, and visibility
- **Public/Private Toggle**: Control store visibility to customers
- **Store Dashboard**: Comprehensive overview of your store performance

### 📦 Product Management

- **Product Creation**: Add products with detailed information
- **Product Updates**: Edit product details, prices, and inventory
- **Product Categories**: Organize products into categories
- **Inventory Tracking**: Monitor stock levels and availability
- **Product Images**: Upload and manage product photos

### 👤 User Profile

- **Profile Management**: Update personal information and contact details
- **Profile Photo**: Upload and change profile pictures
- **Account Settings**: Manage account preferences and security
- **Activity History**: Track your account activity

### 🎨 Customization

- **Theme Switcher**: Toggle between light and dark modes
- **Responsive Design**: Mobile-first, works on all devices
- **Professional UI**: Modern, clean interface built with Tailwind CSS
- **Smooth Animations**: Enhanced user experience with Framer Motion

### 📊 Dashboard Features

- **Analytics Overview**: View store performance metrics
- **Order Management**: Track and manage customer orders
- **Customer Insights**: Understand your customer base
- **Sales Reports**: Generate and export sales data

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Material-UI (MUI)** - React component library
- **Lucide React** - Beautiful icon set

### State Management

- **Zustand** - Lightweight state management
- **React Context API** - Theme and dashboard state

### Routing

- **React Router** - Client-side routing

### Authentication

- **Google OAuth 2.0** - Social authentication
- **Email/Password Auth** - Traditional authentication
- **JWT Tokens** - Secure session management

### Development Tools

- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A modern web browser
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/vendoo.git
   cd vendoo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=your_api_url
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_APP_NAME=Vendoo
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
vendoo/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── widgets/         # Custom widgets (buttons, inputs, etc.)
│   │   ├── dialogs/         # Modal dialogs
│   │   └── pages/           # Page components
│   ├── context/             # React Context providers
│   │   ├── ThemeContext.tsx
│   │   ├── DashboardContext.tsx
│   │   └── AuthContext.tsx
│   ├── store/               # Zustand stores
│   │   └── useUserStore.ts
│   ├── utils/               # Utility functions
│   │   ├── constants/       # Constants and colors
│   │   └── helpers/         # Helper functions
│   ├── assets/              # Static assets (images, fonts)
│   ├── styles/              # Global styles
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Public assets
├── .env                     # Environment variables
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md               # This file
```

---

## 🔐 Authentication

Vendoo supports multiple authentication methods:

### Google Authentication

- One-click sign-in with Google account
- Secure OAuth 2.0 implementation
- Automatic profile information retrieval

### Email Authentication

- Traditional email/password registration
- Email verification for new accounts
- Secure password hashing
- Password reset via email

### Session Management

- Automatic session expiry
- Remember me functionality
- Secure logout

---

## 🏪 Store Management

### Creating a Store

1. Sign in to your account
2. Navigate to "Store Settings"
3. Enter your store name and description
4. Click "Save Changes"

### Managing Store Visibility

- **Public Store**: Visible to all customers, products can be purchased
- **Private Store**: Hidden from customers, products cannot be viewed

Toggle between public and private in the Store Settings page.

### Updating Store Information

1. Go to "Store Settings"
2. Click "Edit Profile"
3. Update store name or description
4. Click "Save Changes"

---

## 📊 User Dashboard

The dashboard provides a comprehensive view of your store:

- **Overview**: Quick stats and metrics
- **Profile**: Manage personal information
- **Store Settings**: Configure store details
- **Products**: Add and manage products
- **Orders**: View and process orders
- **Theme Settings**: Customize appearance

---

## 🎨 Customization

### Theme Customization

Vendoo includes a professional theme system:

- **Light Mode**: Optimal for daytime use
- **Dark Mode**: Reduces eye strain in low-light environments
- **Auto-saved Preference**: Your theme choice is remembered

Toggle themes in the Settings page or use the theme controller.

### Color Customization

You can customize the color scheme by modifying:

```typescript
// src/utils/constants/colors.ts
export const AccentColorDark = "#your-color";
export const AccentColorWhite = "#your-color";
```

---

## 🤝 Contributing

We welcome contributions to Vendoo! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write clean, readable code
- Add comments for complex logic
- Test your changes thoroughly
- Follow the existing code style
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI components inspired by modern design principles
- Built with love by the Vendoo team

---

## 📞 Support

Need help? Here's how to get support:

- **Documentation**: Check our [Wiki](https://github.com/yourusername/vendoo/wiki)
- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/vendoo/issues)
- **Email**: support@vendoo.com
- **Discord**: Join our [community](https://discord.gg/vendoo)

---

## 🗺️ Roadmap

### Coming Soon

- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Bulk product import/export
- [ ] Customer reviews and ratings
- [ ] Email marketing tools
- [ ] SEO optimization tools

---

<div align="center">
  <p>Made with ❤️ by the Vendoo Team</p>
  <p>⭐ Star us on GitHub if you find this project useful!</p>
</di
