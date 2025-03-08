"use client"

import Feed from "@/components/Feed"
import dynamic from "next/dynamic"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useState, useEffect } from "react"

// Dynamically import the Carousel component
const Carousel = dynamic(() => import("react-responsive-carousel").then((mod) => mod.Carousel), { ssr: false })

const Page = () => {
  const [mounted, setMounted] = useState(false)

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* App Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-gray-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Buragram
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Stories Section */}
        <div className="mb-8 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-pink-500">
                  <div className="bg-black rounded-full w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=64&width=64&text=User${item}`}
                      alt={`User ${item}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <span className="text-xs mt-1 text-gray-300">user_{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Carousel */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          {mounted && (
            //@ts-ignore
            <Carousel
              autoPlay
              infiniteLoop
              interval={5000}
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              showIndicators={true}
              className="carousel-container"
              renderArrowPrev={(clickHandler, hasPrev) =>
                hasPrev && (
                  <button
                    onClick={clickHandler}
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                    aria-label="Previous slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )
              }
              renderArrowNext={(clickHandler, hasNext) =>
                hasNext && (
                  <button
                    onClick={clickHandler}
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                    aria-label="Next slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )
              }
              renderIndicator={(clickHandler, isSelected, index) => (
                <button
                  className={`inline-block h-2 w-2 mx-1 rounded-full ${isSelected ? "bg-white" : "bg-white/40"}`}
                  onClick={clickHandler}
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )}
            >
              <div className="relative aspect-[16/9]">
                <img src="ai.jpg" alt="Featured content" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">Trending Now</h3>
                  <p className="text-sm text-gray-200">Discover what's hot on Buragram today</p>
                </div>
              </div>
              <div className="relative aspect-[16/9]">
                <img src="cool.jpg" alt="Featured content" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">Popular Creators</h3>
                  <p className="text-sm text-gray-200">Follow the most influential Buragram users</p>
                </div>
              </div>
              <div className="relative aspect-[16/9]">
                <img src="an.jpg" alt="Featured content" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">New Features</h3>
                  <p className="text-sm text-gray-200">Check out the latest updates to Buragram</p>
                </div>
              </div>
            </Carousel>
          )}
        </div>

        {/* Feed Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Feed</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                For You
              </button>
              <button className="px-3 py-1 text-sm rounded-full hover:bg-gray-800 transition-colors">Following</button>
            </div>
          </div>

          <Feed />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 py-2">
        <div className="max-w-4xl mx-auto flex justify-around">
          <button className="p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="p-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Custom CSS for carousel */}
      <style jsx global>{`
        .carousel-container {
          border-radius: 0.75rem;
          overflow: hidden;
        }
        
        .carousel .control-dots {
          bottom: 10px;
        }
        
        .carousel .control-dots .dot {
          box-shadow: none;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        
        .carousel .control-dots .dot.selected {
          background: white;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Page

