import { NextRequest, NextResponse } from "next/server";
import { sendMail1, sendMail2 } from "@/mail/sendMail";
import { getOrderConfirmationEmail, getOrderNotificationEmail } from "@/mail/emailTemplates";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proceedingDates, ...orderData } = body;
    const isEmail = (input: string) =>
      z.string().email().safeParse(input).success;

    const confirmationSubject = `Court Order Form Submission Confirmation`;
    const notificationSubject = `New Court Order Form Submission`;

    // Send confirmation email to user
    if (orderData.emailAddress) {
      const confirmationEmail = getOrderConfirmationEmail({
        ...orderData,
        proceedingDates,
      });
      sendMail1(confirmationEmail, orderData.emailAddress, confirmationSubject);

      // Send notification email to admin
      const notificationEmail = getOrderNotificationEmail({
        ...orderData,
        proceedingDates,
      });
      sendMail2(
        notificationEmail,
        orderData.emailAddress,
        notificationSubject,
        orderData.orderingPartyName || "Order Form Submitter"
      );
    }

    // Send copy to additional email if provided
    if (orderData.emailCopy && isEmail(orderData.emailCopy)) {
      const confirmationEmail = getOrderConfirmationEmail({
        ...orderData,
        proceedingDates,
      });
      sendMail1(confirmationEmail, orderData.emailCopy, confirmationSubject);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
