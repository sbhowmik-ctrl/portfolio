// Email template constants
const BUSINESS_NAME = "Sanradhya Bhowmik";
const CONTACT_PHONE = "+91 8910605164";
const CONTACT_ADDRESS = "Your AI solutions";

// Contact form (portfolio) constants
const CONTACT_FORM_NAME = "Sanradhya Bhowmik";
const CONTACT_FORM_PHONE = "+91 8910605164";

// Base email template wrapper with professional styling
const getEmailWrapper = (content: string, title: string = BUSINESS_NAME) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                ${BUSINESS_NAME}
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding-bottom: 20px;">
                    <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px; font-weight: 600;">
                      Contact Information
                    </p>
                    <p style="margin: 4px 0; color: #6b7280; font-size: 13px;">
                      📞 ${CONTACT_PHONE}
                    </p>
                    <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 13px;">
                      ${CONTACT_ADDRESS}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      © ${new Date().getFullYear()} ${BUSINESS_NAME}. All Rights Reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Contact form confirmation email (to user)
export const getContactConfirmationEmail = (fullName: string, comments?: string) => {
  const content = `
    <div style="color: #111827;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; line-height: 60px; text-align: center; margin-bottom: 20px;">
          <span style="color: #ffffff; font-size: 30px; vertical-align: middle;">✓</span>
        </div>
        <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 24px; font-weight: 600;">
          Thank You for Contacting Us!
        </h2>
        <p style="margin: 0; color: #6b7280; font-size: 16px;">
          We've received your message and will get back to you soon.
        </p>
      </div>
      
      ${comments ? `
      <div style="background-color: #f9fafb; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 6px; margin: 30px 0;">
        <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          Your Message
        </p>
        <p style="margin: 0; color: #111827; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${comments.replace(/\n/g, "<br>")}</p>
      </div>
      ` : ''}
      
      <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 8px 0; color: #111827; font-size: 15px; line-height: 1.6;">
          Dear ${fullName},
        </p>
        <p style="margin: 0 0 20px 0; color: #374151; font-size: 15px; line-height: 1.6;">
          Thank you for reaching out to ${CONTACT_FORM_NAME}! I have received your message and will review it carefully. I typically respond within 24-48 hours.
        </p>
        <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6;">
          If your inquiry is urgent, please feel free to call me directly at ${CONTACT_FORM_PHONE}.
        </p>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 6px;">
        <p style="margin: 0 0 8px 0; color: #0c4a6e; font-size: 14px; font-weight: 600;">
          Best regards,
        </p>
        <p style="margin: 0; color: #075985; font-size: 15px; font-weight: 500;">
          ${CONTACT_FORM_NAME}
        </p>
      </div>
    </div>
  `;
  
  return getEmailWrapper(content, "Thank You for Your Contact");
};

// Contact form notification email (to admin)
export const getContactNotificationEmail = (formData: {
  fullName: string;
  email: string;
  phone: string;
  requirement?: string;
  comments?: string;
}) => {
  const content = `
    <div style="color: #111827;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 50%; line-height: 60px; text-align: center; margin-bottom: 20px;">
          <span style="color: #ffffff; font-size: 30px; vertical-align: middle;">📧</span>
        </div>
        <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 24px; font-weight: 600;">
          New Contact Form Submission
        </h2>
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Submitted on ${new Date().toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
      
      <div style="background-color: #f9fafb; border-radius: 6px; padding: 25px; margin-bottom: 25px;">
        <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          Contact Information
        </h3>
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${formData.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Email:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">
              <a href="mailto:${formData.email}" style="color: #3b82f6; text-decoration: none;">${formData.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Phone:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">${formData.phone}</td>
          </tr>
          ${formData.requirement ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Requirement:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">${formData.requirement}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      ${formData.comments ? `
      <div style="background-color: #f9fafb; border-radius: 6px; padding: 25px;">
        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          Message
        </h3>
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 4px; padding: 20px; margin-top: 15px;">
          <p style="margin: 0; color: #111827; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${formData.comments.replace(/\n/g, "<br>")}</p>
        </div>
      </div>
      ` : ''}
    </div>
  `;
  
  return getEmailWrapper(content, "New Contact Form Submission");
};
