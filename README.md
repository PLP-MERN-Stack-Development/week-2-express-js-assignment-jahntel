# Express.js RESTful API

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and set your API key
4. Start the server: `npm start`

## API Endpoints
- `GET /`: Returns "Hello World"
- `GET /api/products`: List all products (supports ?category, ?page, ?limit, ?search)
- `GET /api/products/:id`: Get specific product
- `POST /api/products`: Create new product
- `PUT /api/products/:id`: Update product
- `DELETE /api/products/:id`: Delete product
- `GET /api/products/stats`: Get product statistics

## Request Examples
### Create Product

POST /api/products
Headers: X-API-Key: your-api-key
Body:
{
"name": "Product Name",
"description": "Product Description",
"price": 99.99,
"category": "electronics",
"inStock": true
}

### Get Products with Pagination

GET /api/products?page=1&limit=10&category=electronics
Headers: X-API-Key: your-api-key

## Response Examples
### Success Response
```json
{
  "products": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Product Name",
      "description": "Product Description",
      "price": 99.99,
      "category": "electronics",
      "inStock": true,
      "createdAt": "2025-07-03T13:18:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}

Error response
{
  "error": {
    "message": "Product not found",
    "status": 404
  }
}

 Testing Instructions
To test the API:
1. Install dependencies: `npm install`
2. Create `.env` file with `API_KEY=your-api-key`
3. Start server: `npm start`
4. Use Postman/Insomnia with the following headers:
   - `X-API-Key: your-api-key`
   - `Content-Type: application/json`
5. Test endpoints with appropriate request bodies


