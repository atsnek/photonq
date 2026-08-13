/**
 * The handful of Chakra icons this site used, as local components.
 *
 * `@chakra-ui/icons` stopped at v2 and peers on `@chakra-ui/react >=2.0.0`,
 * so it cannot come along to v3 and had to go. The glyphs themselves are
 * fine, and swapping them for another icon set would have changed how the
 * site looks for no reason, so the paths are vendored here instead,
 * unchanged, in the wrapper shape the other 61 icon wrappers in this directory already use.
 *
 * `asChild={false}` and `boxSize="1em"` are what that wrapper shape costs in
 * v3. Every `<Icon>` that carries raw SVG markup as children needs both, here
 * and in the sibling icon-set directories:
 *
 *   - v3's Icon computes `asChild: !props.as`, so a wrapper that passes no
 *     `as` gets `asChild`. The factory then discards its own <svg> tag, takes
 *     the FIRST valid child element as the tag it renders and merges the svg's
 *     props onto it. These wrappers therefore emitted a bare <path>/<g> with a
 *     viewBox on it, which paints nothing, and dropped every child after the
 *     first. Chakra's own `createIcon` passes `asChild: false` for this reason.
 *   - v2's Icon base was `{w: 1em, h: 1em, ...}`. v3 moved size into a recipe
 *     variant whose default, `size: "inherit"`, is the empty object, so an
 *     <svg> with no size of its own falls back to the 300x150 replaced-element
 *     default. Declaring boxSize before `{...props}` restores the 1em box and
 *     still lets a caller's boxSize/w/h/fontSize win, exactly as v2's base did.
 */
import { Icon, IconProps } from '@chakra-ui/react';

export const AddIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"
    />
  </Icon>
);

export const ArrowBackIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
    />
  </Icon>
);

export const ArrowForwardIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
    />
  </Icon>
);

export const CheckIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 14 14" {...props}>
    <g fill="currentColor">
      <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
    </g>
  </Icon>
);

export const ChevronDownIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </Icon>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
    />
  </Icon>
);

export const ChevronRightIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
    />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    />
  </Icon>
);

export const DeleteIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <g fill="currentColor">
      <path d="M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zM22 4h-4.75a.25.25 0 01-.25-.25V2.5A2.5 2.5 0 0014.5 0h-5A2.5 2.5 0 007 2.5v1.25a.25.25 0 01-.25.25H2a1 1 0 000 2h20a1 1 0 000-2zM9 3.75V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1.25a.25.25 0 01-.25.25h-5.5A.25.25 0 019 3.75z" />
    </g>
  </Icon>
);

export const EditIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </g>
  </Icon>
);

export const ExternalLinkIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </g>
  </Icon>
);

export const InfoIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
    />
  </Icon>
);

export const MoonIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"
    />
  </Icon>
);

export const SearchIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
    />
  </Icon>
);

export const SettingsIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 14 14" {...props}>
    <path
      fill="currentColor"
      d="M14,7.77 L14,6.17 L12.06,5.53 L11.61,4.44 L12.49,2.6 L11.36,1.47 L9.55,2.38 L8.46,1.93 L7.77,0.01 L6.17,0.01 L5.54,1.95 L4.43,2.4 L2.59,1.52 L1.46,2.65 L2.37,4.46 L1.92,5.55 L0,6.23 L0,7.82 L1.94,8.46 L2.39,9.55 L1.51,11.39 L2.64,12.52 L4.45,11.61 L5.54,12.06 L6.23,13.98 L7.82,13.98 L8.45,12.04 L9.56,11.59 L11.4,12.47 L12.53,11.34 L11.61,9.53 L12.08,8.44 L14,7.75 L14,7.77 Z M7,10 C5.34,10 4,8.66 4,7 C4,5.34 5.34,4 7,4 C8.66,4 10,5.34 10,7 C10,8.66 8.66,10 7,10 Z"
    />
  </Icon>
);

export const SunIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2" />
      <path d="M12 21v2" />
      <path d="M4.22 4.22l1.42 1.42" />
      <path d="M18.36 18.36l1.42 1.42" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
      <path d="M4.22 19.78l1.42-1.42" />
      <path d="M18.36 5.64l1.42-1.42" />
    </g>
  </Icon>
);

export const ViewIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <g fill="currentColor">
      <path d="M23.432,10.524C20.787,7.614,16.4,4.538,12,4.6,7.6,4.537,3.213,7.615.568,10.524a2.211,2.211,0,0,0,0,2.948C3.182,16.351,7.507,19.4,11.839,19.4h.308c4.347,0,8.671-3.049,11.288-5.929A2.21,2.21,0,0,0,23.432,10.524ZM7.4,12A4.6,4.6,0,1,1,12,16.6,4.6,4.6,0,0,1,7.4,12Z" />
      <circle cx="12" cy="12" r="2" />
    </g>
  </Icon>
);

export const ViewOffIcon = (props: IconProps) => (
  <Icon asChild={false} boxSize="1em" viewBox="0 0 24 24" {...props}>
    <g fill="currentColor">
      <path d="M23.2,10.549a20.954,20.954,0,0,0-4.3-3.6l4-3.995a1,1,0,1,0-1.414-1.414l-.018.018a.737.737,0,0,1-.173.291l-19.5,19.5c-.008.007-.018.009-.026.017a1,1,0,0,0,1.631,1.088l4.146-4.146a11.26,11.26,0,0,0,4.31.939h.3c4.256,0,8.489-2.984,11.051-5.8A2.171,2.171,0,0,0,23.2,10.549ZM16.313,13.27a4.581,4.581,0,0,1-3,3.028,4.3,4.3,0,0,1-3.1-.19.253.253,0,0,1-.068-.407l5.56-5.559a.252.252,0,0,1,.407.067A4.3,4.3,0,0,1,16.313,13.27Z" />
      <path d="M7.615,13.4a.244.244,0,0,0,.061-.24A4.315,4.315,0,0,1,7.5,12,4.5,4.5,0,0,1,12,7.5a4.276,4.276,0,0,1,1.16.173.244.244,0,0,0,.24-.062l1.941-1.942a.254.254,0,0,0-.1-.421A10.413,10.413,0,0,0,12,4.75C7.7,4.692,3.4,7.7.813,10.549a2.15,2.15,0,0,0-.007,2.9,21.209,21.209,0,0,0,3.438,3.03.256.256,0,0,0,.326-.029Z" />
    </g>
  </Icon>
);
