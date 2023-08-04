import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UserDetails from "./User";

const PublicProfile = () => {

  return (
    <>
      <UserDetails publicProfile={true}/>
      <ToastContainer />
    </>
  );
};

export default PublicProfile;