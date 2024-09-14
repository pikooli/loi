import { MAIL_API_KEY,DOMAIN_EMAIL  } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

const mailersend = new MailerSend({
    apiKey: MAIL_API_KEY
});

export async function POST({ request }) {
	const {data: {projectName, contactEmail, commitmentText, signer}} = await request.json();


	const from = new Sender(DOMAIN_EMAIL);
	const to = [
		new Recipient(signer.email, `${signer.firstName} ${signer.lastName}`),
		new Recipient(contactEmail, 'Responsable du Projet'),
        new Recipient(DOMAIN_EMAIL, 'DOMAIN EMAIL')
	];

	const emailContent = `
    Bonjour ${signer.firstName} ${signer.lastName},

    Merci d'avoir signé la lettre d'engagement pour le projet "${projectName}".

    Texte d'engagement :
    ${commitmentText}

    Cordialement,
    L'équipe du projet "${projectName}"
  `;

	const emailParams = new EmailParams()
		.setFrom(from)
		.setTo(to)
		.setSubject(`Lettre d'Engagement pour ${projectName}`)
		.setText(emailContent);
    console.log('emailParams', emailParams)
	try {
		await mailersend.email.send(emailParams);

		return json({ success: true });
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email :", error);
		return json({ success: false, error: error.message }, { status: 500 });
	}
}
