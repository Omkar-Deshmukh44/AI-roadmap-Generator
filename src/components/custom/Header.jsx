import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google'; // Ensure proper import
import axios from 'axios'; // Ensure proper import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

function Header() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  });

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
        console.log("User profile:", resp.data);
        setUser(resp.data); // Update state
        localStorage.setItem("user", JSON.stringify(resp.data)); // Persist data in localStorage
        setOpenDialog(false) ;
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null); // Clear user state
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Logo */}
      <img className='mt-2 ' src="/logo.svg" alt="Logo" />

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <a href='/my-trips'>
            <Button variant="outline" className="rounded-full hover:scale-105 transition-all duration-300">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture || '/default-profile.png'} // Fallback for missing picture
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer hover:text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button
              onClick={() => setOpenDialog(true)}
              className="bg-[#540D6E] text-white hover:bg-[#CFBCDF] rounded-[20%] transition-all duration-300"
            >
              Sign In
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
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
