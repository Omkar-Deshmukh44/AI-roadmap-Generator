import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input.jsx";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options.jsx";
import { SelectTravellerList } from "@/constants/options.jsx";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "@/service/AImodel.jsx";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore"
import { db } from "../service/firebaseConfig.jsx";
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 15) {
      console.log("Please enter trip days less than 15");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp); // Fetch user profile after login
    },
    onError: (error) => console.log("Google login error:", error),
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log("User profile:", resp.data); // Log user profile
        localStorage.setItem("user", JSON.stringify(resp.data)); // Optionally store user data
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      formData?.noOfDays > 15 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please enter all details");
      return;
    }

    console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);


    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  };

  const SaveAiTrip = (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId
    }).then(() => {
      setLoading(false);
      navigate('/view-trip/' + docId)
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-5 mt-10">
      <h2 className="font-bold text-3xl text-[#540D6E]">
        Tell us your travel preferences
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">Enter your destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days of trip are you planning?
          </h2>
          <Input
            placeholder={"Ex.2"}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base placeholder:text-gray-500"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ${formData?.budget === item.title &&
                  "bg-[#CFBCDF] text-white shadow-lg border-black scale-115 transition-all duration-300"
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who will you be traveling with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravellerList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ${formData?.traveller === item.people &&
                  "bg-[#CFBCDF] text-white shadow-lg border-black scale-115 transition-all duration-300"
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        disabled={loading}
        onClick={OnGenerateTrip}
        className="bg-[#540D6E] text-white hover:bg-[#CFBCDF] hover:scale-105 rounded-full py-1.5 px-8 text-lg mt-8 mb-10 mx-auto block transition-all duration-300"
      >
        {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip →'
        }

      </Button>

      <Dialog open={openDialog} className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="h-[20%]" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to App with Google Authentication</p>
              <Button

                onClick={login}
                
                className="w-full flex gap-4 items-center mt-5 bg-black text-white hover:bg-gray-700 transition-all duration-300">

                <FcGoogle className="h-10" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
