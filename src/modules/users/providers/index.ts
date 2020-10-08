import { container } from 'tsyringe';

import IHashUser from './HashUser/models/IHashUser';

import BCryptHashUser from './HashUser/implementations/BCryptHashUser';

container.registerSingleton<IHashUser>('HashUser', BCryptHashUser);
