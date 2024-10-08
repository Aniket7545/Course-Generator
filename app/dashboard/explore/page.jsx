import React from 'react'
import { FiSearch, FiBookOpen, FiCode, FiPenTool, FiMusic, FiCamera } from 'react-icons/fi'

function Explore() {
  const categories = [
    { name: 'Programming', icon: <FiCode />, courses: 150 },
    { name: 'Design', icon: <FiPenTool />, courses: 120 },
    { name: 'Music', icon: <FiMusic />, courses: 80 },
    { name: 'Photography', icon: <FiCamera />, courses: 90 },
  ]

  const featuredCourses = [
    { title: 'Introduction to React', author: 'John Doe', students: 1500 },
    { title: 'Advanced Python Programming', author: 'Jane Smith', students: 1200 },
    { title: 'UX/UI Design Fundamentals', author: 'Alice Johnson', students: 900 },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full p-3 pl-10 border rounded-lg"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <div className="text-3xl mb-2 text-blue-500">{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.courses} courses</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
        <div className="space-y-4">
          {featuredCourses.map((course, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <FiBookOpen className="text-3xl mr-4 text-blue-500" />
              <div>
                <h3 className="font-medium">{course.title}</h3>
                <p className="text-sm text-gray-500">by {course.author}</p>
                <p className="text-xs text-gray-400">{course.students} students</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Explore