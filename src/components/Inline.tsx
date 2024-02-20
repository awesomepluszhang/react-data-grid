import styled from 'styled-components';
import type { CSSProperties, HTMLAttributes } from 'react';

interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  width?: CSSProperties['width'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  inset?: CSSProperties['padding'];
  gap?: CSSProperties['marginLeft'];
  grow?: boolean;
  block?: boolean;
  flex?: CSSProperties['flex'];
}

export const Inline = styled.div<InlineProps>`
  width: ${props => props.width};
  display: ${props => (props.block ?? true ? 'flex' : 'inline-flex')};
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  padding: ${props => props.inset || '0'};
  ${props => (props.flex !== undefined ? `flex: ${props.flex};` : '')}
  > * {
    flex-grow: ${props => (props.grow ? 1 : 0)};
  }
  > * + * {
    margin-left: ${props => props.gap || '1.5rem'};
  }
`;
