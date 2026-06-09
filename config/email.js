import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// deliver email toh gmail karega main uske sath connection bana raha hu
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your Gmail address
    pass: process.env.EMAIL_PASS,   // Gmail App Password (not your real password)
  },
});

export const sendAnimalListedEmail = async ({ toEmail, toName, animalName }) => {
  const mailOptions = {
    from: `"StraySafe 🐾" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `✅ ${animalName} has been listed on StraySafe!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #18181b; color: white; padding: 32px; border-radius: 16px;">
        <h1 style="color: #3b82f6;">🐾 StraySafe</h1>
        <p>Hi <strong>${toName}</strong>,</p>
        <p>Thank you for listing <strong>${animalName}</strong> on StraySafe!</p>
        <p>Your listing is now live and potential adopters can find ${animalName} through search.</p>
        <p style="margin-top: 24px; color: #a1a1aa; font-size: 13px;">
          If this wasn't you, please contact us immediately.
        </p>
        <hr style="border-color: #3f3f46; margin: 24px 0;" />
        <p style="color: #a1a1aa; font-size: 12px;">StraySafe — Giving Stray Animals a Second Chance</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};