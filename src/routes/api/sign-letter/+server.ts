import { SMTP_USERNAME, SMTP_PASSWORD } from '$env/static/private';
import { PUBLIC_DOMAIN_EMAIL ,PUBLIC_DOMAIN_NAME} from '$env/static/public';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { generatePdf } from './generatePdf';


interface GenerateEmailContentArgs {
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  contactEmail: string;
  commitmentText: string;
  signer: {
    firstName: string;
    lastName: string;
    email: string;
  }
}

const generateEmailContent = ({
  projectName,
  projectUrl,
  contactEmail,
  signer
}: GenerateEmailContentArgs) => {
  return `
  Dear ${signer.firstName} ${signer.lastName},

  We would like to thank you for signing the Letter of Intent for the project **"${projectName}"**.

  Should you have any inquiries, feel free to contact us at:
  ${contactEmail}

  ${projectUrl ? `You can also visit the project website for more details: ${projectUrl}` : ''}

  ---
  **Important Note:**
  Please be aware that signing this Letter of Intent (LOI) is **not legally binding** and does not constitute a contract. It is a preliminary document expressing your interest and intention without creating any legal obligations.
  ---

  Best regards,

  The "${projectName}" Project Team
  ----------------------------------------------------------------------------------------------------

  This letter was created using https://www.${PUBLIC_DOMAIN_NAME}
  `;
}


const transporter = nodemailer.createTransport({
  host :'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: SMTP_USERNAME, 
    pass: SMTP_PASSWORD,
  },
});


export async function POST({ request }) {
  const {
    data: { projectName, projectDescription, projectUrl, contactEmail, commitmentText, signer }
  } = await request.json();


  const pdfAttachment = generatePdf({projectName, projectDescription, commitmentText, signer, contactEmail, projectUrl});

  const mailOptions = {
    from: `${PUBLIC_DOMAIN_NAME} <${PUBLIC_DOMAIN_EMAIL}>`,
    to: [signer.email],
    bcc: [contactEmail,PUBLIC_DOMAIN_EMAIL],
    subject: `Letter of Intent for ${projectName}`,
    text: generateEmailContent({projectName:projectName.trim(), projectDescription:projectDescription.trim(), projectUrl:projectUrl.trim(), contactEmail:contactEmail.trim(), commitmentText:commitmentText.trim(), signer: {
      firstName: signer.firstName.trim(),
      lastName: signer.lastName.trim(),
    }}),
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