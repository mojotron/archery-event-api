import resend from "../config/resend.js";
import { NODE_ENV, EMAIL_SENDER } from "../constants/env.js";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const getFromEmail = () =>
  NODE_ENV === "development" ? "onboarding@resend.dev" : EMAIL_SENDER;

const getToEmail = (to: string) =>
  NODE_ENV === "development" ? "delivered@resend.dev" : to;

const sendMail = async ({ to, subject, text, html }: Params) => {
  return await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
};

export default sendMail;
