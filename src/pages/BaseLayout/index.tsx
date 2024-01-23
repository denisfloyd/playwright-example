import {Outlet} from 'react-router-dom';

const BaseLayout = () => {
  return (
    <main className="flex h-[100dvh] w-[100dvw]">
      <Outlet />
    </main>
  );
};

export default BaseLayout;
