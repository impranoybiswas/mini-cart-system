# Mini Cart System

A modern, highly responsive, and feature-rich mini e-commerce cart system built with Next.js, Redux Toolkit, and Tailwind CSS.

🌍 **Live Demo:** [https://mini-cart-system.vercel.app/](https://mini-cart-system.vercel.app/)

## ✨ Key Features

- **Modern & Premium UI:** Crafted with Tailwind CSS, utilizing `oklch` color spaces, smooth CSS micro-animations, glassmorphism (`backdrop-blur`), and elegant hover effects to mimic an Apple-tier aesthetic experience.
- **Dynamic Product Filtering:** Instantly filter products by category labels, adjustable price ranges, and real-time inventory availability ("In Stock" / "Out of Stock").
- **Real-time Global Search:** Full-text product search implemented using debounced `useSearchParams` URL parameter syncing, ensuring shareable URLs without causing server-render bottlenecks.
- **Robust Cart Management:** Handled fully by Redux Toolkit slice architecture featuring a slide-out cart drawer, persistent adding/removing of items, and calculation of total costs.
- **Out of Stock Handling:** "Out of stock" items are gracefully integrated with disabled buttons, modified visual states (grayscale filtering), and recognizable system-wide badge notifications.
- **Product Details Modal:** Interactive modal popup offering full product specs without navigation delays.
- **Dark/Light Theme Toggle:** Native system-aware theme handling with manual overrides available on the top unified navigation bar.
- **Toast Notifications:** User feedback mechanism powered by `react-hot-toast` for cart interactions.
- **Responsive Layout:** Perfectly scales from tiny mobile screens to large desktop monitors utilizing CSS Grid & Flexbox optimizations.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router, React Server/Client Components Paradigm)
- **Library:** React 18 / 19
- **Language:** TypeScript
- **State Management:** Redux Toolkit (`react-redux`, `useAppDispatch`, `useAppSelector`)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js and `npm` installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mini-cart-system.git
   cd mini-cart-system
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```text
├── src/
│   ├── app/                # Next.js App Router (page.tsx, layout.tsx)
│   ├── components/         # Reusable React components (Navbar, SidebarFilter, ProductList, Cart, ProductModal, etc.)
│   ├── data/               # Structured data mocking database products and inventory trackers
│   ├── store/              # Redux setup containing `cartSlice.ts` and dispatch hooks
│   ├── styles/             # Global CSS stylesheets
│   └── types/              # Global TypeScript interfaces
└── public/
    └── images/             # Local optimized imagery assets used across the shop showcase
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
