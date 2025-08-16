# DevBlog - Modern Blog Application

A beautiful, modern blog application built with React, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and a comprehensive content management system.

## 🚀 Features

- **Homepage**: Elegant grid layout displaying all blog posts with search and filtering
- **Post Detail Page**: Full post view with smooth transitions and beautiful typography
- **Create Post**: Rich form for creating new blog posts with tag management and optional image upload
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Powered by Framer Motion for delightful user experience
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Mock Data Service**: Complete data layer simulation without backend dependency
- **Image Upload**: Optional featured image upload with drag-and-drop support and preview
- **File Validation**: Image type and size validation with user-friendly error messages

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth transitions
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with validation
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **File Upload**: Multer for handling multipart/form-data
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation & Setup

1. **Clone the repository**

    \`\`\`bash

   cd devblog
   \`\`\`

3. **Install dependencies**

   \`\`\`bash
   npm install
   \`\`\`

5. **Install backend dependencies (optional)**

    \`\`\`bash
   cd server
   npm install
   cd ..

7. **Start the backend server (optional)**

    \`\`\`bash
   cd server

9. **Open your browser**
   Navigate to \`http://localhost:5173\`

## 🖼️ Image Upload Feature

The application now supports optional featured image uploads for blog posts:

### Frontend Features:
- **Drag & Drop**: Intuitive drag-and-drop interface for image selection
- **File Preview**: Real-time preview of selected images before upload
- **Validation**: Client-side validation for file type (images only) and size (5MB max)
- **Optional Upload**: Images are completely optional - posts work perfectly without them
- **Responsive Design**: Upload interface adapts to all screen sizes
- **Error Handling**: User-friendly error messages for invalid files

### Backend Implementation:
- **Multer Integration**: Professional file upload handling with multer
- **File Storage**: Organized file storage in `/uploads` directory
- **Unique Naming**: Automatic unique filename generation to prevent conflicts
- **Size Limits**: Server-side enforcement of 5MB file size limit
- **Type Validation**: Server-side validation to ensure only image files are accepted
- **Static Serving**: Uploaded images served statically via Express

### Usage:
1. Navigate to the "Write Post" page
2. Fill in the required fields (title, author, content)
3. Optionally add a featured image by:
   - Dragging and dropping an image file onto the upload area
5. Publish your post with or without the image

## 🏗️ Project Structure

\`\`\`
│   │   ├── PostCard.tsx
│   │   ├── PostDetail.tsx
│   │   └── CreatePostForm.tsx
│   ├── Layout/         # Layout components
│   │   ├── Navbar.tsx
│   │   └── LoadingSpinner.tsx
│   └── ui/             # shadcn/ui components
├── data/               # Mock data
│   └── mockData.ts
├── hooks/              # Custom React hooks
│   └── use-toast.ts
├── lib/                # Utility functions
│   └── utils.ts
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── PostDetailPage.tsx
│   └── CreatePostPage.tsx
├── services/           # API services
│   └── blogService.ts
├── types/              # TypeScript type definitions
│   └── blog.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles

server/                 # Backend API (optional)
├── routes/            # API routes
│   └── posts.js       # Posts CRUD operations
├── multerConfig.js    # File upload configuration
├── server.js          # Express server setup
└── package.json       # Backend dependencies

uploads/               # Uploaded images directory
\`\`\`

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3B82F6 to #1E40AF)
- **Secondary**: Purple gradient (#8B5CF6 to #7C3AED)
- **Accent**: Indigo (#6366F1)
- **Neutral**: Gray scale for text and backgrounds
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

## Screenshots
### Landing
<img width="1356" height="827" alt="Screenshot 2025-08-14 at 7 01 49 PM" src="https://github.com/user-attachments/assets/a70329d4-3817-4f89-8cc9-ac1b8e70e308" />


###  Specific post
<img width="1389" height="818" alt="Screenshot 2025-08-14 at 7 02 09 PM" src="https://github.com/user-attachments/assets/b968f876-51bf-4527-b191-beb36bdf657b" />


###  Dark theme Landing
<img width="1346" height="824" alt="Screenshot 2025-08-14 at 7 02 31 PM" src="https://github.com/user-attachments/assets/d411a4ee-006c-40e1-9c28-f30efc8f6afa" />


###  Create post
<img width="1319" height="748" alt="Screenshot 2025-08-14 at 7 04 06 PM" src="https://github.com/user-attachments/assets/3cbbe6a4-c700-4064-b7df-cea990696bdb" />



###  Typography
- **Headers**: 120% line height, bold weight
- **Body**: 150% line height, regular weight
- **Font Stack**: Inter, system fonts

### Layout
- **Container**: Max width 7xl (80rem) with responsive padding
- **Grid**: Responsive CSS Grid with auto-fit columns
- **Spacing**: 8px base spacing system
- **Border Radius**: Consistent rounded corners (0.5rem base)

## 🔧 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run lint\` - Run ESLint
- \`npm run preview\` - Preview production build

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎭 Key Components

### HomePage
- Hero section with gradient typography
- Search and filtering functionality
- Responsive post grid with animations
- Statistics section showing content metrics

### PostDetail
- Full-width hero image
- Rich typography with proper heading hierarchy
- Author information and metadata
- Tag system for categorization
- Smooth back navigation

### CreatePostForm
- Form validation with error handling
- Tag management system
- Rich text area for content
- Optional image upload with drag-and-drop
- Image preview and validation
- Real-time form validation
- Toast notifications for user feedback

## 🔄 State Management

The application uses React's built-in state management with:
- **useState** for local component state
- **useEffect** for side effects and data fetching
- **Custom hooks** for reusable logic
- **Context API** for theme and toast management

## 📊 Mock Data Service

The \`blogService\` provides a complete API simulation with:
- Async operations with realistic delays
- CRUD operations for blog posts
- Automatic excerpt generation
- Read time calculation
- Tag management
- Image handling (both uploaded files and fallback URLs)
- File upload simulation for development

## 🔧 Backend API (Optional)

A complete Express.js backend is included for production use:

### Features:
- **RESTful API**: Standard REST endpoints for blog operations
- **File Upload**: Multer-powered image upload handling
- **Data Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback
- **Static File Serving**: Automatic serving of uploaded images
- **CORS Support**: Cross-origin resource sharing for frontend integration

### API Endpoints:
- `GET /api/posts` - Retrieve all posts
- `GET /api/posts/:id` - Retrieve single post
- `POST /api/posts` - Create new post (with optional image upload)
- `DELETE /api/posts/:id` - Delete post
- `GET /api/health` - Health check endpoint
- `GET /uploads/:filename` - Serve uploaded images

### Environment Setup:
The backend runs on port 3001 by default and can be configured via environment variables.
## 🎨 Animation Patterns

Using Framer Motion for:
- Page transitions with stagger effects
- Card hover animations
- Loading states with micro-interactions
- Form submission feedback
- Scroll-triggered animations

## 🚀 Performance Optimizations

- **Code Splitting**: Dynamic imports for routes
- **Image Optimization**: Lazy loading and responsive images
- **Bundle Optimization**: Tree shaking and minification
- **Component Memoization**: React.memo for expensive components
- **Efficient Re-renders**: Proper dependency arrays in useEffect

## 🎯 Best Practices Implemented

- **TypeScript**: Full type safety and better developer experience
- **Component Composition**: Reusable and maintainable components
- **Accessibility**: Proper ARIA labels and semantic HTML
- **SEO Ready**: Meta tags and structured data preparation
- **Error Boundaries**: Graceful error handling
- **Code Organization**: Clear separation of concerns
- **Consistent Styling**: Design system with utility classes

## 🔮 Future Enhancements

- Advanced image editing (crop, resize, filters)
- Multiple image uploads per post
- Image optimization and compression
- User authentication system
- Comment system for posts
- Advanced search with Elasticsearch
- Rich text editor (WYSIWYG)
- Social sharing features
- RSS feed generation
- Advanced analytics dashboard
- Multi-language support
- Cloud storage integration (AWS S3, Cloudinary)
- Image CDN integration for better performance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue on the GitHub repository.

---

Built with ❤️ using React, TypeScript, and modern web technologies.# blog
