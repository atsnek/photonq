import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useDisclosure
} from '@chakra-ui/react';
import { FC, ReactNode, useRef, useState } from 'react';

interface IPublishAlertProps {
  disclosure: ReturnType<typeof useDisclosure>;
  cancelAction?: () => void;
  cancelLabel?: string;
  cancelProps?: ButtonProps;
  confirmationAction?: () => Promise<void> | void;
  confirmationLabel?: string;
  confirmationProps?: ButtonProps;
  closeOnConfirmation?: boolean;
  header: ReactNode;
  body: ReactNode;
}

/**
 * Functionally extended chakra alert component.
 */
const Alert: FC<IPublishAlertProps> = ({
  disclosure,
  cancelAction,
  cancelLabel = 'Cancel',
  cancelProps,
  confirmationAction,
  confirmationLabel = 'Confirm',
  confirmationProps,
  closeOnConfirmation = true,
  header,
  body
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const { isOpen, onClose } = disclosure;

  const handleConfirmation = async () => {
    if (confirmationAction) {
      setIsPublishing(true);
      await confirmationAction();
      setIsPublishing(false);
    }
    if (closeOnConfirmation) onClose();
  };

  const handleCancel = () => {
    if (cancelAction) cancelAction();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={handleCancel}
      leastDestructiveRef={cancelRef}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{header}</AlertDialogHeader>
        <AlertDialogBody>{body}</AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="gray" {...cancelProps} ref={cancelRef} onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant="filledGreen"
            ml={3}
            {...confirmationProps}
            onClick={handleConfirmation}
            isLoading={isPublishing}
          >
            {confirmationLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
