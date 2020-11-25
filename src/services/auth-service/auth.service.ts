import { google } from 'googleapis';
import { defaultScope, googleConfig } from '../../configs';
import {IAuthClientGoogleDto} from './types';
import { request } from '../../utils';
import { UserModel } from '../../repositories/user-repository/user.schema';

export class AuthService {
  constructor() {}

  authGoogle = async () => await this.getAuthUrl();

  confirmAuthGoogle = async (code: string) => {
    const token = await this.getAccessTokenFromCode(code);
    const user = await this.getUserInfo(token);
    const profile = await UserModel.findOne({ email: user.email });

    if(!profile) {
      const newUser = new UserModel({
        email: user.email,
        nickname: null
      });

      await newUser.save()
    }

    return { succeeded: true }
  };

  private getAccessTokenFromCode = async (code: string) => {
    const { data } = await request({
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


  private createConnection = () => {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
  };

  private getConnectionUrl = (auth: IAuthClientGoogleDto) => {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope
    });
  };

  private getAuthUrl = () => {
    const auth = this.createConnection();
    return this.getConnectionUrl(auth);
  };

  private getUserInfo = async (accessToken: string) => {
    const { data } = await request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  };
}
