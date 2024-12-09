import stripePackage from 'stripe';
import Donation from '../model/donation.Model.js';
import Charity from '../model/charity.Model.js';
import { sendEmail } from '../db/mail.js';

// Initialize Stripe
// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export async function donate(req, res) {
  try {
    const { amount, charityId, paymentMethodId } = req.body;

    // Validate input
    if (!amount || !charityId || !paymentMethodId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true, // Automatically confirm the payment
    });

    // Log the payment intent for debugging
    console.log('Payment Intent:', paymentIntent);

    // Save the donation to the database
    const donation = await Donation.create({
      amount,
      paymentId: paymentIntent.id,
      userId: req.user.id,
      charityId,
    });

    // Fetch the logged-in user's email and name
    const { email, name } = req.user;

    // Send confirmation email to the user
    await sendEmail(
      email,
      'Donation Confirmation',
      `Thank you for your donation of $${amount}.`,
      `<h1>Donation Confirmation</h1><p>Thank you, ${name}, for donating $${amount} to our charity!</p>`
    );

    // Respond to the client
    res.status(201).json({
      message: 'Donation successful',
      donation,
    });
  } catch (error) {
    console.error('Donation Error:', error);

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      res.status(400).json({ error: 'Card declined' });
    } else {
      res.status(500).json({ error: 'Donation failed' });
    }
  }
}
