import { ComponentStyleConfig } from '@chakra-ui/react';
import themeAccordionComponent from './components/accordion';
import themeAlertComponent from './components/alert';
import themeAvatarComponent from './components/avatar';
import themeButtonComponent from './components/button';
import themeCheckboxComponent from './components/checkbox';
import themeInputComponent from './components/input';
import themeLinkComponent from './components/link';
import themeMenuComponent from './components/menu';
import themeTooltipComponent from './components/tooltip';
import themeInputGroupComponent from './components/inputGroup';
import themeTextareaComponent from './components/textarea';
import themeSkeletonComponent from './components/skeleton';
import themeSwitchComponent from './components/switch';

const themeComponents: { [key: string]: ComponentStyleConfig } = {
  Accordion: themeAccordionComponent,
  Link: themeLinkComponent,
  Button: themeButtonComponent,
  Menu: themeMenuComponent,
  Alert: themeAlertComponent,
  Checkbox: themeCheckboxComponent,
  Avatar: themeAvatarComponent,
  Input: themeInputComponent,
  Switch: themeSwitchComponent,
  InputGroup: themeInputGroupComponent,
  Tooltip: themeTooltipComponent,
  Textarea: themeTextareaComponent,
  Skeleton: themeSkeletonComponent
};

export default themeComponents;
