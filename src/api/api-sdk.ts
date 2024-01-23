import {User} from '@/pages/SignUp/types';

export const generateRandomToken = () => crypto.randomUUID();

export const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 3000));

export const signup = async ({firstName, lastName, email, password}: User): Promise<string> => {
  console.log('[api-sdk] signing up...', {
    firstName,
    lastName,
    email,
    password,
  });
  await delay();
  const challengeToken = generateRandomToken();
  console.log('[api-sdk] signup started, challenge created...', challengeToken);
  return challengeToken;
};

export const completeSignup = async ({
  challengeToken,
  otp,
}: {
  challengeToken: string;
  otp: {code: string};
}) => {
  if (!challengeToken) {
    throw Error('Challenge token is necessary for completing challenge');
  }

  console.log('[api-sdk] completing signup challenge...', otp);
  await delay();
  console.log('[api-sdk] signup completed');
};
