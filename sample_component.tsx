import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const highlights = [
  { book: "Co-Intelligence", highlight: "When we use AI to generate our first drafts, we don't have to think as hard or as deeply about what we write. We rely on the machine to do the hard work of analysis and synthesis, and we don't engage in critical and reflective thinking ourselves. We also miss the opportunity to learn from our mistakes and feedback and the chance to develop our own style." },
  { book: "Co-Intelligence", highlight: "So, regardless of its nature, your job is likely to overlap with AI in the near future. That doesn't mean your job will be replaced." },
  // ... add all other highlights here
];

const RatingStar = ({ filled, onClick }) => (
  <Star
    size={24}
    fill={filled ? 'gold' : 'none'}
    stroke={filled ? 'gold' : 'currentColor'}
    className="cursor-pointer"
    onClick={onClick}
  />
);

const BookHighlightsRating = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState(new Array(highlights.length).fill(0));

  const handleRate = (rating) => {
    const newRatings = [...ratings];
    newRatings[currentIndex] = rating;
    setRatings(newRatings);
  };

  const handleNext = () => {
    if (currentIndex < highlights.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentHighlight = highlights[currentIndex];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Highlights Rating</h1>
      <Card>
        <CardHeader className="font-bold">{currentHighlight.book}</CardHeader>
        <CardContent>
          <p className="mb-4">{currentHighlight.highlight}</p>
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((star) => (
              <RatingStar
                key={star}
                filled={star <= ratings[currentIndex]}
                onClick={() => handleRate(star)}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
          <span>{currentIndex + 1} / {highlights.length}</span>
          <Button onClick={handleNext} disabled={currentIndex === highlights.length - 1}>Next</Button>
        </CardFooter>
      </Card>
      <div className="mt-4 text-center">
        <p>Quotes left to review: {highlights.length - (currentIndex + 1)}</p>
      </div>
    </div>
  );
};

export default BookHighlightsRating;
