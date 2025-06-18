"use server";

import { EmailProductInfo, NotificationType } from "@/types";
import nodemailer from "nodemailer";
import { EmailContent } from "@/types";

const Notification = {
    WELCOME: "WELCOME",
    CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
    LOWEST_PRICE: "LOWEST_PRICE",
    THRESHOLD_MET: "THRESHOLD_MET",
};

const getEmailTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #4a5568;
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .product-card {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .product-title {
            font-size: 20px;
            font-weight: 600;
            color: #2d3436;
            margin-bottom: 15px;
        }
        .alert-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        .stock-alert {
            background: #d4edda;
            color: #155724;
        }
        .price-alert {
            background: #f8d7da;
            color: #721c24;
        }
        .discount-alert {
            background: #fff3cd;
            color: #856404;
        }
        .cta-button {
            display: inline-block;
            background: #3182ce;
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            background: #2c5aa0;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            color: #6c757d;
            font-size: 14px;
        }
        .product-image {
            max-width: 150px;
            height: auto;
            border-radius: 8px;
            margin: 15px 0;
        }
        @media (max-width: 600px) {
            .content {
                padding: 20px 15px;
            }
            .header {
                padding: 20px 15px;
            }
            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${content}
        <div class="footer">
            <p>Thank you for using Track_Kar!</p>
            <p>This email was sent because you're tracking price changes for this product.</p>
            <p style="margin-top: 10px; font-size: 12px;">
                Track_Kar - Your Smart Price Tracking Solution
            </p>
        </div>
    </div>
</body>
</html>
`;

export async function generateEmailBody(
    product: EmailProductInfo,
    type: NotificationType
) {
    const THRESHOLD_PERCENTAGE = 40;

    const shortenedTitle =
        product.title.length > 20
            ? `${product.title.substring(0, 20)}...`
            : product.title;

    let subject = "";
    let body = "";

    switch (type) {
        case Notification.WELCOME:
            subject = `🎉 Welcome to Track_Kar - Now tracking ${shortenedTitle}`;
            body = getEmailTemplate(`
                <div class="header">
                    <h1>Welcome to Track_Kar!</h1>
                    <p>Your smart price tracking companion</p>
                </div>
                <div class="content">
                    <h2 style="color: #2d3436; margin-bottom: 20px;">You're all set!</h2>
                    <p style="font-size: 16px; margin-bottom: 20px;">
                        Great news! You are now tracking <strong>${shortenedTitle}</strong> for price changes and stock updates.
                    </p>
                    
                    <div class="product-card">
                        <div class="product-title">${shortenedTitle}</div>
                        <img src=${product.image} alt="Product Image" class="product-image" />
                        <p style="margin: 15px 0;">We'll notify you when:</p>
                        <ul style="text-align: left; margin: 15px 0; padding-left: 20px;">
                            <li>The price drops significantly</li>
                            <li>The product comes back in stock</li>
                            <li>There's a major discount</li>
                        </ul>
                        <a href="${product.url}" class="cta-button" target="_blank" rel="noopener noreferrer">
                            View Product
                        </a>
                    </div>
                    
                    <p style="margin-top: 20px; color: #6c757d;">
                        Stay tuned for updates on this and other products you're tracking!
                    </p>
                </div>
            `, "Welcome to Track_Kar");
            break;

        case Notification.CHANGE_OF_STOCK:
            subject = `🔥 ${shortenedTitle} is back in stock!`;
            body = getEmailTemplate(`
                <div class="header">
                    <h1>Great News!</h1>
                    <p>Your tracked item is back in stock</p>
                </div>
                <div class="content">
                    <div class="product-card">
                        <span class="alert-badge stock-alert">BACK IN STOCK</span>
                        <div class="product-title">${shortenedTitle}</div>
                        <p style="font-size: 16px; margin: 15px 0;">
                            🎉 The item you've been waiting for is now available again!
                        </p>
                        <p style="margin-bottom: 20px; color: #e74c3c; font-weight: 600;">
                            Don't wait - stock might run out quickly!
                        </p>
                        <a href="${product.url}" class="cta-button" target="_blank" rel="noopener noreferrer">
                            Buy Now
                        </a>
                    </div>
                </div>
            `, "Stock Alert");
            break;

        case Notification.LOWEST_PRICE:
            subject = `💰 Lowest Price Alert for ${shortenedTitle}`;
            body = getEmailTemplate(`
                <div class="header">
                    <h1>Lowest Price Ever!</h1>
                    <p>Your tracked item hit rock bottom</p>
                </div>
                <div class="content">
                    <div class="product-card">
                        <span class="alert-badge price-alert">LOWEST PRICE</span>
                        <div class="product-title">${shortenedTitle}</div>
                        <p style="font-size: 18px; margin: 15px 0; color: #e74c3c; font-weight: 600;">
                            🏆 This is the lowest price we've ever seen!
                        </p>
                        <p style="margin-bottom: 20px;">
                            This might be the perfect time to make your purchase.
                        </p>
                        <a href="${product.url}" class="cta-button" target="_blank" rel="noopener noreferrer">
                            Grab This Deal
                        </a>
                    </div>
                </div>
            `, "Lowest Price Alert");
            break;

        case Notification.THRESHOLD_MET:
            subject = `🏷️ Big Discount Alert for ${shortenedTitle}`;
            body = getEmailTemplate(`
                <div class="header">
                    <h1>Major Discount Alert!</h1>
                    <p>Your price threshold has been met</p>
                </div>
                <div class="content">
                    <div class="product-card">
                        <span class="alert-badge discount-alert">BIG DISCOUNT</span>
                        <div class="product-title">${shortenedTitle}</div>
                        <p style="font-size: 18px; margin: 15px 0; color: #f39c12; font-weight: 600;">
                            💥 Now available at ${THRESHOLD_PERCENTAGE}%+ discount!
                        </p>
                        <p style="margin-bottom: 20px;">
                            This is exactly the kind of deal you were waiting for.
                        </p>
                        <a href="${product.url}" class="cta-button" target="_blank" rel="noopener noreferrer">
                            Get This Deal
                        </a>
                    </div>
                </div>
            `, "Discount Alert");
            break;

        default:
            throw new Error("Invalid notification type.");
    }

    return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: "gmail",
  port: 587, // or 465 for secure (SSL), or 2525 if using services like Mailtrap
  auth: {
    user: "jivit.rana2024@nst.rishihood.edu.in",
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1,
  rateDelta: 20000, // 20 seconds
  rateLimit: 5, // 5 emails per 20 seconds
});

export async function sendEmail(emailContent: EmailContent, sendTo: string[]) {
    const mailOptions = {
        from: "Track_Kar <jivit.rana2024@nst.rishihood.edu.in>",
        to: sendTo,
        html: emailContent.body,
        subject: emailContent.subject,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.error("Email sending failed:", error);
            return;
        }
        console.log("Email sent successfully:", info.messageId);
    });
}