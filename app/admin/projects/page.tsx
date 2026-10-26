'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

const API_URL = ''

interface Project {
  _id: string
  title: string
  titleHA: string
  description: string
  category: string
  imageUrl?: string
  images: string[]
  videoEmbedLink?: string
  status: string
  year: string
  priority: number
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const [title, setTitle] = useState('')
  const [titleHA, setTitleHA] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Education')
  const [imageUrl, setImageUrl] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [videoEmbedLink, setVideoEmbedLink] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [status, setStatus] = useState('Planned')
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [priority, setPriority] = useState(0)

  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`)
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        } else {
          setError('Failed to fetch projects')
        }
      } catch (err) {
        setError('An error occurred while fetching projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', file)

    const token = localStorage.getItem('adminToken')
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to upload image')
    }

    const data = await response.json()
    return data.imageUrl
  }

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // Upload image to Cloudinary if file is selected
      let currentImages = [...images];
      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary(imageFile);
        currentImages.unshift(uploadedUrl); // Make it the main image
      }
      // If legacy imageUrl exists and not in images, add it
      if (imageUrl && !currentImages.includes(imageUrl)) {
        currentImages.unshift(imageUrl);
      }

      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          titleHA,
          description,
          category,
          imageUrl: currentImages[0] || '', // Legacy support
          images: currentImages,
          videoEmbedLink,
          status,
          year,
          priority: priority,
        }),
      })

      if (response.ok) {
        const newProject = await response.json()
        setProjects([...projects, newProject])
        resetForm()
        setShowForm(false)
        setSuccess('Project created successfully!')
        setTimeout(() => setSuccess(''), 4000)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to create project')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    }
  }

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingProject) return
    setError('')
    setSuccess('')

    try {
      // Upload image to Cloudinary if a new file is selected
      let currentImages = [...images];
      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary(imageFile);
        currentImages.unshift(uploadedUrl); // Make it the main image
      }
      
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/projects/${editingProject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          titleHA,
          description,
          category,
          imageUrl: currentImages[0] || '', // Legacy support
          images: currentImages,
          videoEmbedLink,
          status,
          year,
          priority: priority,
        }),
      })

      if (response.ok) {
        const updatedProject = await response.json()
        setProjects(projects.map((p) => (p._id === updatedProject._id ? updatedProject : p)))
        setEditingProject(null)
        setShowForm(false)
        resetForm()
        setSuccess('Project updated successfully!')
        setTimeout(() => setSuccess(''), 4000)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update project')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setProjects(projects.filter((p) => p._id !== projectId))
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to delete project')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const resetForm = () => {
    setTitle('')
    setTitleHA('')
    setDescription('')
    setCategory('Education')
    setImageUrl('')
    setImages([])
    setVideoEmbedLink('')
    setImageFile(null)
    setImagePreview(null)
    setStatus('Planned')
    setYear(new Date().getFullYear().toString())
    setPriority(0)
  }

  const startEditing = (project: Project) => {
    setEditingProject(project)
    setTitle(project.title)
    setTitleHA(project.titleHA || '')
    setDescription(project.description)
    setCategory(project.category)
    setImageUrl(project.imageUrl || '')
    setImages(project.images || (project.imageUrl ? [project.imageUrl] : []))
    setVideoEmbedLink(project.videoEmbedLink || '')
    setImageFile(null)
    // Only show preview if there's an existing image URL
    setImagePreview(null)
    setStatus(project.status)
    setYear(project.year)
    setPriority(project.priority || 0)
    setShowForm(true)
  }

  const startCreating = () => {
    setEditingProject(null)
    resetForm()
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects Management</h1>
        <button
          onClick={startCreating}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Project
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-3 rounded font-medium">{success}</div>}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </h2>

          <form
            onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Project title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hausa Title</label>
                <input
                  type="text"
                  value={titleHA}
                  onChange={(e) => setTitleHA(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Hausa title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Education">Education</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Social Welfare">Social Welfare</option>
                  <option value="Economic Empowerment">Economic Empowerment</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Planned">Planned</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <input
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Priority (0-10)"
                  min="0"
                  max="10"
                />
              </div>


              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Gallery</label>
                
                {/* Image Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                        <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Add Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="https://..."
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newImageUrl) {
                            setImages([...images, newImageUrl]);
                            setNewImageUrl('');
                          }
                        }}
                        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                     <label className="block text-xs text-gray-500 mb-1">Or Upload New</label>
                     <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                  </div>
                </div>
                {imagePreview && (
                   <div className="mt-2 p-2 bg-green-50 rounded border border-green-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <img src={imagePreview} className="w-10 h-10 object-cover rounded" />
                         <span className="text-sm text-green-700">Ready to upload on save</span>
                      </div>
                      <button type="button" onClick={() => {setImageFile(null); setImagePreview(null)}} className="text-red-500 text-sm">Cancel</button>
                   </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Link (YouTube/Vimeo)
                </label>
                <input
                  type="text"
                  value={videoEmbedLink}
                  onChange={(e) => setVideoEmbedLink(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a video URL to embed in the project display
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Project description"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProject(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {editingProject ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-auto max-h-[70vh]">
          <table className="min-w-full divide-y divide-gray-200 relative">
            <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{project.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'Ongoing'
                            ? 'bg-blue-100 text-blue-800'
                            : project.status === 'Planned'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.priority || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => startEditing(project)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found. Create your first project!</p>
          </div>
        )}
      </div>
    </div>
  )
}
