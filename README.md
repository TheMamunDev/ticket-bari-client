# 🚌 TicketBari - Smart Ticket Management System

**TicketBari** is a comprehensive, full-stack web application designed to
modernize the way all type of transportation tickets are bought and sold in
Bangladesh. It connects travelers with transport vendors through a seamless
platform featuring real-time seat selection, secure booking management, and
role-based dashboards for Users, Vendors, and Admins.

---

## Live Website

**https://ticket-bari-client.vercel.app**

## Live Server

**https://ticket-bari-server-three.vercel.app**

---

## Key Features

### User Features (Travelers)

- **Smart Search:** Find tickets by route,date and transport type with
  auto-suggestions .
- **Visual Seat Booking:** Interactive "Bus Layout" map to select specific seats
  (e.g., A1, B2). and for others transport input quantity.
- **Ticket Management:** View booked tickets with a countdown timer to
  departure.
- **PDF Invoicing:** Download professional, print-ready ticket invoices.
- **Secure Payment Flow:** Integrated payment simulation with transaction
  history.

### Vendor Features (Tickets Operators)

- **Route Management:** Add new trips with details like departure time, price,
  and total capacity.also can update or delete route or ticket any time.
- **Dynamic Seat Maps:** Automatically generates seat grids based on the bus
  capacity (30, 40, or 50 seats).
- **Revenue Analytics:** Interactive charts (Area & Pie) to track sales and
  booking status.
- **Booking Requests:** Accept or reject booking requests from users.

### Admin Features (Platform Owner)

- **User Management:** Promote users to Vendors or Admins; mark fraudulent
  vendors.
- **Ticket Approval:** Review and approve/reject new ticket listings before they
  go live.
- **Advertisement Control:** Toggle "Featured" tickets to appear on the homepage
  (limit 6).
- **Global Oversight:** Monitor all platform activities and statistics.

---

## Technology Stack

### Front-End

- **React 19:** Core library for building the user interface.
- **Vite:** Blazing fast build tool and development server.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **DaisyUI & Shadcn:** Component library for pre-built UI elements (modals,
  buttons, badges).
- **Framer Motion:** For smooth animations (page transitions, bouncing bus
  loader).

### State Management & Data Fetching

- **TanStack Query (React Query):** For efficient server state management,
  caching, and auto-refetching.
- **Axios:** For making HTTP requests to the backend.
- **MongoDB:** Used mongodb as the database.

### Authentication & Security

- **Firebase Authentication:** Secure email/password and social login handling.
- **React Hook Form & Zod:** Robust form validation and schema checking.

### Tools & Utilities

- **Recharts:** For visualizing revenue and sales data on dashboards.
- **Swiper:** For responsive touch sliders (Hero section).
- **SweetAlert2 & React Toastify:** For beautiful alerts and toast
  notifications.
- **jspdf & html2canvas:** For generating downloadable PDF invoices.

---

## Dependencies

Here is a list of the major NPM packages used in this project:

```json
"dependencies": {
    "framer-motion": "^12.23.25",
    "tailwindcss": "^4.0.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.553.0",
    "react-icons": "^5.5.0",
    "swiper": "^12.0.3",

    "react-hook-form": "^7.66.0",
    "@hookform/resolvers": "^5.2.2",
    "zod": "^4.1.12",

    "@tanstack/react-query": "^5.90.7",
    "axios": "^1.13.2",
    "firebase": "^12.6.0",

    "recharts": "^3.5.1",
    "jspdf": "^3.0.4",
    "html2canvas": "^1.4.1",
    "sweetalert2": "^11.26.3",
    "react-toastify": "^11.0.5",
    "aos": "^2.3.4"
}
```

## Installation & Run Locally

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm**

### Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/TheMamunDev/ticket-bari-client.git
    cd ticket-bari-client
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables** Create a file named `.env.local` in the
    root directory. Add your Firebase and API keys here (Vite requires the
    `VITE_` prefix):

    ```env
    # Firebase Configuration
    VITE_apiKey=your_firebase_api_key
    VITE_authDomain=your_project_id.firebaseapp.com
    VITE_projectId=your_project_id
    VITE_storageBucket=your_project_id.firebasestorage.app
    VITE_messagingSenderId=your_messaging_sender_id
    VITE_appId=your_app_id

    # Backend API URL (If running a local server)
    VITE_BASE_URL=http://localhost:5000

    #Imgbb api key
    VITE_IMGBB_KEY=your_imgbb_api_key
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

5.  **Access the App** Open your browser and navigate to the link shown in the
    terminal (usually `http://localhost:5173`).
