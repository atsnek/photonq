import { JsxStyleProps } from '@chakra-ui/react';
import { ICodeSnippetProps } from '../code-snippet/components/CodeSnippet';
import { IFileSystemProps } from '../filesystem/components/Filesystem';
import { IHeadingProps } from '../heading/components/Heading';
import { IListProps } from '../list/components/List';
import { ITextProps } from '../text/components/Text';

export enum MainContentType {
  Heading,
  Text,
  List,
  CodeSnippet,
  Filesystem
}

export interface IMainContentComponentBaseProps {
  // v2's ChakraProps is v3's JsxStyleProps: the style props plus css and the
  // nested selectors, which is exactly what the callers put in here.
  baseProps?: JsxStyleProps;
}

export interface IMainContentComponent {
  type: MainContentType;
}

export interface IHeadingComponent
  extends IMainContentComponent, IHeadingProps {
  type: MainContentType.Heading;
}

export interface ITextComponent extends IMainContentComponent, ITextProps {
  type: MainContentType.Text;
}

export interface IListComponent extends IMainContentComponent, IListProps {
  type: MainContentType.List;
}

export interface IFilesystemComponent
  extends IMainContentComponent, IFileSystemProps {
  type: MainContentType.Filesystem;
}

export interface ICodeSnippetComponent
  extends IMainContentComponent, ICodeSnippetProps {
  type: MainContentType.CodeSnippet;
}

export type MainContentItem =
  | IHeadingComponent
  | ITextComponent
  | IListComponent
  | IFilesystemComponent
  | ICodeSnippetComponent;
