import sgMail from "@sendgrid/mail"



export const sendEmail = async (recipientAddress,body) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: "simon.kovacsp22@gmail.com", // Change to your recipient
      from: process.env.SENDER_EMAIL, // Change to your verified sender
      subject: "product_data",
      text: "I am sending a product name:" ,
      html: `<strong>${body}</strong>`,
    }
    await sgMail.send(msg)
}