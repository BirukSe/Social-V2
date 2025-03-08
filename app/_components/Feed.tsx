const Feed = () => {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-gray-900 rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2"></div>
              <span className="text-sm font-semibold">user_{item}</span>
            </div>
            <img
              src={`/placeholder.svg?height=300&width=600&text=Post${item}`}
              alt={`Post ${item}`}
              className="w-full rounded-md mb-2"
            />
            <p className="text-gray-300 text-sm">This is a placeholder post. Replace with actual content.</p>
            <div className="flex justify-between items-center mt-2">
              <button className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L13.657 10l1.172 1.171a4 4 0 11-5.656 5.656L10 13.657l-1.172 1.171a4 4 0 11-5.656-5.656L6.343 10 5.172 8.829a4 4 0 010-5.657z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0L8.5 7.707l2.293-2.293a1 1 0 011.414 1.414L9.914 9.121l2.293 2.293a1 1 0 01-1.414 1.414L8.5 10.535l-2.293 2.293a1 1 0 01-1.414-1.414L7.086 9.121 4.793 6.828a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default Feed
  
  