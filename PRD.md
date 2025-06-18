# Makiti Blog Post Viewer - AI Coding Agent Implementation Plan

## 🌐 Project Overview

**Objective:** Build a modern, clean, and responsive React app to view and like blog posts.

* **Framework:** React + TypeScript + Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router
* **State:** React Hooks
* **Testing:** Vitest + React Testing Library
* **Animations:** Framer Motion
* **Deployment:** Vercel

---

## 🚀 Step-by-Step Plan

### 1. **Scaffold the Project**

```bash
npm create vite@latest makiti-blog-viewer -- --template react-ts
cd makiti-blog-viewer
npm install
```

### 2. **Install Required Packages**

```bash
npm install react-router-dom axios tailwindcss framer-motion
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npx tailwindcss init -p
```

### 3. **Configure Tailwind**

Update `tailwind.config.js`:

```ts
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

In `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. **Project Structure**

```
src/
├── components/       // Reusable UI components
├── pages/            // Route-based views
├── services/         // API requests
├── hooks/            // Custom hooks
├── types/            // TypeScript interfaces/types
├── utils/            // Utility functions
├── App.tsx
├── main.tsx
```

### 5. **API Integration**

* Define `getPosts()` and `getUsers()` functions in `services/api.ts`
* Merge post data with author info in the UI layer

### 6. **Create Core Components**

#### ✍️ `PostCard.tsx`

Displays preview of a post with title, snippet, and author name.

#### 📄 `PostDetail.tsx`

Full post view with author info and a back button.

#### ♥️ `LikeButton.tsx`

Heart icon with animation and localStorage persistence.

### 7. **Pages**

* `Home.tsx`: List of blog posts
* `PostPage.tsx`: Single post view (dynamic route `/post/:id`)

### 8. **Like State Management**

* Create `useLikedPosts.ts` to manage liked posts using `localStorage`
* Utility function to store liked post IDs

### 9. **Responsive & Aesthetic Design**

* Use Tailwind breakpoints
* Add Framer Motion animations (fade-in, hover, like toggle)

### 10. **Routing**

Configure `react-router-dom` in `App.tsx`

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post/:id" element={<PostPage />} />
  </Routes>
</BrowserRouter>
```

### 11. **Search Feature (Bonus)**

Add `SearchBar.tsx` to filter posts by title or content in real-time.

### 12. **Testing**

* Test `LikeButton` toggling
* Test post fetch/render logic in `Home.tsx`
* Test `useLikedPosts` localStorage behavior

### 13. **Deploy to Vercel**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourname/makiti-blog-viewer.git
git push -u origin main
```

Then, go to [vercel.com](https://vercel.com), import project from GitHub and deploy.

---

## 📄 README.md Structure

````md
# Makiti Blog Viewer

## 🚀 Setup Instructions
```bash
git clone https://github.com/YOUR_USERNAME/makiti-blog-viewer.git
cd makiti-blog-viewer
npm install
npm run dev
````

## 🤔 Approach

* Clean separation of concerns with hooks, components, and services
* API data transformed to merge posts and author info
* Minimalist, elegant UI powered by Tailwind and Framer Motion
* Liked posts persist with localStorage

## ➕ Extra Features

* Search bar to filter posts
* Smooth animations with Framer Motion
* Responsive design
* Unit tests for core components

## 🌐 Live

[https://makiti-blog.vercel.app](https://makiti-blog.vercel.app)

```

---

## ✅ Deliverables Summary
- [x] Fetch & display blog posts
- [x] Show post details with navigation
- [x] Like button with localStorage
- [x] Responsive, elegant UI
- [x] Bonus: Search, animations, tests
- [x] Clean code & folder structure
- [x] Public GitHub repo
- [x] Deployed on Vercel

```
