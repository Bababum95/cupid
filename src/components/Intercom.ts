"use client";

import { useEffect } from "react";
import IntercomSDK from "@intercom/messenger-js-sdk";

const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID;

export const Intercom = () => {
  useEffect(() => {
    if (INTERCOM_APP_ID) IntercomSDK({ app_id: INTERCOM_APP_ID });
  }, []);

  return null;
};
