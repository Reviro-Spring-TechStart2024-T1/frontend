import * as Yup from 'yup';

import { FILE_SIZE, SUPPORTED_FORMATS } from '@/shared';

export const EstablishmentSchema = Yup.object().shape({
  name: Yup.string().required('Required.'),
  description: Yup.string().required('Required.'),
  email: Yup.string().required('Required.').email(),
  phone_number: Yup.string().required('Required.'),
  street_name: Yup.string().required('Required.'),
  street_number: Yup.string().required('Required.'),
  latitude: Yup.string().required('Required.'),
  longitude: Yup.string().required('Required.'),
  happy_hour_start: Yup.string().required('Required.'),
  happy_hour_end: Yup.string().required('Required.'),
  logo: Yup.mixed()
    .required('A file is required.')
    .test(
      'fileSize',
      'File too large',
      //@ts-ignore
      value => value && value.size <= FILE_SIZE,
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      //@ts-ignore
      value => value && SUPPORTED_FORMATS.includes(value.type),
    ),
});
