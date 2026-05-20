# Source Asia Backend Assignment

Backend assignment implementation using Node.js and Express.js.

## Tech Stack

- Node.js
- Express.js
- In-memory data storage using JavaScript Maps
- UUID for product IDs

---

# Project Architecture

```txt
src/
├── middleware/
├── part1/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── store/
├── part2/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── store/
```

Architecture follows layered separation:

- Routes → API endpoints
- Controllers → request/response handling
- Services → business logic
- Store → in-memory data layer

---

# Setup Instructions

## Install dependencies

```bash
npm install
```

## Run server

```bash
npm start
```

## Run in development mode

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:3000
```

---

# Part 1 — Rate Limited API

## POST `/request`

Creates a rate-limited request.

### Request Body

```json
{
  "user_id": "user123",
  "payload": {
    "message": "hello"
  }
}
```

### Success Response

```json
{
  "message": "Request accepted"
}
```

### Rate Limit

- Maximum 5 requests
- Rolling 60-second window
- Per user_id basis

### Error Codes

| Status | Description         |
| ------ | ------------------- |
| 400    | Invalid request     |
| 429    | Rate limit exceeded |

---

## GET `/stats`

Returns request statistics.

### Example Response

```json
{
  "stats": {
    "user123": {
      "accepted": 5,
      "rejected": 1
    }
  }
}
```

---

# Part 2 — Product Catalog API

## POST `/products`

Creates a product.

### Request

```json
{
  "name": "iPhone 15",
  "sku": "APPLE-IPHONE-15",
  "image_urls": ["https://example.com/image1.jpg"],
  "video_urls": ["https://example.com/video1.mp4"]
}
```

---

## GET `/products`

Returns paginated product list.

### Query Params

| Param  | Default |
| ------ | ------- |
| limit  | 20      |
| offset | 0       |

### Optimization

This endpoint intentionally excludes full media arrays to avoid returning unnecessary large payloads.

Returned fields:

- image_count
- video_count
- thumbnail_url

instead of complete URL arrays.

---

## GET `/products/:id`

Returns complete product details including media arrays.

---

## POST `/products/:id/media`

Appends additional media URLs to an existing product.

---

# Design Decisions

## Rate Limiting

Implemented using rolling window timestamp filtering.

Reason:

- Fairer than fixed windows
- Prevents burst abuse at window boundaries

---

## Concurrency Safety

Node.js runs JavaScript in a single-threaded event loop.

Rate limit operations are implemented synchronously without async gaps to avoid race conditions.

---

## Product List Optimization

Media arrays are stored separately from core product metadata.

This ensures:

- `/products` remains lightweight
- `/products/:id` returns full media only when necessary

---

# Validation Rules

## Product Validation

- name required
- sku required
- sku unique
- maximum 20 image URLs
- maximum 20 video URLs
- only valid HTTP/HTTPS URLs allowed

---

# Notes

- Data storage is fully in-memory
- Restarting the server resets all stored data
- No external database used

---

# Author

Kshitiz Bakliwal
