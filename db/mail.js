import sgMail from '@sendgrid/mail';

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send Email
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text content.
 * @param {string} html - HTML content (optional).
 */
export async function sendEmail(to, subject, text, html = null) {
  const msg = {
    to,
    from: process.env.EMAIL_SENDER, // Your verified SendGrid sender email address
    subject,
    text,
    html,
  };

  try {
    const response = await sgMail.send(msg);
    console.log(`Email sent to ${to}: ${response[0].statusCode}`);
    return response;
  } catch (error) {
    console.error(`Failed to send email to ${to}: ${error.message}`);
    throw error;
  }
}
