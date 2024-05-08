import {
  RiMenu2Fill,
  RiQuestionAnswerFill,
  RiUser2Fill,
  RiUser4Fill,
} from '@remixicon/react';

import { TLink } from '@/widgets/sidebar';

export const adminLinks: TLink[] = [
  {
    href: '/users',
    image: <RiUser2Fill />,
    title: 'Users',
  },
  {
    href: '/partners',
    image: <RiUser4Fill />,
    title: 'Users',
  },
  {
    href: '/menu',
    image: <RiMenu2Fill />,
    title: 'Users',
  },
  {
    href: '/support',
    image: <RiQuestionAnswerFill />,
    title: 'Users',
  },
];
