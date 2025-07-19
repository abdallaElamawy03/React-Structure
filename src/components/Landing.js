import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <body class="bg-gray-50 font-sans">
    {/* <!-- Nav --> */}
    <nav class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <i class="fas fa-users text-primary text-2xl"></i>
              <span class="ml-2 text-xl font-semibold text-primary">CEO</span>
            </div>
            <div class="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="#"
                class="border-#00 text-dark inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >Home</a
              >
              <a
                href="#features"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >Features</a
              >
              <a
                href="#contact"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >Contact</a
              >
            </div>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <Link to={'/login'}
              class="text-gray-500 hover:text-blue-700 px-3 py-2 text-sm font-medium"
              >Login</Link>
            <Link to={'/companylogin'}
              class="bg_Color text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600"
              >CompanyLogin</Link>
            {/* <Link to={'/register'}
              href="login-register/registration.html"
              class="bg_Color text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-lime-700"
              >Get Started</Link> */}
          </div>
         
        </div>
      </div>
    </nav>

    {/* <!-- Hero Section --> */}

    <section class="text-white bg_Color">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="md:flex md:items-center md:justify-between">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl font-bold mb-4">HR Management Made Easer</h1>
            <p class="text-xl mb-8">Need to Manage your Business</p>
            <div
              class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to={'/register'}
                
                class=" bg_white px-6 py-3 rounded-md text-lg font-medium text-center  hover:bg-green-600 700 hover:text-white "
                >Get Started
                </Link>

            </div>
          </div>
          <div class="md:w-1/2">
            <img
              src="/img/banner.png"
              alt="HR Management Dashboard"
              class="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    {/* <!-- Features--> */}
    <section id="features" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-dark mb-4">
            Powerful HR Features
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your workforce efficiently
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          {/* <!-- Feature 1 --> */}
          <div
            class="bg-gray-200 p-6 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-shadow"
          >
            <div class="text-blue-700 mb-4">
              <i class="fas fa-user-tie text-3xl main_Color"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Employee Management</h3>
            <p class="text-gray-600">
              A simple Employee Management System that lets you add, edit,
              delete, and view employee details efficiently
            </p>
          </div>

          {/* <!-- Feature 2 --> */}
          <div
            class="bg-gray-200 p-6 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-shadow"
          >
            <div class="text-blue-700 mb-4">
              <i class="fas fa-calendar-alt text-3xl main_Color"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Time & Attendance</h3>
            <p class="text-gray-600">
              A system to track employee working hours, attendance, and absences
              to ensure accurate timekeeping and payroll processing.
            </p>
          </div>

          {/* <!-- Feature 3 --> */}
          <div
            class="bg-gray-200 p-6 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-shadow"
          >
            <div class="text-blue-700 mb-4">
              <i class="fas fa-chart-line text-3xl main_Color"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Tracking</h3>
            <p class="text-gray-600">
              A system designed to monitor and record activities, movements, or
              progress for better management and visibility
            </p>
          </div>

          {/* <!-- Feature 4 --> */}
          <div
            class="bg-gray-200 p-6 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-shadow"
          >
            <div class="text-blue-700 mb-4">
              <i class="fas text-3xl"></i>
            </div>
            <h3 class="text-xl mb-3">Tasks</h3>
            <p class="text-gray-600">You can assign tasks for every Employee</p>
          </div>

          {/* <!-- Feature 5 --> */}
          <div
            class="bg-gray-200 p-6 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-shadow"
          >
            <div class="text-blue-700 mb-4">
              <i class="fas text-3xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">msh 3aref</h3>
            <p class="text-gray-600">msh 3aref p</p>
          </div>

          {/* <!-- Feature 6 --> */}
          <div
            class="bg-gray-200 p-6 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-shadow"
          >
            <div class="text-blue-700 mb-4">
              <i class="fas text-3xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">msh 3aref</h3>
            <p class="text-gray-600">msh 3aref p</p>
          </div>
        </div>
      </div>
    </section>

    {/* <!-- Dashboard --> */}
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-black mb-4">Easy Dashboard</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Designed for you</p>
        </div>

        <div class="bg-white p-2 rounded-lg shadow-lg">
          <div class="bg-gray-800 p-3 rounded-t-lg flex items-center">
            <div class="flex space-x-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="text-white text-sm mx-auto">CEO.com</div>
          </div>
          <img
            src="/img/banner.png"
            alt="Dashboard"
            class="w-full rounded-b-lg"
          />
        </div>
      </div>
    </section>

    {/* <!-- Trust by --> */}
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-black mb-4">Trusted by</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Google</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          {/* <!-- first comment --> */}
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 mr-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
            <p class="text-gray-600 mb-6">
              "The best system to manage your Employees to get the best
              performance from each Employee"
            </p>
            <div class="flex items-center">
              <div
                class="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-primary"
              >
                <i class="fas fa-user"></i>
              </div>
              <div class="ml-3">
                <h4 class="font-medium">Prof: Abdalla Elamawy</h4>
                <p class="text-sm text-gray-500">CEO , Manager of the world</p>
              </div>
            </div>
          </div>

          {/* <!-- sec comment --> */}
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 mr-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
            <p class="text-gray-600 mb-6">
              "i used a various Applications for management systems but this is
              the best ever"
            </p>
            <div class="flex items-center">
              <div
                class="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-primary"
              >
                <i class="fas fa-user"></i>
              </div>
              <div class="ml-3">
                <h4 class="font-medium">Eng : Abdelrahman Hamed</h4>
                <p class="text-sm text-gray-500">
                  Gm at alqabda company for investing
                </p>
              </div>
            </div>
          </div>

          {/* <!-- third comment --> */}
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 mr-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
            </div>
            <p class="text-gray-600 mb-6">
              "Best management system i've ever used "
            </p>
            <div class="flex items-center">
              <div
                class="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-primary"
              >
                <i class="fas fa-user"></i>
              </div>
              <div class="ml-3">
                <h4 class="font-medium">Dr:Eyad Essam</h4>
                <p class="text-sm text-gray-500">dentist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- footer --> */}
    <footer class="bg_Color text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <i class="fas fa-users mr-2"></i>
              CEO
            </h3>
            <p class="text-gray-400">
              We are developing the best Management System ever
            </p>
            <div class="flex space-x-4 mt-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <i class="fab fa-facebook"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Product</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Features</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Pricing</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Resources</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white"
                  >Help Center</a
                >
              </li>
            </ul>
          </div>

          <div id="contact">
            <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
            <ul class="space-y-2">
              <li class="flex items-center text-gray-400">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span>pyramids garden</span>
              </li>
              <li class="flex items-center text-gray-400">
                <i class="fas fa-phone-alt mr-2"></i>
                <span>01286600001</span>
              </li>
              <li class="flex items-center text-gray-400">
                <i class="fas fa-envelope mr-2"></i>
                <span>Ceo-support@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p class="text-gray-400 mb-4 md:mb-0">&copy; 2025</p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white"
              >Privacy Policy</a
            >
            <a href="#" class="text-gray-400 hover:text-white"
              >Terms of Service</a
            >
            <a href="#" class="text-gray-400 hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </body>
  )
}

export default Landing