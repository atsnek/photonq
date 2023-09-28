import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container as ChakraContainer,
  Checkbox,
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
import {useCallback, useEffect, useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import Particles from 'react-tsparticles'
import {loadFull} from 'tsparticles' // if you are going to use `loadFull`, install the "tsparticles" package too.
import {Container, Engine} from 'tsparticles-engine'
import Logo from '../components/Logo'
import {JaenFullLogo, Link, PasswordField} from 'gatsby-plugin-jaen'
import {FaArrowLeft} from '@react-icons/all-files/fa/FaArrowLeft'

import {PageConfig, PageProps} from '@atsnek/jaen'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const Page: React.FC<PageProps> = () => {
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
          maxW="2xl"
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
                <Text color="fg.inverted">
                  Already a user?{' '}
                  <Link to="/login" color="fg.inverted">
                    Login
                  </Link>
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
                <SignupForm
                  welcomeText={`Welcome to PhotonQ!\n\nJoin our community and unlock the fascinating world of quantum computing.`}
                />
              </Box>
            </form>

            <JaenFullLogo height="12" width="auto" />
          </Stack>
        </ChakraContainer>
      </Box>
    </Box>
  )
}

interface SignupFormProps {
  welcomeText: string
}

const SignupForm: React.FC<{welcomeText: string}> = ({welcomeText}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prevText => prevText + welcomeText[currentIndex])
        setCurrentIndex(currentIndex + 1)
      }, 50) // Adjust the speed by changing the delay (e.g., 100ms for 10 characters per second)

      return () => clearTimeout(timer)
    } else {
      // Typewriter animation is complete
      setShowInput(true)
    }
  }, [currentIndex, welcomeText])

  const [step, setStep] = useState<number>(0)

  const handleButtonClick = () => {
    setStep(step + 1)
  }

  return (
    <Stack spacing="4">
      <Text whiteSpace="pre-wrap" fontFamily="monospace" fontSize="md">
        {displayText}
      </Text>
      {showInput && (
        <>
          <FormControl>
            <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
              Enter your email
            </FormLabel>
            <HStack>
              <Input type="email" />

              {step === 0 && (
                <Button onClick={handleButtonClick}>Continue</Button>
              )}
            </HStack>
          </FormControl>
          {step > 0 && (
            <FormControl>
              <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
                Enter your password
              </FormLabel>
              <HStack>
                <Input type="password" />

                {step === 1 && (
                  <Button onClick={handleButtonClick}>Continue</Button>
                )}
              </HStack>
            </FormControl>
          )}
          {step > 1 && (
            // username
            <FormControl>
              <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
                Enter your username
              </FormLabel>
              <HStack>
                <Input />

                {step === 2 && (
                  <Button onClick={handleButtonClick}>Continue</Button>
                )}
              </HStack>
            </FormControl>
          )}
          {step > 2 && (
            // first and last name
            <FormControl>
              <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
                Enter your first and last name
              </FormLabel>
              <HStack>
                <HStack w="full">
                  <Input />
                  <Input />
                </HStack>

                {step === 3 && (
                  <Button onClick={handleButtonClick}>Continue</Button>
                )}
              </HStack>
            </FormControl>
          )}

          {step > 3 && (
            <FormControl>
              <FormLabel fontSize="md" fontFamily="monospace" fontWeight="bold">
                Terms and conditions
              </FormLabel>
              <HStack>
                <Checkbox
                  onChange={e => {
                    if (e.target.checked) {
                      setStep(step + 1)
                    } else {
                      setStep(step - 1)
                    }
                  }}>
                  I agree to the terms and conditions
                </Checkbox>
              </HStack>
            </FormControl>
          )}

          {step > 4 && <Button mt="4">Sign up for PhotonQ</Button>}
        </>
      )}
    </Stack>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Signup',
  withoutJaenFrame: true,
  layout: {
    name: 'jaen',
    type: 'full'
  }
}

export {Head} from '@atsnek/jaen'
