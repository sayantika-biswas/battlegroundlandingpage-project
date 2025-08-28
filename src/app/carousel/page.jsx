'use client';

import { useState, useEffect, useRef } from 'react';

const ReviewCard = ({ name, game, rating, comment, avatar, date, isActive, position }) => {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-700'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Calculate card style based on position
  const getCardStyle = () => {
    if (position === 'center') {
      return 'scale-110 z-20 opacity-100';
    } else if (position === 'left') {
      return 'scale-90 -translate-x-8 lg:-translate-x-16 z-10 opacity-80';
    } else if (position === 'right') {
      return 'scale-90 translate-x-8 lg:translate-x-16 z-10 opacity-80';
    } else {
      return 'scale-90 opacity-0'; // For non-visible cards
    }
  };

  return (
    <div className={`bg-white/20 backdrop-blur-md 
                 border border-white/20 
                 rounded-xl p-6 h-full flex flex-col 
                 shadow-lg transition-all duration-500 ease-out ${getCardStyle()}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-yellow-400"
            src={avatar}
            alt={name}
          />
          <div>
            <h3 className="font-bold text-white">{name}</h3>
            <p className="text-yellow-500 text-sm">{game}</p>
          </div>
        </div>
        <span className="text-xs text-gray-300">{date}</span>
      </div>
      <div className="flex mb-3">{renderStars()}</div>
      <p className="text-gray-200 flex-grow text-sm">"{comment}"</p>
    </div>
  );
};

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reviews, setReviews] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Fetch reviews from backend API
    fetch('https://battlegroundbackend-project.onrender.com/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(() => setReviews([]));
  }, []);

  useEffect(() => {
    if (isPaused || reviews.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, reviews]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      reviews.length === 0
        ? 0
        : prevIndex === reviews.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      reviews.length === 0
        ? 0
        : prevIndex === 0
        ? reviews.length - 1
        : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Determine position for each card
  const getCardPosition = (index) => {
    if (index === currentIndex) return 'center';

    const total = reviews.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    if (index === prevIndex) return 'left';
    if (index === nextIndex) return 'right';

    return 'hidden';
  };

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] 
                px-4 sm:px-6 lg:px-8 py-16 
                bg-gradient-to-b from-[#2c1a0f] via-[#1e120a] to-[#0d0704] 
                border-t border-[#3a2418]">
      <h2 className="text-4xl font-extrabold text-center 
                 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 
                 bg-clip-text text-transparent mb-4">
        Player Reviews
      </h2>
      <p className="text-amber-200/70 text-center mb-10 max-w-2xl mx-auto">
        See what our community is saying about the latest games
      </p>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        ref={carouselRef}
      >
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 
             bg-black/60 rounded-full p-3 shadow-md z-30 
             hover:bg-yellow-500 hover:text-black transition-all duration-300"
          aria-label="Previous reviews"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 bg-gray-800 rounded-full p-3 shadow-lg z-30 hover:bg-purple-600 transition-all duration-300 group"
          aria-label="Next reviews"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute -top-12 right-4 bg-gray-800 rounded-full p-2 shadow-lg z-30 hover:bg-purple-600 transition-colors duration-300"
          aria-label={isPaused ? "Play carousel" : "Pause carousel"}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isPaused ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </>
            )}
          </svg>
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden px-2 py-10">
          <div className="flex items-center justify-center relative h-80">
            {reviews.length === 0 ? (
              <div className="text-white text-center">Loading reviews...</div>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={review._id}
                  className={`absolute transition-all duration-500 ease-out w-80 ${getCardPosition(index) === 'hidden' ? 'opacity-0' : ''}`}
                  style={{
                    transform: getCardPosition(index) === 'center'
                      ? 'translateX(0) scale(1.1)'
                      : getCardPosition(index) === 'left'
                        ? 'translateX(-90%) scale(0.9)'
                        : getCardPosition(index) === 'right'
                          ? 'translateX(90%) scale(0.9)'
                          : 'translateX(0) scale(0.8)',
                    zIndex: getCardPosition(index) === 'center'
                      ? 30
                      : getCardPosition(index) === 'left' || getCardPosition(index) === 'right'
                        ? 20
                        : 10,
                  }}
                >
                  <ReviewCard
                    name={review.name}
                    game={review.game}
                    comment={review.comment}
                    rating={review.rating}
                    avatar={review.avatar}
                    date={review.date}
                    isActive={index === currentIndex}
                    position={getCardPosition(index)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}