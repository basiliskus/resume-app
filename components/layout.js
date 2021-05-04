import HomeHeader from './home-header';
import HomeFooter from './home-footer';

export default function Layout({ children }) {
  return (
    <>
      <HomeHeader />
      <main>{children}</main>
      <HomeFooter />
    </>
  );
}
