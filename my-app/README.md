# ZeroBase Frontend (ZeroBase/my-app)

This is the mobile frontend for the ZeroBase application, built with **Expo** and **React Native**. It connects to the ZeroBase backend for data persistence and authentication.

## 🚀 Prerequisites

- **Node.js** (v18 or later)
- **Expo CLI**: `npm install -g expo-cli`
- **Android Studio** (for Android Emulator) or **Expo Go** app on your phone.

## 🛠 Installation

1.  Navigate to the `my-app` directory:
    ```bash
    cd src/ZeroBase/my-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## 🏃‍♂️ Running Locally

1.  **Start the Expo Server**:
    ```bash
    npx expo start
    ```
    OR to run specifically for web:
    ```bash
    npm run web
    ```

2.  **Open the App**:
    -   **Android Emulator**: Press `a` in the terminal.
    -   **Web Browser**: Press `w`.
    -   **Mobile Device**: Scan the QR code using the Expo Go app.

## 🔗 Backend Connection

The app interacts with the backend via `services/api.ts`.
By default, it is configured to connect to the local Firebase Emulator:
-   **Base URL**: `http://10.0.2.2:5002/zerobasebe/us-central1/api` (Special IP for Android Emulator to access host localhost).

> **Note**: If running on a physical device or web, you might need to update the API base URL to your machine's local IP address (e.g., `http://192.168.1.5:5002...`).

## 📂 Project Structure

-   `app/`: Expo Router pages (screens).
    -   `(tabs)/`: Main tab navigation (Home, Budget, Profile).
    -   `guide.tsx`: User Guide screen.
-   `components/`: Reusable UI components.
    -   `auth/`: Login and Signup screens.
    -   `home/`: Home screen components (SafeToSpendCard, TransactionList).
    -   `QuickAddModal.tsx`: Modal for adding transactions.
-   `contexts/`: Global state management (AppContext).
-   `services/`: API communication (api.ts).

## ✨ Key Features

-   **Zero-Based Budgeting**: "Income - Expense = 0" philosophy.
-   **Quick Add**: Fast transaction entry.
-   **Safe-to-Spend**: Real-time calculation of spendable funds.
-   **Multi-user Support**: Data isolation per user.
-   **User Guide**: Built-in documentation.

