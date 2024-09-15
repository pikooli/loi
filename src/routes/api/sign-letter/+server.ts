import { SMTP_USERNAME, SMTP_PASSWORD } from '$env/static/private';
import { PUBLIC_DOMAIN_EMAIL ,PUBLIC_DOMAIN_NAME} from '$env/static/public';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { generatePdf } from './generatePdf';

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.fr',
  port: 465, 
  secure: true,
  auth: {
    user: SMTP_USERNAME, 
    pass: SMTP_PASSWORD,
  },
});


export async function POST({ request }) {
  const {
    data: { projectName, projectDescription, projectUrl, contactEmail, commitmentText, signer },
  } = await request.json();

  const emailContent = `
  Hello ${signer.firstName} ${signer.lastName},

  Thank you for signing the Letter of Intent for the project "${projectName}".

  **Project Description:**
  ${projectDescription}

  **Project URL:**
  ${projectUrl || 'N/A'}

  **Contact Email:**
  ${contactEmail}

  **Commitment Text:**
  ${commitmentText}

  **Please Note:**
  Signing this Letter of Intent (LOI) is not legally binding and does not constitute a contract. It is a preliminary document expressing your interest and intention without creating any legal obligations.

  Best regards,
  The "${projectName}" Project Team
  ----------------------------------------------------------------------------------------------------
  
  This letter was created using the site https://www.${PUBLIC_DOMAIN_NAME}
  `;

  const pdfAttachment = generatePdf({projectName, projectDescription, commitmentText, signer, contactEmail, projectUrl});

  const mailOptions = {
    from: `${PUBLIC_DOMAIN_NAME} <${PUBLIC_DOMAIN_EMAIL}>`,
    to: [signer.email, ],
    bcc: [contactEmail,PUBLIC_DOMAIN_EMAIL],
    subject: `Letter of Intent for ${projectName}`,
    text: emailContent,
    attachments: [
      {
        filename: `${projectName}_Letter_of_Intent.pdf`,
        content: pdfAttachment,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);

    return json({ success: true });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    return json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}