
import info1 from "../../assets/info_1png.png";
import info2 from "../../assets/info_2.png";
import info3 from "../../assets/info_3.png";
function Info() {
  return (
    <div className="bg-white">
      <div className=" bg-white text-center flex justify-center content-center">
        <div className="text-5xl p-[4%] lg:w-[70vw] font-zilla">
          Revolutionize Your Business with Innovative Startups
        </div>
      </div>
      <div className="flex flex-row mx-[20%] gap-4 justify-between h-[30vh]">
        <div className="w-[30%]">
          <div className="flex justify-center content-center h-[30px] mb-5">
            <img className="object-cover " src={info1}/>
            </div>
          <div className="text-gray-500 text-center text-sm font-sans">
            Discover groundbreaking solutions across industries
          </div>
        </div>
        <div className="w-[25%]">
        <div className="flex justify-center h-[30px] content-center mb-5">
            <img className="object-cover " src={info2}/>
            </div>
          <div className="text-gray-500 text-center text-sm font-sans">
            Explore cutting-edge products and services
          </div>
        </div>
        <div className="w-[30%]">
        <div className="flex justify-center content-center h-[30px] mb-5">
            <img className="object-cover " src={info3}/>
            </div>
          <div className="text-gray-500 text-center text-sm font-sans">
            Connect with forward-thinking founders
          </div>
        </div>
      </div>
      <div className="flex flex-row mx-[5%] gap-20 justify-between h-[80vh] ">
        <div className="bg-black rounded-xl h-[70vh] w-1/3">
        <div>
            <img/>
        </div>
        <div className="text-white">
            Header
        </div>
        <div className="text-gray-500">
            info
        </div>
        </div>
        <div className="bg-black rounded-xl h-[70vh] w-1/3"></div>
        <div className="bg-black rounded-xl h-[70vh] w-1/3"></div>
      </div>
    </div>
  );
}

export default Info;
