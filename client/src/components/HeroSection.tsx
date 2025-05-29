import { useState } from "react";
import { Input } from "./ui/input"
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HereImage from "../assets/vecteezy_vegetable-thai-food-isolated-on-transparent-background_46342839.png";

const HeroSection = () => {
    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
      <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
           Order meals wherever, whenever
          </h1>
          <p className="text-gray-500">
          Hi there! Your tasty meal is ready, and we're always near 
          you
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={searchText}
            placeholder="Search restaurant by name, city & country"
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 shadow-lg"
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button onClick={() => navigate(`/search/${searchText}`)} className="bg-orange hover:bg-hoverOrange">Search</Button>
        </div>
      </div>
      <div>
        <img 
        src={HereImage} 
        alt="" 
        className="object-cover w-full max-h-[500px]"
        />
      </div>
    </div>
  )
}

export default HeroSection
