import axios from "axios";

export function sendMail(to: string, subject: string, body: string) {
    let data = JSON.stringify({
        "From": process.env.FROM_EMAIL,
        "TO": to,
        "Subject": subject,
        "Text-Body": body,
        "Html-Body": body,
        "MessageStream": "outbond"
    });

    let config = {
        method: 'post',
        url: 'https://api.postmarkapp.com/email',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN
        }
    }
    return axios.request(config);
}