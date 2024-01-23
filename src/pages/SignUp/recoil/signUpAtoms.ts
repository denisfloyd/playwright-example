import {atom} from 'recoil';
import {User} from '../types';

export const signUpAtom = atom<{user: User | null; token: string | null}>({
  key: 'signUpDataAtom',
});
