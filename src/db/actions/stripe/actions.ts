// import { NextResponse } from "next/server";
// import { headers } from "next/headers";

// import { stripe } from "@/lib/stripe";

// const StripePayment = async ({ priceId }: { priceId: string }) => {
//   try {
//     const headersList = await headers();
//     const origin = headersList.get("origin");

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${origin}/?canceled=true`,
//     });
//     return NextResponse.redirect(session.url as any, 303);
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     );
//   }
// };

// export default StripePayment;
