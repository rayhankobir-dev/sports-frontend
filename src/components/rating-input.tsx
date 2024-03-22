import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const RatingInput = ({
  initialRating,
  onRatingChange,
}: {
  initialRating: number;
  onRatingChange: (rating: number) => void;
}) => {
  return (
    <div className="w-full inline-flex">
      <Rating value={initialRating} onChange={onRatingChange} />
    </div>
  );
};

export default RatingInput;
