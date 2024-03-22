import { ImSpinner2 } from "react-icons/im";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  text?: string;
  size?: number;
  textHidden?: boolean;
}

export default function SpinerLoading({
  className,
  text = "Loading..",
  size = 17,
  textHidden = true,
}: Props) {
  return (
    <span className={cn("flex gap-2 items-center", className)}>
      <ImSpinner2 size={size} className="animate-spin" />
      {!textHidden && text}
    </span>
  );
}
