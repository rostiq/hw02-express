const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_SECRET);

const sendEmail = async (data) => {
    const email = { ...data, from: 'rostiknatkha@gmail.com' }
    await sgMail.send(email);
    return true;

};

module.exports = {
  sendEmail
}