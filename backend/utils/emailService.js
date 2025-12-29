import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_USER,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log("Gmail services connection failed");
  } else {
    console.log("Gmail configured properly and ready to send email");
  }
});

export const SendOtptoEmail = async (email, otp) => {
  const html = `
  <div style="max-width:640px;margin:0 auto;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; background:#f6f7fb; padding:24px 12px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e6e9ef;">
      <tr>
        <td style="padding:28px 28px 18px;text-align:center;background:linear-gradient(90deg,#0ea5a1,#0369a1);color:#fff;">
          <!-- Logo / Brand -->
          <div style="display:flex;align-items:center;justify-content:center;gap:50px;">
            <div style="text-align:left;">
              <div style="font-size:20px;font-weight:700;margin:0;padding:0;">Estato</div>
              <div style="font-size:12px;opacity:0.9;margin-top:2px;">Find. List. Live.</div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:26px 36px 18px;">
          <h2 style="margin:0 0 8px;font-size:20px;color:#0b1220;">Your Estato verification code</h2>
          <p style="margin:0 0 18px;color:#394152;font-size:14px;line-height:1.5;">
            Hi there,<br/>
            Use the following one-time password (OTP) to sign in to your <strong>Estato</strong> account.
          </p>

          <!-- OTP Box -->
          <div style="text-align:center;margin:20px 0;">
            <div style="display:inline-block;background:#f7fafc;padding:18px 26px;border-radius:8px;border:1px dashed #cfe8ea;">
              <span style="font-family: 'Courier New', Courier, monospace;font-size:28px;letter-spacing:6px;color:#0b1220;font-weight:700;">
                ${otp}
              </span>
            </div>
          </div>

          <p style="margin:8px 0 18px;color:#576272;font-size:13px;">
            <strong>Note:</strong> This OTP will expire in <strong>5 minutes</strong>. Do not share this code with anyone.
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px;">
            <tr>
              <td style="padding-top:6px;">
                <p style="margin:0;font-size:13px;color:#656f7a;line-height:1.5;">
                  If you didn't request this, you can safely ignore this email. For help, reach out to our support at
                  <a href="mailto:'support@estato.com" style="color:#0369a1;text-decoration:none;">
                support@estato.com
                  </a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="background:#fbfdff;padding:16px 36px 24px;border-top:1px solid #eef2f6;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="vertical-align:middle;font-size:13px;color:#6b7280;">
                <div style="font-weight:600;color:#111;">Quick tips</div>
                <ul style="padding-left:18px;margin:6px 0 0;color:#56606b;">
                  <li>OTP expires in 5 minutes</li>
                  <li>Use this code only to sign in to Estato</li>
                  <li>Do not share the OTP with anyone</li>
                </ul>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:14px 18px;text-align:center;font-size:12px;color:#94a3b8;">
          <div style="margin-bottom:6px;">Thanks, <strong style="color:#0b1220;">Team Estato</strong></div>
          <div style="color:#9aa6b3;">This is an automated message — please do not reply to this email.</div>
          <div style="margin-top:8px;font-size:11px;color:#b0bec5;">© ${new Date().getFullYear()} Estato. All rights reserved.</div>
        </td>
      </tr>
    </table>
  </div>
`;
  // Plain-text fallback
  const text = `Estato verification code: ${otp}
This code will expire in 5 minutes.
If you did not request this, ignore this email.
Support: 'support@estato.com'`;

  await transporter.sendMail({
    from: `Estato <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Estato verification code",
    text, // plain text fallback
    html, // html template above
  });
};

export const sendSellerDetailToViewer = async (
  viewerEmail,
  viewerName,
  seller,
  property
) => {
  const html = `
  <div style="max-width:640px;margin:0 auto;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; background:#f6f7fb; padding:24px 12px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e6e9ef;">
      <tr>
        <td style="padding:28px 28px 18px;text-align:center;background:linear-gradient(90deg,#0ea5a1,#0369a1);color:#fff;">
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;">
            <div style="text-align:left;">
              <div style="font-size:20px;font-weight:700;margin:0;padding:0;">Estato</div>
              <div style="font-size:12px;opacity:0.9;margin-top:2px;">Find. List. Live.</div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:26px 36px 18px;">
          <h2 style="margin:0 0 10px;font-size:20px;color:#0b1220;">Thank you for showing interest!</h2>
          <p style="margin:0 0 18px;color:#394152;font-size:14px;line-height:1.5;">
            Hi <strong>${viewerName || "there"}</strong>,<br/>
            We’ve shared your enquiry with the seller of the following property on <strong>Estato</strong>.
          </p>

          <!-- Property Info -->
          <div style="border:1px solid #e5e9f0;border-radius:8px;padding:14px 18px;margin:16px 0;background:#f9fafb;">
            <h3 style="font-size:16px;margin:0 0 8px;color:#0b1220;">Property Details</h3>
            <p style="margin:4px 0;font-size:13px;color:#505a65;">
              <strong>Type:</strong> ${
                property.residential?.type ||
                property.commercial?.type ||
                "Property"
              }
            </p>
            <p style="margin:4px 0;font-size:13px;color:#505a65;">
              <strong>Location:</strong> ${
                property.residential?.address?.locality ||
                property.commercial?.address?.locality ||
                "N/A"
              }, ${
    property.residential?.address?.city ||
    property.commercial?.address?.city ||
    ""
  }
            </p>
            <p style="margin:4px 0;font-size:13px;color:#505a65;">
              <strong>Price:</strong> ₹${
                property.residential?.propertyPrice.toLocaleString() || property.commercial?.propertyPrice.toLocaleString() || "N/A"
              }
            </p>
          </div>

          <!-- Seller Info -->
          <div style="border:1px solid #cfe8ea;border-radius:8px;padding:16px 20px;background:#ecfeff;">
            <h3 style="font-size:16px;margin:0 0 6px;color:#0b1220;">Seller Contact</h3>
            <p style="margin:4px 0;font-size:13px;color:#111;">
              <strong>Name:</strong> ${seller.name || "N/A"}
            </p>
            <p style="margin:4px 0;font-size:13px;color:#111;">
              <strong>Phone:</strong> ${seller.phone || "N/A"}
            </p>
            <p style="margin:4px 0;font-size:13px;color:#111;">
              <strong>Email:</strong> ${seller.email || "N/A"}
            </p>
          </div>

          <p style="margin:16px 0 10px;color:#4b5563;font-size:13px;">
            The seller will contact you soon.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#fbfdff;padding:16px 36px 24px;border-top:1px solid #eef2f6;">
          <p style="margin:0;font-size:13px;color:#64748b;">
            Need help? Reach out at 
            <a href="mailto:support@estato.com" style="color:#0369a1;text-decoration:none;">support@estato.com</a>
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:14px 18px;text-align:center;font-size:12px;color:#94a3b8;">
          <div style="margin-bottom:6px;">Thanks for choosing <strong style="color:#0b1220;">Estato</strong>!</div>
          <div style="color:#9aa6b3;">© ${new Date().getFullYear()} Estato. All rights reserved.</div>
        </td>
      </tr>
    </table>
  </div>
`;

  const text = `
Hi ${viewerName || "there"},

Thanks for your interest in a property on Estato!

Seller Details:
- Name: ${seller.name}
- Phone: ${seller.phone}
- Email: ${seller.email}

Property: ${
    property.residential?.type || property.commercial?.type || "Property"
  }
Location: ${
    property.residential?.address?.locality ||
    property.commercial?.address?.locality ||
    ""
  }, ${
    property.residential?.address?.city ||
    property.commercial?.address?.city ||
    ""
  }
Price: ₹${property.propertyPrice || "N/A"}

The seller will contact you soon.

Team Estato
`;

  await transporter.sendMail({
    from: `Estato <${process.env.EMAIL_USER}>`,
    to: viewerEmail,
    subject: "We've shared your enquiry with the seller",
    text,  // plain text fallback
    html, // html template above
  });
};
