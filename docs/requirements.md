# Application Requirements

## 1. Functional Requirements

| ID    | Requirement                  | Description                                                                                             | Priority |
|-------|------------------------------|---------------------------------------------------------------------------------------------------------|----------|
| FR-01 | Browse Products              | Users must be able to view a gallery of all available flower arrangements.                              | High     |
| FR-02 | Filter Products              | Users should be able to filter products by category (e.g., Roses, Seasonal, Occasion).                  | Medium   |
| FR-03 | View Product Details         | Users must be able to click on a product to see more details, including a larger image and description. | High     |
| FR-04 | Add to Cart                  | Users must be able to add a product to their shopping cart from the product detail page.                | High     |
| FR-05 | Manage Cart                  | Users must be able to view their cart, change item quantities, and remove items.                         | High     |
| FR-06 | Checkout Process             | Users must be able to enter delivery address, recipient information, and payment details to place an order. | High     |
| FR-07 | Order Confirmation           | After a successful order, the user must be shown a confirmation screen with an order summary.           | High     |

## 2. Non-Functional Requirements

-   **Performance:** The application must load quickly, with product images optimized for the web.
-   **Responsiveness:** The UI must adapt to various screen sizes, including mobile, tablet, and desktop.
-   **Usability:** The interface should be intuitive and require minimal learning for new users.
-   **Security:** All checkout and payment forms must use HTTPS (simulated in prototype).

## 3. Data Models

### Product
```json
{
  "id": "prod-001",
  "name": "Sunshine Rose Bouquet",
  "price": 59.99,
  "description": "A vibrant bouquet of 12 yellow roses, perfect for brightening someone's day.",
  "imageUrl": "/assets/images/roses.jpg",
  "category": "Roses"
}
```

### CartItem
```json
{
  "productId": "prod-001",
  "quantity": 1,
  "unitPrice": 59.99
}
```

### Order
```json
{
  "orderId": "ord-12345",
  "items": [ { "productId": "prod-001", "quantity": 1 } ],
  "deliveryAddress": { ... },
  "paymentInfo": { ... },
  "totalAmount": 64.98
}
```