import { FaArrowRightToBracket, FaBatteryThreeQuarters, FaRegThumbsUp } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import PortfolioList from "../portfolio/_components/PortfolioList";

export default function Dashboard(): JSX.Element {
  return (<>
    <div className="py-4">
      <div className="bg-base-200 collapse collapse-arrow sm:collapse-open">
        <input type="checkbox" />
        <div className="font-medium text-xl collapse-title">
          <h1 className="flex items-center gap-2"><IoStatsChart /> Statistic</h1>
        </div>
        <div className="collapse-content">
          <div className="shadow w-full sm:stats">
            <div className="stat">
              <div className="text-3xl text-secondary stat-figure">
                <FaBatteryThreeQuarters />
              </div>
              <div className="stat-title">Rate Limit</div>
              <div className="stat-value">1000 R/m</div>
              <div className="stat-desc">For Member</div>
            </div>
            <div className="stat">
              <div className="text-3xl text-secondary stat-figure">
                <FaArrowRightToBracket />
              </div>
              <div className="stat-title">API Requests</div>
              <div className="stat-value">0</div>
              <div className="stat-desc">↗︎ 0 (0%)</div>
            </div>
            <div className="stat">
              <div className="text-3xl text-secondary stat-figure">
                <FaRegThumbsUp />
              </div>
              <div className="stat-title">User Interactions</div>
              <div className="stat-value">0</div>
              <div className="stat-desc">↘︎ 0 (0%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="py-4">
      <PortfolioList />
    </div>
  </>);
}
