import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '614af6c1-b9de-4b1b-8940-f6e29573e9f2',
};

export const sampleWithPartialData: IAuthority = {
  name: '43a83aef-a187-41f9-9105-fb34e49bb7c6',
};

export const sampleWithFullData: IAuthority = {
  name: 'f6d5f2e0-14e6-4b59-b34c-e6bc159f39a7',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
