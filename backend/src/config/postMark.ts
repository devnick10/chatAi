import axios from "axios";
import { FROM_EMAIL, POSTMARK_SERVER_TOKEN } from "./config";

export function sendMail(to: string, subject: string, body: string) {
  let data = JSON.stringify({
    From: FROM_EMAIL,
    TO: to,
    Subject: subject,
    "Text-Body": body,
    "Html-Body": body,
    MessageStream: "outbond",
  });
  let config = {
    method: "post",
    url: "https://api.postmarkapp.com/email",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": POSTMARK_SERVER_TOKEN,
    },
  };
  return axios.request(config);
}
