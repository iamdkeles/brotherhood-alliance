import ContactUsEmailTemplate from "@/app/contact/ContactUsEmailTemplate";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      agreeToTerms,
    } = await req.json();

    const reactElement = await ContactUsEmailTemplate({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      agreeToTerms,
    });

    const { data, error } = await resend.emails.send({
      from: "Brotherhood Alliance <olabiyioladele@gmail.com>",
      to: ["olabiyioladele@gmail.com"],
      subject: subject,
      react: reactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
