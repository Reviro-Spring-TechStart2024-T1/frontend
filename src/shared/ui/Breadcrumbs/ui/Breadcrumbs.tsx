'use client';

import { Children, ReactNode } from 'react';
import { RiArrowRightSLine } from '@remixicon/react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { useLocalStorage } from '@/shared/lib';

import { Typography } from '../../Typography';

interface BreadcrumbsContainerProps {
  children: ReactNode;
}

interface BreadcrumbItemProps {
  children: ReactNode;
  href: string;
}

export const BreadcrumbItem = ({
  children,
  href,
  ...props
}: BreadcrumbItemProps) => {
  return (
    <li {...props}>
      <Link href={href} passHref>
        <Typography variant="caption" className="hover:text-theme-blue-300">
          {children}
        </Typography>
      </Link>
    </li>
  );
};

export const BreadcrumbsContainer = ({
  children,
}: BreadcrumbsContainerProps) => {
  return (
    <nav className="h-6 min-h-6">
      <ul className="flex items-center space-x-2">
        {Children.map(children, (child, index) => (
          <>
            {child}
            {index < Children.count(children) - 1 ? (
              <span>
                <RiArrowRightSLine size={16} className="text-theme-grey-400" />
              </span>
            ) : null}
          </>
        ))}
      </ul>
    </nav>
  );
};

export const BreadCrumbs = () => {
  const paths = usePathname();
  const params = useParams<{ id: string }>();
  const [user] = useLocalStorage<{ role: string } | null>('current_user', null);

  const pathNames = paths.split('/').filter(path => path);

  const filterPath = (path: string) => {
    switch (path) {
      case 'active_plans':
        return null;
      case 'archive_plans':
        return null;
      default:
        return path;
    }
  };

  const filterParams = (path: string) => {
    if (pathNames.includes('support') && path.includes(params.id)) {
      return 'discussion';
    }
    if (pathNames.includes('customer') && path.includes(params.id)) {
      return 'profile';
    }
    if (path === 'order-for-client') {
      return 'order for client';
    }
    if (path === 'edit-establishment') {
      return 'edit establishment';
    }
    if (path === 'create-establishment') {
      return 'create establishment';
    }
    return path;
  };

  const pathItems = pathNames
    .map((path, index) => {
      const modifiedPath = filterPath(path);
      const getPath = pathNames.includes('subscription')
        ? pathNames.slice(0, 2).join('/')
        : pathNames.slice(0, index + 1).join('/');

      if (modifiedPath) {
        return {
          path: getPath,
          name: filterParams(modifiedPath),
        };
      }
    })
    .filter(path => path);

  return (
    <>
      <BreadcrumbsContainer>
        <Link href="#">
          <Typography variant="caption" format="capitalize">
            {/* FIX_ME: apply skeleton */}
            {user?.role ?? 'loading'}
          </Typography>
        </Link>
        {pathItems.map((item, index) => {
          return (
            <BreadcrumbItem key={index} href={`/${item?.path ?? ''}`}>
              {item?.name}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbsContainer>
    </>
  );
};
