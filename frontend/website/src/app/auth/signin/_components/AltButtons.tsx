import { FaApple, FaGithub, FaGoogle } from "react-icons/fa";

const AltButtons = () => {
  return (
    <div>
      <div className='gap-3 grid grid-cols-2 lg:grid-cols-3'>
        <button
          type="submit"
          className="col-span-2 lg:col-span-1 btn btn-primary grow"
        >
          <FaGoogle /> Google
        </button>
        <button
          type="submit"
          className="btn btn-primary grow"
        >
          <FaGithub /> Github
        </button>
        <button
          type="submit"
          className="btn btn-primary grow"
        >
          <FaApple /> Apple
        </button>
      </div>
    </div>
  )
}

export default AltButtons