export interface CreateNotificationSubscriptionPayload {
  channelId: string;
  webPushDetail: {
    endpoint: string;
    keys: {
      auth: string;
      p256dh: string;
    };
  };
}

export interface CreateVerificationCodePayload {
  email: string;
}

export interface GetSessionWithVerificationCodePayload {
  email: string;
  verificationCode: string;
}

export interface GetCurrentSessionProfileResponse {
  id: number;
  email: string;
}

export async function createVerificationCode(
  payload: CreateVerificationCodePayload
) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/login-with-email/create-verification-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: payload.email
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create verification code");
  }
}

export async function getSessionWithVerificationCode(
  payload: GetSessionWithVerificationCodePayload
) {
  await fetch(
    `${import.meta.env.VITE_SERVER_URL}/login-with-email/get-session-with-verification-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      credentials: "include"
    }
  );
}

export async function getCurrentSessionProfile(): Promise<GetCurrentSessionProfileResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/account/profile/me`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get current session profile");
  }

  return await response.json();
}

export async function createNotificationSubscription(
  payload: CreateNotificationSubscriptionPayload
) {
  await fetch(
    `${import.meta.env.VITE_SERVER_URL}/channels/${payload.channelId}/push-notification-subscriptions`,
    {
      method: "POST",
      body: JSON.stringify({
        webPushDetail: payload.webPushDetail
      }),
      credentials: "include"
    }
  );
}

export async function logout() {
  await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });
}
