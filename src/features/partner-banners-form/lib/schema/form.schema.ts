import * as Yup from 'yup';

import { FILE_SIZE } from '@/shared';

export const EstablishmentBannersSchema = Yup.object().shape({
  banner: Yup.mixed()
    .required('A banner is required.')
    .test(
      'fileSize',
      'File too large.',
      //@ts-ignore
      value => value && value.size <= FILE_SIZE,
    ),
});
