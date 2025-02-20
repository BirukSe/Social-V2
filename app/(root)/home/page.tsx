"use client";
import Feed from '@/components/Feed';
import dynamic from 'next/dynamic';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const Carousel = dynamic(
  () => import('react-responsive-carousel').then(mod => mod.Carousel),
  { ssr: false } // Disable SSR for this component
);

const Page = () => {
  return (
    <div className="mt-7 w-full">
      {/* Carousel Container */}
      <h1 className="font-bold text-2xl flex justify-center text-white">Home Feed</h1>
      <div className="h-[300px] relative mt-7">
        <Carousel 
          autoPlay
          infiniteLoop
          interval={3000} // 3 seconds between slides
          showThumbs={false} // Hide thumbnails
          showStatus={false} // Hide status (e.g., "1 of 3")
          className="w-full h-full"
        >
          <div>
            <img src="ai.jpg" alt="Heart" className="h-[300px]" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src="cool.jpg" alt="Image 2" className="h-[300px]" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src="an.jpg" alt="Hearttt" className="h-[300px]" />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>

      {/* Home Feed */}
     
      <div className="flex justify-center w-full">
        <Feed />
      </div>
    </div>
  );
};

export default Page;
