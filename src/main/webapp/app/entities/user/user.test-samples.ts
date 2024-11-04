import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 18127,
  login: 'g1',
};

export const sampleWithPartialData: IUser = {
  id: 8901,
  login: '{h?@1jPc0C\\|4A',
};

export const sampleWithFullData: IUser = {
  id: 10010,
  login: '2E2m@eT\\lLUiEX8\\MaFL7\\Cx8v2\\Ce',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
