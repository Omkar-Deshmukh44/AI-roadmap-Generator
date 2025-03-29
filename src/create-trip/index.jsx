import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input.jsx";
import { AI_PROMPT, SelectPreparationLevels } from "@/constants/options.jsx";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "@/service/AImodel.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig.jsx";
import { useNavigate } from "react-router-dom";

function CreateRoadmap() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateRoadmap = async () => {
    if (!formData?.exam || !formData?.monthsLeft || !formData?.preparationLevel) {
      toast("Please enter all details");
      return;
    }

    console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{exam}", formData?.exam)
      .replace("{monthsLeft}", formData?.monthsLeft)
      .replace("{preparationLevel}", formData?.preparationLevel);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiRoadmap(result?.response?.text());
  };

  const SaveAiRoadmap = (RoadmapData) => {
    setLoading(true);
    const docId = Date.now().toString();
    setDoc(doc(db, "AIRoadmaps", docId), {
      userSelection: formData,
      roadmapData: RoadmapData,
      id: docId,
    }).then(() => {
      setLoading(false);
      navigate("/view-roadmap/" + docId);
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-5 mt-10">
      <h2 className="font-bold text-3xl text-[#540D6E]">
        Tell us your exam details
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Provide some basic information, and our AI will generate a customized roadmap based on your preparation level.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">Enter your Exam Name</h2>
          <Input
            placeholder={"Ex. JEE, GATE, UPSC"}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base placeholder:text-gray-500"
            onChange={(e) => handleInputChange("exam", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Months Left for Exam</h2>
          <Input
            placeholder={"Ex. 6"}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base placeholder:text-gray-500"
            onChange={(e) => handleInputChange("monthsLeft", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Your Preparation Level</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectPreparationLevels.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("preparationLevel", item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ${formData?.preparationLevel === item.title &&
                  "bg-[#CFBCDF] text-white shadow-lg border-black scale-115 transition-all duration-300"
                  }`}
              >
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-4xl mt-5">{item.icon}</h2>
                <h2 className="text-sm text-gray-500 mt-5">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        disabled={loading}
        onClick={OnGenerateRoadmap}
        className="bg-[#540D6E] text-white hover:bg-[#CFBCDF] hover:scale-105 rounded-full py-1.5 px-8 text-lg mt-8 mb-10 mx-auto block transition-all duration-300"
      >
        {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Roadmap →'}
      </Button>
    </div>
  );
}

export default CreateRoadmap;
