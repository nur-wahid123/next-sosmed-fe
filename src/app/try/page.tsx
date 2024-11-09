"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import API_ENDPOINT from "../../../config/endpoint";
import DataFetcherWithForm from "@/components/data-fetcher.component";

export default function Try() {

  return (
    <div>
      <DataFetcherWithForm/>
    </div>
  );
}
