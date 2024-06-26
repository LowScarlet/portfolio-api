import Link from "next/link";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa";

const AltButtons = () => {
  return (
    <div>
      <div className='gap-3 grid grid-cols-2 lg:grid-cols-3'>
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/oauth/google/`}
          className="col-span-2 lg:col-span-1 btn btn-primary grow"
        >
          <FaGoogle /> Google
        </Link>
        <button
          type="submit"
          className="btn btn-primary grow"
          disabled={true}
        >
          <FaGithub /> Github
        </button>
        <button
          type="submit"
          className="btn btn-primary grow"
          disabled={true}
        >
          <FaApple /> Apple
        </button>
      </div>
    </div >
  )
}

export default AltButtons