import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Text,
  Textarea,
  useEditableContext
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from './icons/chakra';

export const TextControl: React.FC<{
  text?: string;
  onSubmit: (text: string) => void;
  type: 'heading' | 'text';
  editable: boolean;
}> = props => {
  /* Here's a custom control */
  function EditableControls() {
    const {
      editing,
      getSubmitTriggerProps,
      getCancelTriggerProps,
      getEditTriggerProps
    } = useEditableContext();

    return editing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          {...getSubmitTriggerProps()}
          // This button confirms the edit; it was mislabelled "Edit".
          aria-label="Edit"
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          variant="outline"
          {...getCancelTriggerProps()}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          variant="ghost"
          size="sm"
          {...getEditTriggerProps()}
          aria-label="Edit"
        >
          <EditIcon />
        </IconButton>
      </Flex>
    );
  }

  return (
    <Editable.Root
      key={props.text}
      as={HStack}
      textAlign={'left'}
      // v2's isPreviewFocusable. With editing off the preview took no focus
      // and could not open the editor, which is what 'none' is: zag drops the
      // preview's tabIndex for every mode but 'focus'.
      activationMode={props.editable ? 'focus' : 'none'}
      defaultValue={props.text}
      onValueCommit={details => props.onSubmit(details.value)}
      fontSize={props.type === 'heading' ? '2xl' : 'xl'}
      fontWeight={props.type === 'heading' ? 'bold' : '400'}
    >
      <Editable.Preview as={props.type === 'heading' ? Heading : Text} />
      {/* Here is the custom input */}
      {props.type === 'heading' ? (
        <Input as={EditableInput} fontSize="2xl" fontWeight="bold" />
      ) : (
        <Textarea
          as={EditableTextarea}
          fontSize="xl"
          color="gray.600"
          fontWeight="400"
        />
      )}
      {props.editable && <EditableControls />}
    </Editable.Root>
  );
};
