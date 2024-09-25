import {  useNavigate } from "react-router-dom";
import rocket from "../assets/rocket.svg"
import ai from "../assets/ai.svg"
import person from "../assets/person.svg"
import robo from "../assets/robo.svg"
function Home() {
    const navigate=useNavigate()
    return (
      <div className="h-full flex flex-col items-center justify-center bg-bgColor ">
        {/* Main content area */}
        <div className="w-9/12 h-5/6 flex flex-row justify-between text-white mt-56   p-6 rounded-lg ">
          {/* Text Section */}
          <div className="w-3/6 space-y-12  ">
            <h1 className="text-5xl font-bold ">
              Accelerate Innovation with Global AI Challenge
            </h1>
            <p className="">
              AI Challenges at DPhi simulate real-world problems. It is a great place to put your
              AI/Data Science skills to the test on diverse datasets, allowing you to foster learning
              through competitions.
            </p>
            <button onClick={()=>{navigate("/create")}} className="px-4 py-2  font-bold  bg-white text-textColor rounded-md hover:bg-blue-600 transition duration-300">
              Create Challenge
            </button>
          </div>
          {/* Icon/Illustration Section */}
          <div className="text-6xl text-gray-800">
            <img src={rocket} alt="" />
          </div>
        </div>
        {/* Footer or Additional Section */}
        <div className="w-full mt-8 h-64  bg-promoDiv text-center flex justify-center items-center ">
          <div className="w-9/12  flex flex-row divide-x-2 justify-between">
           <div className=" w-1/3 flex items-center justify-center space-x-4
           ">
              <img src={ai}></img>
              <span className="flex flex-col text-left">
                <h1 className=" text-2xl font-bold text-white"> 100k+</h1>
                <p className=" text-white">Ai model submissions</p>

              </span>
           </div>
           <div className=" w-1/3 flex items-center justify-center space-x-4
           ">
           <img src={person}></img>

           <span className="flex flex-col text-left">
                <h1 className=" text-2xl font-bold text-white"> 50k+</h1>
                <p className=" text-white">Data Scientist</p>

              </span>
           </div >
           <div className=" w-1/3 flex items-center justify-center space-x-4
           ">
           <img src={robo}></img>
           <span className="flex flex-col text-left">
                <h1 className=" text-2xl font-bold text-white"> 100+</h1>
                <p className=" text-white">Ai challenge hosted</p>

              </span>
           </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  