/* eslint-disable @typescript-eslint/no-explicit-any */
import Rating from "react-rating";

const RatingInput = ({ initialRating, onRatingChange }: any) => {
  return (
    <div className="w-full inline-flex">
      <Rating initialRating={initialRating} onChange={onRatingChange} />
    </div>
  );
};

export default RatingInput;
