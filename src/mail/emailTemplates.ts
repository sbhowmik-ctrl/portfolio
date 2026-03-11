// Email template constants
const BUSINESS_NAME = "Sanradhya Bhowmik";
const PERSON_NAME = "Sanradhya Bhowmik";
const CONTACT_PHONE = "+91 8910605164";
const CONTACT_ADDRESS = "Your AI solutions";

// Contact form (portfolio) constants
const CONTACT_FORM_NAME = "Sanradhya Bhowmik";
const CONTACT_FORM_PHONE = "+91 8910605164";

interface ProceedingDate {
  date?: string;
  justiceName?: string;
}

interface OrderFormData {
  styleOfCause?: string;
  dueDate?: string;
  proceedingDates?: ProceedingDate[];
  crownCounselName?: string;
  defenceCounselName?: string;
  courtFileNumber?: string;
  courtLocation?: string;
  copyType?: string;
  numberOfCopies?: string;
  emailCopy?: string;
  quoteRequired?: string;
  preferredContactMethod?: string;
  additionalComments?: string;
  usedForAppeal?: string;
  appealNumber?: string;
  hasPublicationBan?: string;
  publicationBanDetails?: string;
  orderingPartyName?: string;
  emailAddress?: string;
  companyName?: string;
  designation?: string;
  streetAddress?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  officeNumber?: string;
  cellNumber?: string;
}

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

// Order form confirmation email (to user)
export const getOrderConfirmationEmail = (formData: OrderFormData) => {
  const content = `
    <div style="color: #111827;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; line-height: 60px; text-align: center; margin-bottom: 20px;">
          <span style="color: #ffffff; font-size: 30px; vertical-align: middle;">✓</span>
        </div>
        <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 24px; font-weight: 600;">
          Order Form Submission Received
        </h2>
        <p style="margin: 0; color: #6b7280; font-size: 16px;">
          Your order form submission has been successfully received.
        </p>
      </div>
      
      <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
        <p style="margin: 0; color: #0c4a6e; font-size: 14px; line-height: 1.6;">
          <strong>Thank you for your submission!</strong> We have received your order request and will review it promptly. You will receive a response shortly with next steps.
        </p>
      </div>
      
      <div style="background-color: #f9fafb; border-radius: 6px; padding: 25px; margin-bottom: 25px;">
        <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          📋 Order Details
        </h3>
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500; width: 180px;">Style of Cause:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${formData.styleOfCause || "N/A"}</td>
          </tr>
          ${formData.dueDate ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Due Date:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">${new Date(formData.dueDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 6px;">
        <p style="margin: 0 0 8px 0; color: #0c4a6e; font-size: 14px; font-weight: 600;">
          Best regards,
        </p>
        <p style="margin: 0; color: #075985; font-size: 15px; font-weight: 500;">
          ${PERSON_NAME}
        </p>
      </div>
    </div>
  `;
  
  return getEmailWrapper(content, "Order Form Submission Confirmation");
};

// Order form notification email (to admin) - comprehensive details
export const getOrderNotificationEmail = (formData: OrderFormData) => {
  const formatProceedingDates = (dates?: ProceedingDate[]) => {
    if (!dates || dates.length === 0) return "Not specified";
    return dates
      .map((pd) => `${pd.date || "N/A"} - ${pd.justiceName || "N/A"}`)
      .join("<br/>");
  };

  const formatValue = (value: string | undefined | null) => value || "N/A";
  
  const sectionStyle = "background-color: #f9fafb; border-radius: 6px; padding: 25px; margin-bottom: 25px;";
  const headingStyle = "margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;";
  const rowStyle = "padding: 8px 0; border-bottom: 1px solid #e5e7eb;";
  const labelStyle = "color: #6b7280; font-size: 14px; font-weight: 500; width: 180px; display: inline-block;";
  const valueStyle = "color: #111827; font-size: 14px;";
  
  const content = `
    <div style="color: #111827;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 50%; line-height: 60px; text-align: center; margin-bottom: 20px;">
          <span style="color: #ffffff; font-size: 30px; vertical-align: middle;">📋</span>
        </div>
        <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 24px; font-weight: 600;">
          New Court Order Form Submission
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
      
      ${formData.styleOfCause || formData.courtFileNumber ? `
      <div style="${sectionStyle}">
        <h3 style="${headingStyle}">📋 Case Details</h3>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Style of Cause:</span>
          <span style="${valueStyle} font-weight: 600;">${formatValue(formData.styleOfCause)}</span>
        </div>
        ${formData.proceedingDates && formData.proceedingDates.length > 0 ? `
        <div style="${rowStyle}">
          <span style="${labelStyle}">Proceeding Dates:</span>
          <span style="${valueStyle}">${formatProceedingDates(formData.proceedingDates)}</span>
        </div>
        ` : ''}
        <div style="${rowStyle}">
          <span style="${labelStyle}">Crown Counsel Name:</span>
          <span style="${valueStyle}">${formatValue(formData.crownCounselName)}</span>
        </div>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Defence Counsel Name:</span>
          <span style="${valueStyle}">${formatValue(formData.defenceCounselName)}</span>
        </div>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Court File Number:</span>
          <span style="${valueStyle}">${formatValue(formData.courtFileNumber)}</span>
        </div>
        <div style="padding: 8px 0;">
          <span style="${labelStyle}">Court Location:</span>
          <span style="${valueStyle}">${formatValue(formData.courtLocation)}</span>
        </div>
      </div>
      ` : ''}
      
      ${formData.copyType || formData.dueDate ? `
      <div style="${sectionStyle}">
        <h3 style="${headingStyle}">📝 Order Details</h3>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Copy Type:</span>
          <span style="${valueStyle}">${formatValue(formData.copyType)}</span>
        </div>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Number of Copies:</span>
          <span style="${valueStyle}">${formatValue(formData.numberOfCopies)}</span>
        </div>
        ${formData.emailCopy ? `
        <div style="${rowStyle}">
          <span style="${labelStyle}">Email Copy:</span>
          <span style="${valueStyle}">
            <a href="mailto:${formData.emailCopy}" style="color: #3b82f6; text-decoration: none;">${formData.emailCopy}</a>
          </span>
        </div>
        ` : ''}
        <div style="${rowStyle}">
          <span style="${labelStyle}">Quote Required:</span>
          <span style="${valueStyle}">${formatValue(formData.quoteRequired)}</span>
        </div>
        ${formData.dueDate ? `
        <div style="${rowStyle}">
          <span style="${labelStyle}">Due Date:</span>
          <span style="${valueStyle}">${new Date(formData.dueDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        ` : ''}
        ${formData.preferredContactMethod ? `
        <div style="${rowStyle}">
          <span style="${labelStyle}">Preferred Contact Method:</span>
          <span style="${valueStyle}">${formatValue(formData.preferredContactMethod)}</span>
        </div>
        ` : ''}
        ${formData.additionalComments ? `
        <div style="padding: 8px 0; margin-top: 10px;">
          <div style="margin-bottom: 8px; ${labelStyle}">Additional Comments:</div>
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; ${valueStyle} white-space: pre-wrap;">${formData.additionalComments.replace(/\n/g, "<br>")}</div>
        </div>
        ` : ''}
      </div>
      ` : ''}
      
      ${formData.usedForAppeal || formData.hasPublicationBan ? `
      <div style="${sectionStyle}">
        <h3 style="${headingStyle}">⚖️ Appeal & Publication Ban Details</h3>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Used for Appeal:</span>
          <span style="${valueStyle}">${formatValue(formData.usedForAppeal)}</span>
        </div>
        ${formData.appealNumber ? `
        <div style="${rowStyle}">
          <span style="${labelStyle}">Appeal Number:</span>
          <span style="${valueStyle}">${formatValue(formData.appealNumber)}</span>
        </div>
        ` : ''}
        <div style="${rowStyle}">
          <span style="${labelStyle}">Has Publication Ban:</span>
          <span style="${valueStyle}">${formatValue(formData.hasPublicationBan)}</span>
        </div>
        ${formData.publicationBanDetails ? `
        <div style="padding: 8px 0; margin-top: 10px;">
          <div style="margin-bottom: 8px; ${labelStyle}">Publication Ban Details:</div>
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; ${valueStyle} white-space: pre-wrap;">${formData.publicationBanDetails.replace(/\n/g, "<br>")}</div>
        </div>
        ` : ''}
      </div>
      ` : ''}
      
      ${formData.orderingPartyName || formData.emailAddress ? `
      <div style="${sectionStyle}">
        <h3 style="${headingStyle}">👤 Ordering Party Information</h3>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Name:</span>
          <span style="${valueStyle} font-weight: 600;">${formatValue(formData.orderingPartyName)}</span>
        </div>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Email:</span>
          <span style="${valueStyle}">
            ${formData.emailAddress ? `<a href="mailto:${formData.emailAddress}" style="color: #3b82f6; text-decoration: none;">${formData.emailAddress}</a>` : 'N/A'}
          </span>
        </div>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Company Name:</span>
          <span style="${valueStyle}">${formatValue(formData.companyName)}</span>
        </div>
        ${formData.designation ? `
        <div style="${rowStyle}">
          <span style="${labelStyle}">Designation:</span>
          <span style="${valueStyle}">${formatValue(formData.designation)}</span>
        </div>
        ` : ''}
        ${formData.streetAddress || formData.city ? `
        <div style="${rowStyle}">
          <span style="${labelStyle}">Street Address:</span>
          <span style="${valueStyle}">${formatValue(formData.streetAddress)}</span>
        </div>
        <div style="${rowStyle}">
          <span style="${labelStyle}">City:</span>
          <span style="${valueStyle}">${formatValue(formData.city)}</span>
        </div>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Province:</span>
          <span style="${valueStyle}">${formatValue(formData.province)}</span>
        </div>
        <div style="${rowStyle}">
          <span style="${labelStyle}">Postal Code:</span>
          <span style="${valueStyle}">${formatValue(formData.postalCode)}</span>
        </div>
        ` : ''}
        ${formData.officeNumber ? `
        <div style="${rowStyle}">
          <span style="${labelStyle}">Office Number:</span>
          <span style="${valueStyle}">${formatValue(formData.officeNumber)}</span>
        </div>
        ` : ''}
        ${formData.cellNumber ? `
        <div style="padding: 8px 0;">
          <span style="${labelStyle}">Cell Number:</span>
          <span style="${valueStyle}">${formatValue(formData.cellNumber)}</span>
        </div>
        ` : ''}
      </div>
      ` : ''}
    </div>
  `;
  
  return getEmailWrapper(content, "New Court Order Form Submission");
};

