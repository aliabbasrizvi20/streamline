# Streamline - Personalized Content Dashboard

Streamline is a personalized content dashboard that brings news, movie recommendations, and social content together in one clean and interactive platform.

The idea behind Streamline is to help users discover relevant content based on their interests while giving them control over how they organize and interact with their feed.

Built as part of the **Software Development Engineer (SDE) Intern - Frontend Development Assignment**.

## 🌐 Live Demo

https://streamline0.netlify.app/

---

# ✨ Features

## Personalized Content Feed

Streamline allows users to customize their dashboard experience based on their interests.

Users can:

- Select preferred categories
- Get personalized content recommendations
- Manage their own content experience

The dashboard includes:

- 📰 News articles
- 🎬 Movie recommendations
- 💬 Social posts

---

# 📊 Dashboard Experience

The dashboard provides a modern content management experience with:

- Responsive sidebar navigation
- Header section
- Content cards
- Loading states
- Error handling
- Empty states

Navigation includes:

- Home
- News
- Movies
- Social
- Favorites
- Settings

---

# 📰 News

Users can browse the latest news based on their selected preferences.

Features:

- News cards
- Images
- Headlines
- Descriptions
- Source information
- Read more actions

API:

- GNews API

---

# 🎬 Movie Recommendations

Streamline provides personalized movie recommendations using TMDB.

Features:

- Trending movies
- Movie posters
- Movie details
- Save favorites

API:

- TMDB API

---

# 💬 Social Feed

A social media style feed is included using mock data.

Features:

- Post cards
- Content preview
- Favorite actions

API:

- DummyJSON API

---

# ⭐ Favorites

Users can save their favorite content from different sections.

Supported:

- News articles
- Movies
- Social posts

Favorites are stored using local storage and remain available after refreshing the page.

---

# 🖱 Drag & Drop Organization

Users can personalize their dashboard by rearranging content cards.

Supported sections:

- News
- Movies
- Social

This provides a more flexible and interactive feed experience.

---

# 🔍 Search

Streamline includes content search functionality.

Features:

- Search across content categories
- Optimized requests
- Better browsing experience

---

# 🎨 UI / UX

The application focuses on a smooth and modern experience.

Includes:

- Dark dashboard design
- Responsive layout
- Hover animations
- Smooth transitions
- Loading indicators
- Interactive cards

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## State Management

- Redux Toolkit
- Local Storage

## API Integration

- GNews API
- TMDB API
- DummyJSON API

## Deployment

- Netlify

---
# 👤 User Flow

1. User opens Streamline.
2. User selects preferred categories.
3. Preferences are saved.
4. Personalized content is loaded.
5. User can:
   - Explore news
   - Discover movies
   - View social posts
   - Save favorites
   - Search content
   - Rearrange feed cards

---

# 🔐 Security

- API keys are stored securely using environment variables.
- Server-side API routes are used for protected API communication.
- User preferences are stored locally.

---

# ⚡ Performance

Streamline includes:

- Efficient API handling
- Pagination
- Loading states
- Error handling
- Optimized rendering
- Responsive design

---

# 🧪 Testing

Testing covers:

## Unit Testing

- Component rendering
- User interactions
- State updates

## Integration Testing

- API responses
- Content rendering
- Empty/error states

## End-to-End Testing

Important user flows:

- Search
- Favorites
- Navigation
- Drag and drop

---
# About Streamline

Streamline is designed to combine multiple content sources into a single personalized dashboard experience.

The project focuses on creating a clean interface with useful interactions while demonstrating modern frontend development practices using React, Next.js, TypeScript, and API integration.
