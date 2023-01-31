import { Footer } from './Footer';
import { Navbar } from './Navbar';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      
      <div className='main-container'>
        {children}
      </div>

      <Footer />
    </div>
  );
};

export { Layout };