import { MAIL_API_KEY } from '$env/static/private';
import { PUBLIC_DOMAIN_EMAIL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailersend = new MailerSend({
  apiKey: MAIL_API_KEY,
});

export async function POST({ request }) {
  const {
    data: { projectName, projectDescription, projectUrl, contactEmail, commitmentText, signer },
  } = await request.json();

  const from = new Sender(PUBLIC_DOMAIN_EMAIL);
  const toSigner = [
    new Recipient(signer.email, `${signer.firstName} ${signer.lastName}`),
  ];

  const toContact = [
    new Recipient(contactEmail, 'Project Manager'),
  ];

  const emailContent = `
  Hello ${signer.firstName} ${signer.lastName},

  Thank you for signing the Letter of Intent for the project "${projectName}".

  **Project Description:**
  ${projectDescription}

  **Project URL:**
  ${projectUrl || 'Na'}

  **Contact Email:**
  ${contactEmail}

  **Commitment Text:**
  ${commitmentText}

  **Please Note:**
  Signing this Letter of Intent (LOI) is not legally binding and does not constitute a contract. It is a preliminary document expressing your interest and intention without creating any legal obligations.

  
  Best regards,
  The "${projectName}" Project Team
  ----------------------------------------------------------------------------------------------------

  This letter was created using the site https://www.letterofinterest.tech/
  `;

  const emailParamsSigner = new EmailParams()
    .setFrom(from)
    .setTo(toSigner)
    .setSubject(`Letter of Intent for ${projectName}`)
    .setText(emailContent);

    const emailParamsContact = new EmailParams()
    .setFrom(from)
    .setTo(toContact)
    .setSubject(`Letter of Intent for ${projectName}`)
    .setText(emailContent);

  console.log('emailParamsSigner', emailParamsSigner);
  console.log('emailParamsContact', emailParamsContact);

  try {
    await mailersend.email.send(emailParamsSigner);
    await mailersend.email.send(emailParamsContact);

    return json({ success: true });
  } catch (error) {
    console.error('Error sending the email:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}