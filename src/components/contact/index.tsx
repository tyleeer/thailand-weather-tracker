import github from "@/img/github.png";
import linkedin from "@/img/linkedin.png";

export const Contact = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[rgb(0,0,0,0.1)] text-white sm:flex-row justify-evenly sm:justify-between items-center font-semibold px-[2dvw] py-[1dvw] overflow-hidden">
      <div className="flex items-center gap-2">
        <span className="sm:text-[1.2dvw] uppercase">connect with us</span>
        <a target="_blank" href="https://github.com/tyleeer">
          <img
            src={github}
            className="h-[3dvw] max-h-[30px] max bg-slate-400 hover:bg-slate-600 hover:scale-110 transition-all rounded-full"
          />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/siradanai-namtep-3035b0269/"
        >
          <img
            src={linkedin}
            className="h-[3dvw] max-h-[30px] bg-slate-400 hover:bg-[#0077B5] hover:scale-110 transition-all rounded-full"
          />
        </a>
      </div>
      <span className="sm:text-[1.2dvw]">
        Weather data provided by OpenWeather
      </span>
    </div>
  );
};
