'use client'

import {useState, useEffect} from 'react'

interface ContactInfo {
  phone: string;
  email: string;
  officeAddress: string;
  officeHours: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

// ... (imports same)
// ... interface ContactInfo same

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    // In a real application, this would fetch from the API
    // For now, we'll use hardcoded data
    setContactInfo({
      phone: "+234 803 000 0000",
      email: "info@ghalipanda.com",
      officeAddress: "Constituency Office, Gaya Town\nGaya / Ajingi / Albasu Federal Constituency, Kano State",
      officeHours: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM",
      socialMedia: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      }
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)
    
    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section - Premium */}
      <div className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white overflow-hidden pb-12">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-green-500/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10 text-center animate-fade-in-up">
           <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase text-green-100 shadow-lg">
             <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block mr-2"></span>
             Open Door Policy
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
             Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed font-light">
             Have questions, suggestions, or want to connect? Reach out to us directly. We are here to serve you.
          </p>
        </div>
      </div>
      
      <section className="py-16 md:py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-green-700"></div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Send a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form below and our team will get back to you shortly.</p>
              
              {submitSuccess && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  <div>
                      <span className="font-bold block">Message Sent!</span>
                      Thank you for contacting us. We'll be in touch soon.
                  </div>
                </div>
              )}
              
              {submitError && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3">
                   <span className="material-symbols-outlined text-red-600">error</span>
                    <div>
                      <span className="font-bold block">Error</span>
                      {submitError}
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all bg-gray-50 focus:bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all bg-gray-50 focus:bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Inquiry about..."
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all bg-gray-50 focus:bg-white resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-green-700 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-800 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                      <>Sending...</>
                  ) : (
                      <>
                        Send Message <span className="material-symbols-outlined">send</span>
                      </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-10">
              <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
                  <p className="text-gray-500 mb-8">
                      Visit our constituency office or reach out via phone or email. We value your feedback and engagement.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-4 rounded-xl mr-5">
                        <span className="material-symbols-outlined text-green-700 text-2xl">phone</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">Phone</h3>
                        <p className="text-gray-600 font-medium">{contactInfo?.phone || '+234 812 345 6789'}</p>
                        <p className="text-sm text-gray-400 mt-1">Mon-Fri from 9am to 6pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-4 rounded-xl mr-5">
                         <span className="material-symbols-outlined text-green-700 text-2xl">mail</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">Email</h3>
                        <p className="text-gray-600 font-medium">{contactInfo?.email || 'info@ghalipanda.com'}</p>
                        <p className="text-sm text-gray-400 mt-1">For general inquiries</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="bg-green-100 p-4 rounded-xl mr-5">
                        <span className="material-symbols-outlined text-green-700 text-2xl">location_on</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">Constituency Office</h3>
                        <p className="text-gray-600 font-medium whitespace-pre-line leading-relaxed">{contactInfo?.officeAddress || 'Constituency Office, Gaya Town\nGaya / Ajingi / Albasu Federal Constituency, Kano State'}</p>
                      </div>
                    </div>
                  </div>
              </div>
              
              {/* Map Placeholder */}
              <div>
                <div className="w-full h-80 rounded-3xl overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100 relative">
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124600!2d9.0000!3d11.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae1079d2b2f2ff%3A0x89e0ee25be65bfdc!2sGaya%2C%20Kano!5e0!3m2!1sen!2sng!4v1716000000000!5m2!1sen!2sng"
                     width="100%" 
                     height="100%" 
                     style={{border:0}} 
                     allowFullScreen={true} 
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade"
                     className="grayscale hover:grayscale-0 transition-all duration-700"
                   ></iframe>
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold text-gray-600 shadow-sm pointer-events-none">
                      Office Location
                   </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Connect With Hon. Dr. Ghali Panda</h3>
                <div className="flex space-x-3">
                  <a href={contactInfo?.socialMedia?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                  <a href={contactInfo?.socialMedia?.twitter || '#'} target="_blank" rel="noopener noreferrer" className="bg-[#1DA1F2] text-white w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                  <a href={contactInfo?.socialMedia?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="bg-[#E1306C] text-white w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg" title="Instagram">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
