const express = require('express');
const router = express.Router();
const upload = require('../multerConfig');
const path = require('path');

// Mock database (in a real app, use a proper database)
let posts = [];
let nextId = 1;

// GET all posts
router.get('/', (req, res) => {
  res.json(posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
});

// GET single post
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// POST create new post with optional image upload
router.post('/', upload.single('image'), (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    
    // Validation
    if (!title || !content || !author) {
      return res.status(400).json({ 
        error: 'Title, content, and author are required' 
      });
    }

    // Parse tags if they're sent as a string
    let parsedTags = [];
    if (tags) {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    // Generate excerpt
    const generateExcerpt = (content) => {
      const plainText = content.replace(/[#*`_\[\]]/g, '').trim();
      const sentences = plainText.split('. ');
      let excerpt = sentences[0];
      
      for (let i = 1; i < sentences.length; i++) {
        if ((excerpt + '. ' + sentences[i]).length <= 200) {
          excerpt += '. ' + sentences[i];
        } else {
          break;
        }
      }
      
      return excerpt.length < plainText.length ? excerpt + '...' : excerpt;
    };

    // Calculate read time
    const calculateReadTime = (content) => {
      const wordsPerMinute = 200;
      const words = content.trim().split(/\s+/).length;
      return Math.ceil(words / wordsPerMinute);
    };

    // Create new post
    const newPost = {
      id: nextId.toString(),
      title,
      content,
      excerpt: generateExcerpt(content),
      author,
      publishedAt: new Date().toISOString(),
      readTime: calculateReadTime(content),
      tags: parsedTags,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };

    posts.push(newPost);
    nextId++;

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE post
router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  posts.splice(postIndex, 1);
  res.status(204).send();
});

module.exports = router;