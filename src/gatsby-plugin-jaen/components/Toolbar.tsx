import {Button} from '@chakra-ui/react'

export interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  return (
    <Button variant="outline" size="sm">
      Search...
    </Button>
  )
}
