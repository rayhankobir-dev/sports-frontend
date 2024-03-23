import { PiSoccerBall } from "react-icons/pi";
import { Link } from "react-router-dom";

function FooterSection() {
  return (
    <footer className="relative pt-6 bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-8 ">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="w-full mb-10">
              <Link
                to="/"
                className="mb-6 inline-flex items-center gap-2 max-w-full"
              >
                <PiSoccerBall size={45} className="text-green-600" />
                <h2 className="text-green-600 text-2xl font-semibold italic">
                  Soccer
                </h2>
              </Link>
              <p className="text-base text-body-color dark:text-dark-6 mb-2">
                Sed ut perspiciatis undmnis is iste natus error sit amet
                voluptatem totam rem aperiam.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="font-normal text-sm text-center bg-gray-200 py-2">
        &copy; Copyright-2024, Reserved by Soccer
      </p>
    </footer>
  );
}

export default FooterSection;
