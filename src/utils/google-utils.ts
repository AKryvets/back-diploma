import { google } from 'googleapis';
import axios from 'axios';


const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.GOOGLE_REDIRECT_URL,
};

export async function getAccessTokenFromCode(code: any) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: googleConfig.clientId,
      client_secret: googleConfig.clientSecret,
      redirect_uri: googleConfig.redirect,
      grant_type: 'authorization_code',
      code,
    },
  });
  return data.access_token;
};

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth: any) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}


export function urlGoogle() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}


/*export async function getGoogleAccountFromCode(code: any) {
  const auth =  await createConnection();
  console.log(auth, 'auth')
  const data: any = await auth.getToken(code).then((data:any) => {
    console.log(data?.access_token, 'data123')});
/!*  const tokens = data.tokens;
  await auth.setCredentials(tokens);
  console.log(1)

  console.log(data.data , 3)*!/
 /!* const plus = await getGooglePlusApi(auth);
  console.log(2, plus)
  getGoogleDriveFiles*!/

 /!* const me = await plus.people.get({ userId: 'me' });
  console.log(3, me)

  const userGoogleId = me.data.id;
  const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
  return {
    id: userGoogleId,
    email: userGoogleEmail,
    tokens: tokens,
  };*!/
}*/

export async function getUserInfo(accessToken: string) {
  const { data } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
