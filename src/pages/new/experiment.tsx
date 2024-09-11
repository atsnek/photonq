import { sq } from '@/clients/social';
import {
  LanguageInput,
  PrivacyInput
} from '@/clients/social/src/schema.generated';
import {
  PageConfig,
  PageProps,
  osg,
  useAuth,
  useNotificationsContext
} from 'jaen';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  SkeletonCircle,
  Stack,
  Switch,
  Text
} from '@chakra-ui/react';

import { graphql, Link, navigate } from 'gatsby';
import * as React from 'react';
import { asEnumKey } from 'snek-query';
import { TextControl } from '../../components/TextControl';
import UncontrolledMdxEditor from '../../components/mdx-editor/UncontrolledMdxEditor';
import { useTOCContext } from '../../contexts/toc';
import TableOfContent from '../../components/navigation/TableOfContent';
import { globalHistory, useLocation } from '@reach/router';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';

const IndexPage: React.FC<PageProps> = () => {
  const notify = useNotificationsContext();

  const [values, setValues] = React.useState<{
    id: string;
    title: string;
    language: LanguageInput;
    avatarURL?: string;
    summary: string;
    content: string;
    privacy: PrivacyInput;
  }>({
    id: '',
    title: 'My New Experiment',
    summary:
      "This is my new experiment's summary. You should give a brief description of what you're trying to achieve.",
    language: LanguageInput.EN,
    privacy: PrivacyInput.PRIVATE,
    content: JSON.stringify({
      type: 'root',
      children: [
        {
          type: 'code',
          lang: 'qasm',
          meta: 'playground',
          value:
            '// Define a quantum circuit with 2 qubits\nOPENQASM 2.0;            // Set the QASM version[^1]\ninclude "qelib1.inc";    // Include standard library[^2]\n\nqreg qubits[2];          // Declare a 2-qubit register[^3]\ncx qubits[0], qubits[1]; // Apply CNOT gate between qubits[^4]\n',
          position: {
            start: {
              line: 1,
              column: 1,
              offset: 0
            },
            end: {
              line: 40,
              column: 4,
              offset: 735
            }
          }
        }
      ],
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0
        },
        end: {
          line: 41,
          column: 1,
          offset: 736
        }
      }
    })
  });

  React.useEffect(() => {
    const storedValues = localStorage.getItem('new-experiment');

    if (storedValues) {
      setValues(JSON.parse(storedValues));
    }
  }, []);

  // Persist values in local storage
  React.useEffect(() => {
    localStorage.setItem('new-experiment', JSON.stringify(values));
  }, [values]);

  const toc = useTOCContext();

  React.useEffect(() => {
    if (values.content) {
      try {
        toc.setValue(JSON.parse(values.content));
      } catch {
        toc.setValue(undefined);
      }
    } else {
      toc.setValue(undefined);
    }
  }, [values.content]);

  const [isCreating, setIsCreating] = React.useState(false);

  const [isImageUploading, setIsImageUploading] = React.useState(false);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const parsedContent = React.useMemo(() => {
    try {
      return JSON.parse(values.content);
    } catch {
      return undefined;
    }
  }, [values.content]);

  const curLocation = useLocation();
  React.useEffect(() => {
    return globalHistory.listen(({ action, location }) => {
      if (
        (action === 'PUSH' &&
          !location.pathname.includes('/new/experiment') &&
          !isCreating) ||
        action === 'POP'
      ) {
        if (!window.confirm('Are you sure you want to leave this page?')) {
          navigate(`${curLocation.pathname}`);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreating]);

  return (
    <Stack spacing="8">
      <Breadcrumb mb="4">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/experiments">
            <HStack spacing="1">
              <Icon
                as={FaUsers}
                display="inline-block"
                color="brand.500"
                mr="2"
              />
              <Text color="gray.600">Community Experiments</Text>
            </HStack>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">New</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Stack>
        <Divider />
        <Flex justifyContent="space-between" alignItems="center">
          <Switch
            isChecked={values.privacy === 'PUBLIC'}
            onChange={e => {
              setValues({
                ...values,
                privacy: e.target.checked
                  ? PrivacyInput.PUBLIC
                  : PrivacyInput.PRIVATE
              });
            }}
          >
            Public
          </Switch>

          <ButtonGroup flexDir={['column', 'row']}>
            <Button
              variant="outline"
              isLoading={isCreating}
              onClick={async () => {
                setIsCreating(true);

                const [slug, errors] = await sq.mutate(
                  m =>
                    m.postCreate({
                      values: {
                        title: values.title,
                        summary: values.summary,
                        content: values.content,
                        privacy: asEnumKey(PrivacyInput, values.privacy),
                        language: asEnumKey(LanguageInput, values.language),
                        avatarURL: values.avatarURL
                      }
                    }).slug
                );

                localStorage.removeItem('new-experiment');

                if (errors) {
                  notify.toast({
                    title: 'Error',
                    status: 'error',
                    description:
                      'An error occurred while saving the experiment.'
                  });
                } else {
                  notify.toast({
                    title: 'Experiment Saved',
                    status: 'success',
                    description: 'The experiment has been successfully saved.'
                  });

                  navigate(`/experiments/${slug}`);
                }
              }}
            >
              Create
            </Button>

            <Input
              type="file"
              ref={imageInputRef}
              display="none"
              onChange={async e => {
                const file = e.target.files?.[0];

                if (file) {
                  setIsImageUploading(true);
                  const { fileUrl } = await osg.uploadFile(file);

                  notify.toast({
                    title: 'Image Uploaded',
                    status: 'success',
                    description: 'The image has been successfully uploaded.'
                  });

                  setValues({
                    ...values,
                    avatarURL: fileUrl
                  });

                  setIsImageUploading(false);
                }
              }}
            />

            <IconButton
              icon={<CloseIcon />}
              aria-label="Cancel"
              variant="ghost"
              colorScheme="red"
              onClick={async () => {
                const confirm = await notify.confirm({
                  title: 'Delete Experiment',
                  message: 'Are you sure you want to delete this experiment?'
                });

                if (confirm) {
                  navigate(`/users/${user?.profile?.sub}`);
                }
              }}
            />
          </ButtonGroup>
        </Flex>
        <Divider />
      </Stack>

      <HStack spacing="4">
        <SkeletonCircle
          boxSize="unset"
          isLoaded={!isImageUploading}
          borderRadius="md"
        >
          <Avatar
            size="md"
            borderRadius="md"
            src={values.avatarURL || undefined}
            name={values.title}
            _hover={{
              cursor: 'pointer',
              filter: 'brightness(0.8)',
              outlineColor: 'var(--chakra-colors-brand-400)',
              outlineWidth: '2px',
              outlineStyle: 'solid',
              outlineOffset: '2px'
            }}
            cursor={'pointer'}
            onClick={() => {
              imageInputRef.current?.click();
            }}
          />
        </SkeletonCircle>

        <TextControl
          key={values.title}
          text={values.title}
          onSubmit={title => {
            setValues({
              ...values,
              title
            });
          }}
          type="heading"
          editable={true}
        />
      </HStack>

      <TextControl
        key={values.summary}
        text={values.summary || undefined}
        onSubmit={summary => {
          setValues({
            ...values,
            summary
          });
        }}
        type="text"
        editable={true}
      />

      <Box
        display={{
          base: 'block',
          xl: 'none'
        }}
      >
        <TableOfContent />
      </Box>

      {/* Placeholder for Editor Component */}
      <UncontrolledMdxEditor
        value={parsedContent}
        isEditing={true}
        onUpdateValue={value => {
          toc.setValue(value);

          setValues({
            ...values,
            content: JSON.stringify(value)
          });
        }}
      />
    </Stack>
  );
};

export default IndexPage;

export const pageConfig: PageConfig = {
  label: 'New experiment',
  icon: 'FaFlask',
  withoutJaenFrameStickyHeader: true,
  breadcrumbs: [
    // async () => {
    //   let [username] = await sq.query(q => q.userMe?.username);
    //   if (!username) username = '';
    //   return { label: username, path: `/user/${username}` };
    // },
    {
      label: 'New Experiment',
      path: '/new/experiment'
    }
  ],
  menu: {
    type: 'user',
    label: 'New experiment'
  },
  auth: {
    isRequired: true
  }
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export { Head } from 'jaen';
