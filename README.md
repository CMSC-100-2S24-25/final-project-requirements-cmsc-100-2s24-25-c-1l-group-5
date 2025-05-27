# **Farm-To-Table**

**Farm-To-Table** is an e-commerce web application developed for the Department of Agriculture (DA) to facilitate direct transactions between farmers and customers. This platform emphasizes a direct link between consumers and farmers as the source of food, enabling the DA to compile and manage a catalog of items for sale in the public market.

## **Technology Stack**
- **Frontend**: React JS (supported by Tailwind and ShadCN components)
- **Backend**: Node JS with Express JS
- **Database**: MongoDB

## **Features**

### **User Management**
- User registration with email-based accounts (no verification required)
- Two user types: Customers (registered users) and Department of Agriculture (administrator/merchant)
- Secure login/logout functionality with authentication
- Protected routes for admin-only access
- Built-in DA administrative account for e-commerce management

### **E-commerce Management (Admin Dashboard)**
- **User Account Management**: Overview and reporting of all registered users
- **Product Listings Management**:
  - Add, edit, and manage product inventory
  - Product categories: Crops and Poultry items
  - Product attributes: Name, Type, Price, Description, Quantity
  - Sorting capabilities by name, type, price, or quantity (ascending/descending)
  - Automatic inventory updates when orders are confirmed
- **Order Fulfillment**: Confirm customer orders for final processing and delivery (Pending/Completed/Canceled)
- **Sales Reports**: 
  - Track products sold and sales income per product
  - Generate weekly, monthly, and annual sales summaries
  - Total sales amount reporting

### **Customer Shop Interface**
- **Product Browsing**: View all available products with sorting options
- **Shopping Cart Management**:
  - Add/remove items from cart
  - Real-time item count and total price calculation
- **Order Management**:
  - Place orders with cash-on-delivery payment method
  - Cancel orders before merchant confirmation
  - Order status tracking (Pending/Completed/Canceled)

### **Additional Features**
- Customer profile management with purchase history and personal information updates

## **Screenshots**
*Include screenshots of web app here*
- Admin Dashboard
- Product Management Interface
- Customer Shop View
- Shopping Cart
- Order Management
- Sales Reports

## **Installation**

1. Clone the repository from GitHub Classroom
2. Navigate to the project directory
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
5. Set up MongoDB database connection
6. Configure environment variables for database connection
7. Run both servers concurrently
   ```bash
   npm start
   ```

## **Usage**

### **For Customers:**
1. Register an account using your email address
2. Log in to access the shop
3. Browse available products (crops and poultry items)
4. Add desired items to your shopping cart
5. Review cart contents and total price
6. Place order (cash-on-delivery payment)
7. Track order status until merchant confirmation

### **For Department of Agriculture (Admin):**
1. Log in using the pre-configured admin account
2. Access the admin dashboard
3. Manage user accounts and view user statistics
4. Add, edit, or remove products from inventory
5. Monitor and confirm customer orders
6. Generate sales reports (weekly, monthly, annual)
7. Track inventory levels and update as needed

## **Notes**


## Contributions
This web application is developed by Group 5 C-1L (2nd Sem AY24-25):
- **Bañes**, Trisha Elaine (@[tmbanes](https://github.com/tmbanes))
- **Roldan**, Hervé (@[hfroldan](https://github.com/hfroldan))
- **Joyosa**, Eunel Jacob (@[yuuneeell](https://github.com/yuuneeell))
- **Pagcaliwagan**, Joshua (@[JoshuaPagcaliwagan-ui](https://github.com/JoshuaPagcaliwagan-ui))


