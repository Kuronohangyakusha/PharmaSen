import nodemailer from 'nodemailer';

// Configuration du transporteur email
// Pour Gmail, utiliser les identifiants d'application (app password)
// Pour un vrai projet, utiliser SendGrid, Mailgun, ou Resend
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

/**
 * Envoyer un email à un pharmacien
 * @param to - Email du destinataire
 * @param subject - Sujet de l'email
 * @param html - Contenu HTML de l'email
 */
export async function envoyerEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    // Si pas de config SMTP, simuler l'envoi en logs
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log(`📧 [SIMULATION] Email à ${to}: ${subject}`);
      console.log(`   Contenu: ${html.substring(0, 100)}...`);
      return true;
    }

    const info = await transporter.sendMail({
      from: `"PharmaSen" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email envoyé: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    return false;
  }
}

/**
 * Envoyer une notification de validation de pharmacie
 * @param email - Email du pharmacien
 * @param nomPharmacien - Nom de la pharmacie validée
 */
export async function notifierValidationPharmacie(email: string, nomPharmacien: string): Promise<void> {
  const subject = '✅ Votre pharmacie a été validée sur PharmaSen';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2ecc71;">Félicitations !</h2>
      <p>Votre pharmacie <strong>${nomPharmacien}</strong> a été validée par l'administrateur.</p>
      <p>Votre établissement est maintenant visible sur PharmaSen et les patients peuvent vous trouver.</p>
      <p style="margin-top: 20px;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:8082'}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Accéder à PharmaSen
        </a>
      </p>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Cet email a été envoyé automatiquement par PharmaSen. Merci de ne pas y répondre.
      </p>
    </div>
  `;
  await envoyerEmail(email, subject, html);
}

/**
 * Envoyer une notification de rejet de pharmacie
 * @param email - Email du pharmacien
 * @param nomPharmacien - Nom de la pharmacie rejetée
 * @param motif - Motif du rejet (optionnel)
 */
export async function notifierRejetPharmacie(email: string, nomPharmacien: string, motif?: string): Promise<void> {
  const subject = '❌ Votre demande de pharmacie a été refusée sur PharmaSen';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e74c3c;">Demande refusée</h2>
      <p>Votre demande pour la pharmacie <strong>${nomPharmacien}</strong> a été refusée par l'administrateur.</p>
      ${motif ? `<p><strong>Motif:</strong> ${motif}</p>` : ''}
      <p>Vous pouvez modifier les informations de votre pharmacie et soumettre une nouvelle demande.</p>
      <p style="margin-top: 20px;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:8082'}/dashboard" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Modifier ma demande
        </a>
      </p>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Cet email a été envoyé automatiquement par PharmaSen. Merci de ne pas y répondre.
      </p>
    </div>
  `;
  await envoyerEmail(email, subject, html);
}

/**
 * Envoyer une notification de nouvelle demande de pharmacie à l'admin
 * @param adminEmail - Email de l'admin
 * @param pharmacienNom - Nom du pharmacien
 * @param pharmacieNom - Nom de la pharmacie
 */
export async function notifierNouvelleDemandeAdmin(adminEmail: string, pharmacienNom: string, pharmacieNom: string): Promise<void> {
  const subject = '🔔 Nouvelle demande de pharmacie en attente de validation';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f39c12;">Nouvelle demande</h2>
      <p>Une nouvelle demande de pharmacie est en attente de validation :</p>
      <ul>
        <li><strong>Pharmacien:</strong> ${pharmacienNom}</li>
        <li><strong>Pharmacie:</strong> ${pharmacieNom}</li>
      </ul>
      <p style="margin-top: 20px;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:8082'}/admin/pharmacies" 
           style="background-color: #f39c12; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Valider la demande
        </a>
      </p>
    </div>
  `;
  await envoyerEmail(adminEmail, subject, html);
}
