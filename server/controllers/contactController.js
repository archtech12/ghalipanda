const Contact = require('../models/Contact');

// @desc    Get contact information
// @route   GET /api/contact
// @access  Public
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });

    if (!contact) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create/update contact information
// @route   POST /api/contact
// @access  Private
const createContact = async (req, res) => {
  try {
    const {
      officeAddress,
      phone,
      email,
      officeHours,
      socialMedia,
      mapEmbedUrl
    } = req.body;

    const contactData = {
      officeAddress,
      phone,
      email,
      officeHours,
      socialMedia,
      mapEmbedUrl
    };

    // Check if contact information already exists
    let contact = await Contact.findOne();

    if (contact) {
      // Update existing
      contact = await Contact.findByIdAndUpdate(contact._id, contactData, {
        new: true,
        runValidators: true
      });
    } else {
      // Create new
      contact = new Contact(contactData);
      await contact.save();
    }

    res.status(201).json(contact);
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update contact information
// @route   PUT /api/contact/:id
// @access  Private
const updateContact = async (req, res) => {
  try {
    const {
      officeAddress,
      phone,
      email,
      officeHours,
      socialMedia,
      mapEmbedUrl
    } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        officeAddress,
        phone,
        email,
        officeHours,
        socialMedia,
        mapEmbedUrl
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send contact message via email
// @route   POST /api/contact/send
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email and message' });
    }

    // Since we don't have SMTP credentials configured in env for this demo,
    // we will log the message and return success.
    // In production, uncomment the nodemailer code below.

    console.log('📨 NEW CONTACT MESSAGE RECEIVED:');
    console.log('From:', name, `<${email}>`);
    console.log('Subject:', subject);
    console.log('Message:', message);

    /* 
    // Nodemailer implementation
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL || 'info@ghalipanda.com', // Admin email
      subject: `New Contact Form: ${subject}`,
      text: message,
      html: `
        <h3>New Message from Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    */

    // Simulate delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error could not send message' });
  }
};

module.exports = {
  getContact,
  createContact,
  updateContact,
  sendMessage
};