import { rememberReturnTo } from 'jaen';

/**
 * Where the site's Sign In, Sign Up and "sign up to ..." controls start.
 *
 * jaen fetches its OIDC runtime only where it needs it: on /login, /signup,
 * /logout and under /cms, and on a visit that already holds a session. It
 * decides once, when the page loads. Everywhere else useAuth() hands out a
 * signed-out placeholder whose signinRedirect only rejects, so a button that
 * called it directly did nothing at all for a signed-out visitor. That was
 * the nav's Sign In, the rating star and the Follow button.
 *
 * So the flows start with a full page load of jaen's own pages, which fetch
 * the runtime, wait for it and then redirect: /login to sign in, /signup to
 * Zitadel's hosted registration (src/gatsby-plugin-jaen/pages/signup.tsx).
 * A client-side navigation would arrive there without the runtime. The page
 * the visitor is on is parked first, so the sign-in callback brings them back
 * to it.
 */
type ClickLike = { preventDefault(): void };

const startAt = (path: string, event?: ClickLike) => {
  // On a link with an href this also stops Gatsby's client-side navigation,
  // which checks `defaultPrevented` before it navigates.
  event?.preventDefault();
  rememberReturnTo(window.location.pathname + window.location.search);
  window.location.assign(path);
};

export const startSignIn = (event?: ClickLike) => startAt('/login/', event);

export const startSignUp = (event?: ClickLike) => startAt('/signup/', event);
