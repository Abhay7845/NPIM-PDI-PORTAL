export const msalConfig = {
  auth: {
    clientId: "a1894c94-0958-418d-a801-5de5b5d81f43",
    authority:
      "https://login.microsoftonline.com/7cc91c38-648e-4ce2-a4e4-517ae39fc189",
    redirectUri: "/NpimPortalTest/indent",
  },
};

export const loginRequest = {
  scopes: [
    "user.read",
    "openid",
    "profile",
    "email",
    "api://a6dae798-6d84-482a-b2fd-003017b34571/access_as_user",
  ],
};
