import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { CreateUser, deleteUser } from "@/lib/actions/user.action";
import { UpdateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

const webhookSecret: any = process.env.NEXT_CLERK_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    // Create user in database
    const mongoUser = await CreateUser({
      clerkId: id,
      email: email_addresses[0].email_address,
      picture: image_url,
      username: username!,
      name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
    });
    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    // Create user in database
    const mongoUser = await UpdateUser({
      clerkId: id,
      updateData: {
        email: email_addresses[0].email_address,
        picture: image_url,
        username: username!,
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
      },
      path: `/profile/${id}`,
    });
    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser({
      clerkId: id!,
    });

    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  return res.status(200).json({});
}
