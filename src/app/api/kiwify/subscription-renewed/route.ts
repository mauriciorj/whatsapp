import { type NextRequest, NextResponse } from "next/server";
import { createServer } from "@/db/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createServer();
  const body = await req.json();

  const orderStatus = body?.order_status;
//   const webhookEventType = body?.webhook_event_type;

  const customerEmail = body?.Customer?.email;

  const subscriptionStatus = body?.Subscription?.status;

  const subscriptionPlanName = body?.Subscription?.plan?.name;

  const subscriptionInformation = {
    orderStatus,
    customerEmail,
    subscriptionStatus,
    subscriptionPlanName,
  };

  await supabase
    .from("whatsapp")
    .update(subscriptionInformation)
    .eq("email", customerEmail);

  return NextResponse.next();
}
