const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const port = 8800;

app.use(express.json());

app.post('/api/extramail',(req,res)=>{
    console.log(req.body);
    res.redirect('http://localhost:4200/phone/');
});

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
});


// const express = require('express');
// const { OAuth2Client } = require('google-auth-library');

// const app = express();
// const port = 8800;

// const client = new OAuth2Client('892616858890-0nju4pvgoee7c8grt4cnei5qivf0th78.apps.googleusercontent.com'); // Replace CLIENT_ID with your actual Google OAuth client ID

// app.use(express.json());

// app.post('/api/extramail', async (req, res) => {
//     console.log('Received POST request:', req.body);
//     res.redirect('http://localhost:4200/phone/');
//   const token = req.body.token; // Assuming the token is sent in the request body

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: '892616858890-0nju4pvgoee7c8grt4cnei5qivf0th78.apps.googleusercontent.com', // Verify that the token is intended for your client ID
//     });
//     const payload = ticket.getPayload();
//     const email = payload.email;

//     // Now you have the user's email, you can proceed with further actions
//     console.log('User email:', email);

//     // Send back the email in the response
//     res.json({ email });
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(400).json({ error: 'Invalid token' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
