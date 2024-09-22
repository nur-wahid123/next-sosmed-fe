"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import API_ENDPOINT from "../../../config/endpoint";

export default function Try() {
  const handleClick = async () => {
    await axios.get(API_ENDPOINT.TRY_URL).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <Button onClick={handleClick}>Click This</Button>
    </div>
  );
}
