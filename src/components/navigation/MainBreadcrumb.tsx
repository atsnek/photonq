import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbLinkProps,
  TextProps
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC } from 'react';
// import UserPreview from '../../../../features/user/avatar/components/UserPreview';

import { MainBreadcrumbPart } from '../../utils/navigation/types';

interface IMainBradcrumbProps {
  parts: MainBreadcrumbPart[];
}
/**
 *  Main breadcrumb component.
 */
const MainBreadcrumb: FC<IMainBradcrumbProps> = ({ parts }) => {
  return (
    <Breadcrumb separator={<ChevronRightIcon />} fontSize="sm" mb={5}>
      {parts.map((item, i) => {
        const props: BreadcrumbLinkProps & TextProps = {
          transition: 'color 0.2s ease-in-out'
        };

        if (item.isActive) {
          props.color = 'main.breadcrumb.active.color';
          props.fontWeight = 'semibold';
        } else {
          // props.opacity = 0.7;
          props.color = 'main.breadcrumb.inactive.color';
          if (!item.isDisabled) {
            props._hover = {
              textDecoration: 'none',
              color: 'main.breadcrumb.inactive.hover.color'
            };
          }
        }

        return (
          <BreadcrumbItem
            key={i}
            isCurrentPage={item.isActive || item.isDisabled}
            isTruncated
          >
            <BreadcrumbLink as={Link} to={item.href} isTruncated {...props}>
              {item.isUser && item.user
                ? // <UserPreview user={item.user} {...props} />
                  null
                : item.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default MainBreadcrumb;
