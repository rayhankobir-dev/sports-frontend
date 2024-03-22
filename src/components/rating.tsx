import { FaStar, FaRegStar } from "react-icons/fa6";

type Props = {
  rating: number;
  size?: number;
};

const Rating = ({ rating, size = 18 }: Props) => {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;
  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<FaStar key={i} size={size} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={filledStars + i} size={size} />);
  }

  return (
    <div
      className="inline-flex gap-4 text-green-600"
      style={{ fontSize: size }}
    >
      {stars}
    </div>
  );
};

export default Rating;
