import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Footer from '../components/layout/footer/Footer';
import Navbar from '../components/layout/header/Navbar';
import '../App.css';

type AuthStorefrontLayoutProps = {
    children: ReactNode;
};

export default function AuthStorefrontLayout({ children }: AuthStorefrontLayoutProps) {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-white text-black">
                <Navbar cartCount={0} forceDocumentNavigation />
                {children}
                <Footer forceDocumentNavigation />
            </div>
        </BrowserRouter>
    );
}
