'use client';

import { useState } from 'react';
import JobForm from './JobForm';
import Link from 'next/link';
// 1. Import the Next.js Image component
import Image from 'next/image';

// 2. Update the Logo component to use your image
const Logo = () => (
    <Link href="/">
        <Image
            src="/log.png" // The correct path to your logo in the public folder
            alt="Job Admin Logo"
            width={40}   // Specify the width for the Image component
            height={40}  // Specify the height
            className="rounded-full" // Optional: if your logo itself is square, this will make it appear circular
        />
    </Link>
);

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = ["Home", "Find Jobs", "Find Talents", "About us", "Testimonials"];

  return (
    <>
      {/* Header's only job is to center the navbar */}
      <header className="flex justify-center mb-8 py-4">
        {/* Unified floating navbar */}
        <nav className="flex items-center gap-6 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200/80">
          
          {/* Left Side: Logo */}
          <Logo />

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
                <Link 
                    key={link} 
                    href="#" 
                    className="text-gray-600 hover:text-black transition-all px-4 py-2 rounded-full text-sm font-medium"
                >
                    {link}
                </Link>
            ))}
          </div>

          {/* Right Side: Create Jobs Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Create Jobs
          </button>
        </nav>
      </header>

      {/* The Modal for creating a job remains the same */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-2xl font-semibold">Create Job Opening</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            <JobForm closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}