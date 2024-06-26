# DrinkJoy Frontend | Reviro Internship

## Introduction:
This document provides detailed information on the implementation of the **Partner** and **Admin** modules for the Reviro Internship TechStart project. The purpose of this project is to provide users with access to free beverages at participating establishments during designated times through a subscription-based model.

## Project Structure
The project is divided into three primary user roles:
* **Regular User**.
* **Partner**
* **Admin**

This README focuses on the **Partner** and **Admin** modules.

## Technology Stack:
* Frontend: Next.js, React
* Styling: Tailwind CSS, MUI (Material-UI)
* State Management: Zustand (only for modal component)
* Form Management: Formik, server actions
* Validation: Yup, Zod
* Authentication: JWT
* QR Code Generation: react-qr-code
* Charts: Chart.js, React-Chartjs-2
* Date Management: Day.js
* Backend: JSON Server for mock data at first steps

## Deploy
* [Vercel](https://drinkjoy-frontend.vercel.app/)

## Setup Instructions
### Clone the Repository: 
```js
git clone https://github.com/Reviro-Spring-TechStart2024-T1/frontend.git
cd frontend
```

### Install Dependencies:
```js
yarn
```

### Set Up Environment Variables:
Create a ***.env.local*** file in the root directory. Use the following template:

```js
API_URL=our_api_url
NEXT_PUBLIC_API_URL=our_next_public_api_url
DEPLOY_URL=our_deploy_url
LOCAL_URL=http://localhost:8080

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=our_google_maps_api_key
NEXT_PUBLIC_MAP_ID=our_map_id

SECRET_KEY=our_secret_key
NEXT_SHARP_PATH=/tmp/node_modules/sharp
```
Replace the placeholder values with the actual values. Contact **Ilias Kadyrkulov** or **Aktan Moldokeev** through email ***ilias.kadyrkulov@gmail.com*** or ***aktanmoldokeev123@gmail.com*** to obtain the necessary environment variable values.

### Run the Application:.
__in dev mode__
```js
yarn dev
```
__or in prod mode__
```js
yarn build
yarn start
```

## Partner Module
### Features

- Registration and Authentication:
    * Partners receive login credentials from the admin.
    * Ability to log out.

- Profile Management:
    * Partners can view establishment details such as location, name, description, contact details, and upload an avatar (logo); edit and delete them.
    * Partners can change their password.

- Menu Management:
    * Add, update, or remove beverages from the menu.
    * Specify beverage details like name, category, price, description, and availability status.

- Customer Management:
    * Access list of all clients of the establishment.

- Order Management:
    * View incoming orders and customer information.
    * View statistics on charts and data.

- QR Management:
    * QR code is generated upon menu id of each establishment.

- Support:
    * Handle user inquiries and technical issues.

## Admin Module
### Features

- Registration and Authentication:
    * Admins log in using backend-created credentials.
    * Ability to log out.

- User Management:
    * Access list of all clients (users).

- Partner Management:
    * Access list of all partners.
    * Create or block partners as necessary.

- Menu Management:
    * Add, update, or remove menu categories.

- Subscription Management:
    * View, manage subscription plans, including options for 1-month, 3-month, 6-month, and 1-year durations, and also free trial periods.

- Support:
    * Handle user and partner inquiries and technical issues.