"use client";
import Feed from '@/components/Feed';
import dynamic from 'next/dynamic';
import { CarouselProps } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { CarouselState, AnimationHandlerResponse } from 'react-responsive-carousel/lib/ts/components/Carousel/types';

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
          className="w-full h-full" axis={'horizontal'} centerSlidePercentage={0} labels={{
            leftArrow: '',
            rightArrow: '',
            item: ''
          }} onClickItem={function (index: number, item: React.ReactNode): void {
            throw new Error('Function not implemented.');
          } } onClickThumb={function (index: number, item: React.ReactNode): void {
            throw new Error('Function not implemented.');
          } } onChange={function (index: number, item: React.ReactNode): void {
            throw new Error('Function not implemented.');
          } } onSwipeStart={function (event: React.TouchEvent): void {
            throw new Error('Function not implemented.');
          } } onSwipeEnd={function (event: React.TouchEvent): void {
            throw new Error('Function not implemented.');
          } } onSwipeMove={function (event: React.TouchEvent): boolean {
            throw new Error('Function not implemented.');
          } } preventMovementUntilSwipeScrollTolerance={false} renderArrowPrev={function (clickHandler: () => void, hasPrev: boolean, label: string): React.ReactNode {
            throw new Error('Function not implemented.');
          } } renderArrowNext={function (clickHandler: () => void, hasNext: boolean, label: string): React.ReactNode {
            throw new Error('Function not implemented.');
          } } renderIndicator={function (clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void, isSelected: boolean, index: number, label: string): React.ReactNode {
            throw new Error('Function not implemented.');
          } } renderItem={function (item: React.ReactNode, options?: { isSelected: boolean; isPrevious: boolean; }): React.ReactNode {
            throw new Error('Function not implemented.');
          } } renderThumbs={function (children: React.ReactChild[]): React.ReactChild[] {
            throw new Error('Function not implemented.');
          } } selectedItem={0} showArrows={false} showIndicators={false} statusFormatter={function (currentItem: number, total: number): string {
            throw new Error('Function not implemented.');
          } } stopOnHover={false} swipeable={false} swipeScrollTolerance={0} transitionTime={0} verticalSwipe={'natural'} width={''} animationHandler={'slide'} swipeAnimationHandler={function (delta: { x: number; y: number; }, props: CarouselProps, state: CarouselState, setState: Function): AnimationHandlerResponse {
            throw new Error('Function not implemented.');
          } } stopSwipingHandler={function (props: CarouselProps, state: CarouselState): AnimationHandlerResponse {
            throw new Error('Function not implemented.');
          } }        >
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
