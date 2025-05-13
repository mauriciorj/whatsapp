import { type NextRequest, NextResponse } from "next/server";
import createServer from "@/db/supabase/server";

type userEmail = {
  email: string;
}[];

export async function POST(req: NextRequest) {
  const supabase = await createServer();
  const body = await req.json();

  const orderStatus = body?.order_status;
//   const webhookEventType = body?.webhook_event_type;

  const customerFirstName = body?.Customer?.first_name;
  const customerFullName = body?.Customer?.full_name;
  const customerEmail = body?.Customer?.email;
  const customerState = body?.Customer?.state;
  const customerCity = body?.Customer?.city;
  const customerMobile = body?.Customer?.mobile;

  const subscriptionId = body?.Subscription?.id;
  const subscriptionStartDate = body?.Subscription?.start_date;
  const subscriptionNextPayment = body?.Subscription?.next_payment;
  const subscriptionStatus = body?.Subscription?.status;

  const subscriptionPlanName = body?.Subscription?.plan?.name;

  const subscriptionInformation = {
    orderStatus,
    customerFirstName,
    customerFullName,
    customerEmail,
    customerState,
    customerCity,
    customerMobile,
    subscriptionId,
    subscriptionStartDate,
    subscriptionNextPayment,
    subscriptionStatus,
    subscriptionPlanName,
  };

  const { data } = await supabase
    .from("whatsapp")
    .select("email")
    .eq("email", customerEmail)
    .returns<userEmail>();

  if (!data?.length) {
    await supabase.from("whatsapp_tracking").insert(subscriptionInformation);
  } else {
    await supabase
      .from("whatsapp")
      .update(subscriptionInformation)
      .eq("email", customerEmail);
  }

  return NextResponse.next();
}
