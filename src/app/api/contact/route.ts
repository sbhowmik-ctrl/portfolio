import { NextRequest, NextResponse } from "next/server";
import { sendMail1, sendMail2 } from "@/mail/sendMail";
import { getContactConfirmationEmail, getContactNotificationEmail } from "@/mail/emailTemplates";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  requirement: z.string().optional(),
  comments: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, phone, email, requirement, comments } = validationResult.data;

    // Send confirmation email to user
    if (email) {
      const confirmationEmail = getContactConfirmationEmail(fullName, comments);
      sendMail1(
        confirmationEmail,
        email,
        "Thank You for Your Contact - Margaret Graham Court Transcription Services"
      );

      // Send notification email to admin
      const notificationEmail = getContactNotificationEmail({
        fullName,
        email,
        phone,
        requirement,
        comments,
      });
      sendMail2(
        notificationEmail,
        email,
        `New Contact Form Submission - ${fullName}`,
        fullName
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit contact form",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
