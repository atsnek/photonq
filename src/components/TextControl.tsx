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
  useEditableControls
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

export const TextControl: React.FC<{
  text?: string;
  onSubmit: (text: string) => void;
  type: 'heading' | 'text';
  editable: boolean;
}> = props => {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          aria-label="Edit"
        />
        <IconButton
          variant="outline"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
          aria-label="Close"
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          variant="ghost"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
          aria-label="Edit"
        />
      </Flex>
    );
  }

  return (
    <Editable
      as={HStack}
      textAlign={'left'}
      isPreviewFocusable={props.editable ? true : false}
      defaultValue={props.text}
      onSubmit={props.onSubmit}
      fontSize={props.type === 'heading' ? '2xl' : 'xl'}
      fontWeight={props.type === 'heading' ? 'bold' : '400'}
    >
      <EditablePreview as={props.type === 'heading' ? Heading : Text} />
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
    </Editable>
  );
};
