import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export interface CheckoutSubscriptionBody {
  price: number;
  name: string;
  description: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutSubscriptionBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "aud",
            unit_amount: body.price,
            product_data: {
              name: body.name,
              description: body.description,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard`,
      cancel_url: `${origin}/courses`,
    });

    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}

// NEED TO ADD LOGIC FOR SUBMITTING DATA TO DB TO TRACK WHICH USERS HAVE PURCHASED WHICH COURSES
