const Project = require('../models/Project');
const mongoose = require('mongoose');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database connection unavailable',
        error: 'Service temporarily unavailable due to database connection issues'
      });
    }

    const projects = await Project.find().sort({ priority: -1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database connection unavailable',
        error: 'Service temporarily unavailable due to database connection issues'
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database connection unavailable',
        error: 'Service temporarily unavailable due to database connection issues'
      });
    }

    const {
      title,
      titleHA,
      description,
      category,
      imageUrl,
      images,
      videoEmbedLink,
      status,
      year,
      date,
      impact,
      location,
      priority
  } = req.body;

  const project = new Project({
    title,
    titleHA,
    description,
    category,
    imageUrl,
    images: images || (imageUrl ? [imageUrl] : []),
    videoEmbedLink,
    status,
    year,
    date,
    impact,
    location,
    priority
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
} catch (error) {
  console.error('Create project error:', error);
  res.status(500).json({ message: 'Server error' });
}
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database connection unavailable',
        error: 'Service temporarily unavailable due to database connection issues'
      });
    }

    const {
      title,
      titleHA,
      description,
      category,
      imageUrl,
      images,
      videoEmbedLink,
      status,
      year,
      date,
      impact,
      location,
      priority
    } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        titleHA,
        description,
        category,
        imageUrl,
        images,
        videoEmbedLink,
        status,
        year,
        date,
        impact,
        location,
        priority
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database connection unavailable',
        error: 'Service temporarily unavailable due to database connection issues'
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};