import { Navigate, useNavigate } from "react-router-dom";
import rocket from "../assets/rocket.svg"
function Home() {
    const navigate=useNavigate()
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-500 p-8">
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
            <button onClick={()=>{navigate("/create")}} className="px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Create Challenge
            </button>
          </div>
          {/* Icon/Illustration Section */}
          <div className="text-6xl text-gray-800">
            <img src={rocket} alt="" />
          </div>
        </div>
        {/* Footer or Additional Section */}
        <div className="w-full mt-8 p-4 bg-green-300 text-center ">
          Hello
        </div>
      </div>
    );
  }
  
  export default Home;
  