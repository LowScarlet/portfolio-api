import Link from "next/link";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa";

const popupCenter = ({ url, title, w, h }: { url: string; title: string; w: number; h: number }): void => {
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
    scrollbars=yes,
    width=${w / systemZoom},
    height=${h / systemZoom},
    top=${top},
    left=${left}
    `
  );

  newWindow?.focus()
};


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