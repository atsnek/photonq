import { ChevronRightIcon } from '../../components/icons/chakra';
import { Breadcrumb, BreadcrumbLinkProps, TextProps } from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC, Fragment } from 'react';
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
    <Breadcrumb.Root fontSize="sm" mb={5}>
      <Breadcrumb.List>
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
            <Fragment key={i}>
              {/* v2 took one `separator` element and repeated it after every
                  crumb but the last. v3 has no such prop, so the chevrons are
                  placed by hand. The site's own glyph, not v3's default one,
                  which is a different chevron. */}
              {i > 0 && (
                <Breadcrumb.Separator>
                  <ChevronRightIcon />
                </Breadcrumb.Separator>
              )}
              <Breadcrumb.Item truncate>
                {/* v2's isCurrentPage rendered a span, except that `as={Link}`
                    overrode it and an anchor came out anyway, styled like every
                    other crumb. All the attribute ever contributed was
                    aria-current, so that is what stays; v3's CurrentLink would
                    swap in a different recipe slot on top. */}
                <Breadcrumb.Link
                  truncate
                  aria-current={
                    item.isActive || item.isDisabled ? 'page' : undefined
                  }
                  {...props}
                  asChild
                >
                  <Link to={item.href}>
                    {item.isUser && item.user
                      ? // <UserPreview user={item.user} {...props} />
                        null
                      : item.name}
                  </Link>
                </Breadcrumb.Link>
              </Breadcrumb.Item>
            </Fragment>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

export default MainBreadcrumb;
