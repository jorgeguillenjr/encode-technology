# EmailJS Setup Instructions

To complete the email functionality, you need to set up EmailJS:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Note down your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** Nuevo mensaje de contacto desde Encode Technology

**Content:**
```
Nuevo mensaje de contacto:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
Servicio de interés: {{service}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de Encode Technology.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" in your dashboard
2. Find your **Public Key** in the API Keys section

## Step 5: Update the Code
Replace these values in `script.js`:
- `YOUR_PUBLIC_KEY` with your actual public key
- `YOUR_SERVICE_ID` with your service ID
- `YOUR_TEMPLATE_ID` with your template ID

## Example Configuration:
```javascript
emailjs.init("your_public_key_here");

emailjs.send('gmail', 'template_contact', templateParams)
```

## Testing
1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the message
4. Check the EmailJS dashboard for delivery status

## Free Plan Limits
- 200 emails per month
- EmailJS branding in emails
- Basic support

For higher limits, consider upgrading to a paid plan.