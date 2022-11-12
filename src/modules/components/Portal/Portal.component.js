import * as React from 'preact';
import { createPortal } from 'preact/compat';
import { PortalContext } from './Portal.contexts';

export const Portal = ({ children }) => {
  return (
    <PortalContext.Consumer>{root => root && createPortal(children, root)}</PortalContext.Consumer>
  );
};
