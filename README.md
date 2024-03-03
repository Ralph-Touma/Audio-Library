# Audio Library Project

## Description

This project is a comprehensive solution for managing an audio library. It uses Node.js, Express, and MongoDB to provide API endpoints for managing categories, albums, songs, and user authentication.

## Features

- CRUD operations for categories, albums, and songs
- User authentication (signup and login) with JWT
- Adding songs to albums with category validation
- Deleting songs with validation checks
- Fetching album details by ID
- Filtering songs by album ID, category, and sorting by creation date

## API Endpoints

### Categories
- **Add a Category**: `POST /api/categories`
- **Get All Categories**: `GET /api/categories`

### Albums
- **Create an Album**: `POST /api/albums`
- **Update an Album**: `PUT /api/albums/:id`
- **Delete an Album**: `DELETE /api/albums/:id`
- **Get Album by ID**: `GET /api/albums/:id`

### Songs
- **Add a Song to an Album**: `POST /api/songs`
- **Delete a Song**: `DELETE /api/songs/:id`

### Users
- **User Signup**: `POST /api/users/signup`
- **User Login**: `POST /api/users/login`


