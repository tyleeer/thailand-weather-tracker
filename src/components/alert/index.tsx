import { clearAlert } from "@/utils";
import { ImCross } from "react-icons/im";

export const Alert = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="alert alert-error w-[75%] flex justify-between">
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span
            id="alert__message"
            className="md:text-[1.5rem] font-semibold"
          ></span>
        </div>
        <button type="button" onClick={() => clearAlert()} className="">
          <ImCross className="stroke-current shrink-0 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
