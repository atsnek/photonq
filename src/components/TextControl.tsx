import {
  ButtonGroup,
  Editable,
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
      {/* The field is the Editable's own part, wearing Input's and
          Textarea's look through `asChild`.

          v2 wrote `<Input as={EditableInput}>`, and v3 does not honour that
          swap here: Input forwards `as` to Ark's Field.Input as an ordinary
          prop, so a plain input.chakra-input was rendered with none of the
          Editable's props. It was not hidden outside editing and not wired to
          the value, so every visitor saw an empty input under the experiment
          title and an empty textarea under its description and under every
          user's bio. Editable.Input and Editable.Textarea carry the `hidden`
          and value props and hand them to the child. */}
      {props.type === 'heading' ? (
        <Editable.Input asChild>
          <Input fontSize="2xl" fontWeight="bold" />
        </Editable.Input>
      ) : (
        <Editable.Textarea asChild>
          <Textarea fontSize="xl" color="shared.text.muted" fontWeight="400" />
        </Editable.Textarea>
      )}
      {props.editable && <EditableControls />}
    </Editable.Root>
  );
};
