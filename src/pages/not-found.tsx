import NotfoundImage from "@/assets/vector/not-found.svg";
import { Button } from "@/lib/utils/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="h-fit flex flex-col items-center justify-center mb-10">
      <img className="h-96 w-96" src={NotfoundImage} />
      <h1 className="text-4xl text-green-600 font-semibold">Page Not Found</h1>
      <p className="max-w-sm font-light mt-3 mb-4">
        Please go back to home and explore our content.
      </p>
      <Button asChild>
        <Link to="/" className="inline-flex gap-2 items-center">
          <Home size={16} /> Go Home
        </Link>
      </Button>
    </section>
  );
}
