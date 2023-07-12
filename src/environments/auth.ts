import config from './auth_config.json';

const {
  domain,
  clientId,
  authorizationParams: { audience },
  appUri,
  apiUri,
  errorPath,
} = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
  };
  appUri: string;
  apiUri: string;
  errorPath: string;
};

export const auth = {
  production: false,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
      redirect_uri: config.appUri + "/back-office",
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};
