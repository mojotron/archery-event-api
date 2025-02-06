import resend from "../config/resend.js";

const sendMail = async () => {
  const { data, error } = await resend.emails.send({
    from: "",
    to: "",
    subject: "",
    text: "",
    html: "",
  });
};

export default sendMail;
