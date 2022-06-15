import React from "react";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-blue-500">
      <header>헤더</header>
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
