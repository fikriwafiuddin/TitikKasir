### Pages

1. Products
2. Categories
3. Orders
4. Reports
5. POS
6. Landing Page
7. Login
8. Register

```
app/
├── auth/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (protected)/
│   ├── pos/
│   │   └── page.tsx
│   ├── categories/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
│   ├── orders/
│   │   └── page.tsx
│   └── reports/
│       └── page.tsx
└── page.tsx
```

### UI Description

1. Landing Page
   This page is the landing page for the Titik Kasir application. It should showcase the application's superior features.

2. Login Page
   This page is the login page for the Titik Kasir application. It should allow users to login to the application. User can login using email and password or google. When the user is using a wide screen, display an image or something interesting and informative (use another web reference) (must be appropriate for this application).

3. Register Page
   This page is the register page for the Titik Kasir application. It should allow users to register for an account. User can register using email and password or google. When the user is using a wide screen, display an image or something interesting and informative (use another web reference) (must be appropriate for this application).

4. POS Page
   This page is the POS page for the Titik Kasir application. It should allow users to create orders.
   - add products to the cart and checkout.
   - search for products and add them to the cart.
   - filter products by category.
   - view the cart and checkout.
   - view the order history.
   - display products with box elements.
   - There is a cart section that uses a sheet. The cart will appear after pressing a button. The cart component displays a list of products in the cart and the total purchase amount. After successfully creating the order data, a shopping receipt appears.

5. Categories Page
   This page is the categories page for the Titik Kasir application.
   - It should allow users to manage categories.
   - add categories, edit categories, and delete categories.

6. Products Page
   This page is the products page for the Titik Kasir application. It should allow users to manage products.
   - add products, edit products, and delete products.
   - filter products by category.
   - search for products.
   - display products with table.

7. Orders Page
   This page is the orders page for the Titik Kasir application. It should allow users to view orders.
   - view orders.
   - filter orders by month.
   - search for orders.
   - there is a button to display the receipt.
   - edit and delete orders.
   - display orders with table.

8. Reports Page
   This page is the reports page for the Titik Kasir application. It should allow users to view reports.
   - stats section (today's sales, total revenue, total products, low stock products).
   - displaying a monthly sales graph.
   - displaying a monthly revenue graph.
   - displaying a best-selling products.
   - displaying a low stock products.
