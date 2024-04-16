import {
  Button,
  ChakraProvider,
  Checkbox,
  FormControl,
  FormErrorMessage,
  // FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BaseContentLayout from '../shared/containers/BaseContentLayout';
import theme from '../styles/theme/theme';
import { sq } from '@snek-functions/origin';
import { doNotConvertToString } from 'snek-query';
import { useNotificationsContext } from '@atsnek/jaen';

type FormValues = {
  name: string;
  email: string;
  message: string;
  agreement: boolean;
};

/**
 * Content for the contact page.
 */
const ContactContent: FC = () => {
  const { toast } = useNotificationsContext();

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<FormValues> = async data => {
    // TODO: Implement connection with Jaen

    const [_, errors] = await sq.mutate(m =>
      m.mailpressMailSchedule({
        envelope: {
          replyTo: {
            value: data.email,
            type: doNotConvertToString('EMAIL_ADDRESS') as any
          }
        },
        template: {
          id: '76abe113-2637-4dd0-883b-ab9d745f72fc',
          values: {
            name: data.name,
            message: data.message
          }
        }
      })
    );

    if (errors) {
      toast({
        title: 'Error',
        description: 'Something went wrong while sending your message',
        status: 'error'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Your message has been sent',
        status: 'success'
      });
    }
  };

  //!Bug: The default focusBorderColor of all inputs is different from the theme (some strange purple color)
  return (
    <BaseContentLayout>
      <Heading as="h1" fontSize={{ base: '2xl', md: '4xl' }} mb={5}>
        Contact Us
      </Heading>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={10}>
        We are here to help you with any questions you may have.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={7} alignItems="start">
          <HStack spacing={4} w="full">
            <FormControl id="contact-form-name" isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="Paige Turner"
                focusBorderColor="theme.500"
                {...register('name', { required: true, minLength: 3 })}
              />
            </FormControl>
            <FormControl id="contact-form-email" isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="rocky-roads@snek-docs.com"
                focusBorderColor="theme.500"
                {...register('email', { required: true, minLength: 3 })}
              />
            </FormControl>
          </HStack>
          <FormControl id="contact-form-message" isInvalid={!!errors.message}>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              id="message"
              placeholder="I love your documentation!"
              focusBorderColor="theme.500"
              {...register('message', { required: true })}
            />
            <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="contact-form-agreement"
            isInvalid={!!errors.agreement}
          >
            <Checkbox
              colorScheme="theme"
              variant="rounded"
              {...register('agreement', {
                required: {
                  value: true,
                  // TODO: Remove this if we dont want to show the error message
                  message: 'Please confirm the conditions for making contact'
                }
              })}
            >
              I agree that my details will be stored for contact and for any
              further queries.
            </Checkbox>
            <FormErrorMessage>{errors.agreement?.message}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="theme"
            type="submit"
            px={10}
            isDisabled={!isValid}
            isLoading={isSubmitting}
          >
            Send
          </Button>
        </VStack>
      </form>
    </BaseContentLayout>
  );
};

export default ContactContent;
