import {
  Box,
  Button,
  Heading,
  Link,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react';
import { navigate } from 'gatsby';
import { PageConfig, PageProps, useAuth } from 'jaen';
import { useEffect, useRef, useState } from 'react';
import useNavOffset from '../../hooks/use-nav-offset';

/**
 * Zitadel's hosted registration form, opened directly, for a browser that
 * cannot run the OIDC flow.
 *
 * Without an authorization request the form registers into the instance's
 * default organisation, and on accounts.photonq.org that is photonq's
 * (268207341512496739): the form shows photonq's logo and imprint. The account
 * is created there, but the visitor is not signed in here afterwards, so this
 * is the fallback, not the way in.
 */
const HOSTED_REGISTRATION_URL = `${__JAEN_ZITADEL_GQL__.authority}/ui/login/register`;

/** How long a page loaded at /signup waits for the runtime before it gives up. */
const RUNTIME_TIMEOUT_MS = 10000;

/**
 * Whether the browser loaded this document at the address it shows now.
 *
 * False after a client-side navigation to /signup, which is exactly the case
 * in which the OIDC runtime will not arrive: jaen decided on page load, on
 * another address, that it was not needed there. A browser without
 * Navigation Timing counts as true and waits for the runtime.
 */
const loadedAtThisAddress = (): boolean => {
  try {
    const [entry] = performance.getEntriesByType('navigation');

    if (!entry) return true;

    const trim = (path: string) => path.replace(/\/+$/, '');

    return (
      trim(new URL(entry.name).pathname) === trim(window.location.pathname)
    );
  } catch {
    return true;
  }
};

/**
 * /signup hands the visitor to Zitadel's hosted registration for the photonq
 * organisation, which returns them to photonq.org signed in.
 *
 * It replaces photonq's own multi-step form. That form checked and created
 * users through signup-api, which called Zitadel's REST API, and that API is
 * gone: every address came back "already registered" and nobody could sign
 * up. signinRedirect with `prompt: 'create'` opens Zitadel's registration
 * form instead of its login form, with the client id and the organisation
 * scope jaen signs in with, so the new account lands in photonq's org.
 *
 * Nothing is decided before jaen's OIDC runtime has mounted. Until then
 * useAuth() answers with a signed-out placeholder whose signinRedirect only
 * rejects. jaen's own /signup page calls it straight away, so its redirect
 * never happens and the visitor stays on a blank page. A visitor who reaches
 * this page by a client-side navigation gets a full load of it instead,
 * because jaen fetches the runtime only on a page load. If the runtime cannot
 * load at all, the page says so and links to the hosted form directly.
 */
const SignupPage: React.FC<PageProps> = () => {
  const auth = useAuth();
  const offset = useNavOffset();

  // signinRedirect navigates away, but React can run the effect again before
  // the browser has left. A second call would start a second flow.
  const started = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (auth.isRuntimeLoaded) return;

    if (!loadedAtThisAddress()) {
      window.location.replace(window.location.href);
      return;
    }

    const timer = window.setTimeout(() => setFailed(true), RUNTIME_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [auth.isRuntimeLoaded]);

  useEffect(() => {
    if (!auth.isRuntimeLoaded) return;
    if (auth.isLoading || auth.activeNavigator) return;
    if (started.current) return;

    started.current = true;

    if (auth.isAuthenticated) {
      void navigate('/', { replace: true });
      return;
    }

    // When the redirect works the browser leaves and this promise never
    // settles. react-oidc-context does not reject on a failure either: it
    // files the error under auth.error and resolves with null. So settling at
    // all means the visitor is still here, for example because the provider's
    // discovery document could not be fetched.
    //
    // `replace` takes this page out of the history. With the default
    // `assign`, Back on the registration form returned here, and this page
    // sent the visitor straight on to the form again.
    auth.signinRedirect({ prompt: 'create', redirectMethod: 'replace' }).then(
      () => setFailed(true),
      (error: unknown) => {
        console.error('photonq: could not open the registration form', error);
        setFailed(true);
      }
    );
  }, [
    auth.isRuntimeLoaded,
    auth.isLoading,
    auth.isAuthenticated,
    auth.activeNavigator
  ]);

  return (
    <Box
      as="main"
      mt={offset}
      py={{ base: 16, md: 24 }}
      px={6}
      textAlign="center"
    >
      <Stack gap={5} maxW="md" mx="auto" align="center">
        <Heading as="h1" size="lg">
          Create your PhotonQ account
        </Heading>
        {failed ? (
          <>
            <Text color="shared.text.muted">
              The registration form could not be opened from here.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} gap={3}>
              <Button onClick={() => window.location.reload()}>
                Try again
              </Button>
              <Button asChild variant="outline">
                <a href={HOSTED_REGISTRATION_URL}>Open the registration form</a>
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Spinner size="lg" color="shared.text.brand" />
            <Text color="shared.text.muted">
              Taking you to the registration form…
            </Text>
            {/* In the markup from the start, so it is there without
                JavaScript too. */}
            <Text fontSize="sm" color="shared.text.muted">
              Nothing happening?{' '}
              <Link
                href={HOSTED_REGISTRATION_URL}
                color="shared.text.brand"
                textDecoration="underline"
              >
                Open the registration form
              </Link>
            </Text>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default SignupPage;

/**
 * The site's layout, not jaen's `full` one the old form used. That layout
 * renders under jaen's theme, which is why the old page had to re-point
 * jaen's font variables at the site's stack.
 */
export const pageConfig: PageConfig = {
  label: 'Signup',
  withoutJaenFrame: true
};

export { Head } from 'jaen';
