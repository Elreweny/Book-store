import { Link } from "react-router-dom";
import { SlBookOpen } from "react-icons/sl";

export default function Error() {
  return (
    <div className="h-dvh flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">
        Error 404
      </h1>
      <p className="text-lg md:text-2xl mb-4">
        Page not found. Back to
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 text-green-500 text-lg md:text-2xl hover:underline"
      >
        Home Page <SlBookOpen className="inline-block" />
      </Link>
    </div>
  );
}
