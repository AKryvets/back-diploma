export interface IAuthClientGoogleDto {
  _clientId?: string,
  _clientSecret?: string,
  generateAuthUrl: (value: IGenerateAuthUrlDto) => string
}

interface IGenerateAuthUrlDto {
  access_type: string,
  prompt: string,
  scope: string[],
}