import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export interface CheckoutSubscriptionBody {
  userId: string;
  userEmail: string;
  courseId: number;
  courseName: string;
  courseDescription: string;
  coursePrice: number;
}

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutSubscriptionBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.userEmail,
      allow_promotion_codes: true,
      currency: "aud",
      line_items: [
        {
          price_data: {
            currency: "aud",
            unit_amount: body.coursePrice,
            product_data: {
              name: body.courseName,
              description: body.courseDescription,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: body.userId,
        courseId: body.courseId,
        courseName: body.courseName,
      },
      success_url: `${origin}/success/{CHECKOUT_SESSION_ID}`,
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
