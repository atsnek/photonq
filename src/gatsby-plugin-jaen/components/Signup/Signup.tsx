import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container as ChakraContainer,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import {useCallback, useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import Particles from 'react-tsparticles'
import {loadFull} from 'tsparticles' // if you are going to use `loadFull`, install the "tsparticles" package too.
import {Container, Engine} from 'tsparticles-engine'
import Logo from '../Logo'
import {JaenFullLogo, Link, PasswordField} from 'gatsby-plugin-jaen'
import {FaArrowLeft} from '@react-icons/all-files/fa/FaArrowLeft'
// import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting}
  } = useForm<FormData>()

  const [alert, setAlert] = useState<{
    status: 'error' | 'success' | 'info'
    message: string | JSX.Element
    description?: string
  } | null>(null)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData, e) => {
    e?.preventDefault()

    try {
      //   await props.onSignUp(data)
    } catch (e: any) {
      setAlert({
        status: 'error',
        message: `Unable to sign up.`,
        description: e.message
      })
    }
  }

  const resetAlert = () => {
    setAlert(null)
  }

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine)

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine)
    // await loadSlim(engine);
  }, [])

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container)
    },
    []
  )

  return (
    <Box pos="relative" id="coco">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: true,
          background: {
            color: {
              value: '#0d47a1'
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push'
              },
              onHover: {
                enable: true,
                mode: 'repulse'
              },
              resize: true
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: '#ffffff'
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce'
              },
              random: false,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 80
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: 'circle'
            },
            size: {
              value: {min: 1, max: 5}
            }
          },
          detectRetina: true
        }}
      />

      <Box pos="relative">
        <ChakraContainer
          maxW="lg"
          zIndex={9999}
          py={{base: '6', md: '12'}}
          px={{base: '0', sm: '8'}}>
          <Stack spacing="8">
            <Stack spacing="6">
              <HStack justify="center">
                <Link as={Button} leftIcon={<FaArrowLeft />} to="/">
                  Back to website
                </Link>
              </HStack>

              <Stack spacing={{base: '2', md: '3'}} textAlign="center">
                <Heading size={{base: 'xs', md: 'sm'}} color="white">
                  Create your account
                </Heading>
                <Text color="fg.muted">
                  Already a user?{' '}
                  {/* <Link to={props.signInPath} onClick={props.onSignIn}>
                  Login
                </Link> */}
                </Text>
              </Stack>
            </Stack>

            {alert && (
              <Alert status={alert.status}>
                <AlertIcon />
                <Box w="full">
                  <AlertTitle>{alert.message}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Box>
                <CloseButton
                  alignSelf="flex-start"
                  position="relative"
                  right={-1}
                  top={-1}
                  onClick={resetAlert}
                />
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit) as any}>
              <Box
                py={{base: '0', sm: '8'}}
                px={{base: '4', sm: '10'}}
                bg="bg.surface"
                boxShadow={{base: 'none', sm: 'md'}}
                borderRadius={{base: 'none', sm: 'xl'}}>
                <Stack spacing="6">
                  <HStack justify="center" py="4">
                    <Box maxW="64">
                      <Logo />
                    </Box>
                  </HStack>
                  <Stack spacing="5">
                    <Stack
                      spacing="4"
                      direction={{
                        base: 'column',
                        md: 'row'
                      }}>
                      <FormControl
                        id="login_form_first_name"
                        isRequired
                        isInvalid={!!errors.firstName}>
                        <FormLabel htmlFor="firstName">First name</FormLabel>
                        <Input
                          id="firstName"
                          {...register('firstName', {
                            required: true
                          })}
                        />
                        <FormErrorMessage>
                          {errors.firstName && 'First name is required'}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        id="login_form_last_name"
                        isRequired
                        isInvalid={!!errors.lastName}>
                        <FormLabel htmlFor="lastName">Last name</FormLabel>
                        <Input
                          id="lastName"
                          {...register('lastName', {
                            required: true
                          })}
                        />
                        <FormErrorMessage>
                          {errors.lastName && 'Last name is required'}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>

                    <FormControl
                      id="login_form_email"
                      isRequired
                      isInvalid={!!errors.email}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        id="email"
                        {...register('email', {
                          required: true
                        })}
                      />
                      <FormErrorMessage>
                        {errors.email && 'Email is required'}
                      </FormErrorMessage>
                    </FormControl>

                    <PasswordField
                      {...register('password', {required: true})}
                      isRequired
                      isInvalid={!!errors.password?.message}
                    />
                  </Stack>

                  <Stack spacing="6">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}>
                      Sign up
                    </Button>
                    {/* <HStack>
            <Divider />
            <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
              powered by
            </Text>
            <Divider />
            <OAuthButtonGroup />
          </HStack> */}
                  </Stack>
                </Stack>
              </Box>
            </form>

            <JaenFullLogo height="12" width="auto" />
          </Stack>
        </ChakraContainer>
      </Box>
    </Box>
  )
}
