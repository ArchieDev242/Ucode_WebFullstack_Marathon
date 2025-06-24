const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const config = require('./config.json');
const app = express();
const port = 3000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy', 
        "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
    );
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

async function setup_email_trans() 
{
    if(config.email && config.email.user && config.email.pass) 
        {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.user,
                pass: config.email.pass
            },
            name: 'swordsecurity.org',
            secure: true,
            tls: {
                rejectUnauthorized: false
            }
        });
    } else 
    {
        const test_account = await nodemailer.createTestAccount();
        
        return {
            transporter: nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: test_account.user,
                    pass: test_account.pass
                }
            }),
            isEthereal: true
        };
    }
}

function get_mission_timestamp() 
{
    const now = new Date();
    const day = now.getUTCDate().toString().padStart(2, '0');
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = now.getUTCFullYear();
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');
    
    return `${day}-${month}-${year} UTC ${hours}:${minutes}:${seconds}`;
}

app.post('/password-reminder', async (req, res) => {
    const { email } = req.body;
    
    try 
    {
        const user = await User.find_by_email(email);
        
        if(!user) 
            {
            return res.status(404).json({
                message: 'No account found with this email! ⚠️'
            });
        }
        
        const transport = await setup_email_trans();
        const transporter = transport.isEthereal ? transport.transporter : transport;
        const is_ethereal = transport.isEthereal;
        
        const display_name = config.email.display_name || 'SWORD Security';
        const display_address = config.email.display_address || config.email.user;
        
        const mission_timestamp = get_mission_timestamp();
        
        const agent_footer = `
        // --------------- CONFIDENTIAL: LEVEL ${Math.floor(Math.random() * 5) + 1} CLEARANCE REQUIRED --------------- //
        
        NOTICE: This transmission contains classified information intended only for AGENT: ${user.login.toUpperCase()}
        Any unauthorized access, use, or disclosure is strictly prohibited and may result in severe penalties.
        
        This message will self-destruct from our servers in 24 hours.
        Encryption Protocol: QUANTUM-CIPHER/9X
        Transmission Timestamp: ${mission_timestamp}
        Operational Security: DARKSHIELD Protocol
        
        Remember: "In shadows we thrive, in secrecy we protect."
        
        // ----------------------- SWORD SECURITY DIVISION ------------------------- //
        `;
        
        const mail_options = {
            from: {
                name: display_name,
                address: display_address
            },
            to: email,
            subject: 'SWORD SECURITY: CREDENTIAL RECOVERY [CLASSIFIED]',
            text: `AGENT CREDENTIALS RECOVERY
            
Authentication Code: ${user.password}

${agent_footer}

DO NOT REPLY TO THIS MESSAGE. 
DESTROY AFTER READING.`,
            html: `
            <div style="font-family: 'Courier New', monospace; background-color: #0a0a1a; color: #00ffcc; padding: 20px; border: 1px solid #00aaff;">
                <h2 style="color: #ff3366; border-bottom: 1px solid #ff3366; padding-bottom: 10px;">⚠️ AGENT CREDENTIALS RECOVERY ⚠️</h2>
                
                <p style="font-size: 16px;">Identity confirmed: <strong>${user.full_name}</strong></p>
                <p style="font-size: 16px;">Codename: <strong>${user.login.toUpperCase()}</strong></p>
                
                <div style="background-color: #001a33; border: 1px dashed #00aaff; padding: 15px; margin: 20px 0; font-family: 'Courier New', monospace;">
                    <p style="color: #ffcc00; font-size: 18px;">Authentication Code:</p>
                    <p style="color: #ff3366; font-size: 24px; letter-spacing: 3px; font-weight: bold;">${user.password}</p>
                </div>
                
                <p style="color: #ff3366; font-weight: bold;">⚠️ DELETE THIS MESSAGE AFTER MEMORIZING YOUR CODE ⚠️</p>
                
                <div style="margin-top: 30px; border-top: 1px dashed #00aaff; padding-top: 20px; font-size: 12px; color: #888899;">
                    <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; color: #888899;">
// --------------- CONFIDENTIAL: LEVEL ${Math.floor(Math.random() * 5) + 1} CLEARANCE REQUIRED --------------- //

NOTICE: This transmission contains classified information intended only for AGENT: ${user.login.toUpperCase()}
Any unauthorized access, use, or disclosure is strictly prohibited and may result in severe penalties.

This message will self-destruct from our servers in 24 hours.
Encryption Protocol: QUANTUM-CIPHER/9X
Transmission Timestamp: ${mission_timestamp}
Operational Security: DARKSHIELD Protocol

Remember: "In shadows we thrive, in secrecy we protect."

// ----------------------- SWORD SECURITY DIVISION ------------------------- //</pre>
                </div>
            </div>
            `,
            headers: {
                'Sender': display_address,
                'Return-Path': display_address,
                'Reply-To': display_address,
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'X-Organization': 'SWORD Security Division'
            }
        };

        const info = await transporter.sendMail(mail_options);
        
        if(is_ethereal) 
            {
            const preview_url = nodemailer.getTestMessageUrl(info);
            
            res.json({
                success: true,
                message: 'TEST MODE: Transmission preview available.',
                previewUrl: preview_url
            });
        } else 
        {
            res.json({
                success: true,
                message: 'Credentials securely transmitted to your communication device! 📧'
            });
        }

    } catch(error) 
    {
        console.error('Secure transmission failure :<  :', error);
        
        if(error.code === 'EAUTH') 
            {
            res.status(500).json({
                message: 'Secure channel authentication failed. Check communication protocols :<'
            });
        } else 
        {
            res.status(500).json({
                message: 'Failed to transmit credentials! Security protocol broken! :<'
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});