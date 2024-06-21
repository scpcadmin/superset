import React, { ReactNode } from 'react';

interface ControlHeaderProps {
  children: ReactNode;
}

export const ControlHeader = ({ children }: ControlHeaderProps) => (
  <div className="ControlHeader">
    <div className="pull-left">{children}</div>
    <div className="clearfix"></div>
  </div>
);
