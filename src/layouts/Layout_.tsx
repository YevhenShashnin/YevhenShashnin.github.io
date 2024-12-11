import React,{ useState } from "react";
import LanguageAndThemeToggle from "@/components/LanguageAndThemeToggle";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout_({ children }: LayoutProps) {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <div className="flex h-screen ">
            <div
                className={`
          fixed top-0 left-0 h-full w-[20%] p-4  shadow-md
          transform-gpu transition-transform duration-500 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <h1 className="text-[36px] font-bold">FANAT</h1>
                <a href='/' className="block mt-4">Dashboard</a>
                <a href='/campaign' className="block mt-4">Campaign</a>
            </div>

            <main
                className={`flex-grow p-4 transition-all duration-500 ease-in-out ${
                    showSidebar ? 'ml-[20%]' : 'ml-0'
                }`}
            >
                <LanguageAndThemeToggle setShowSidebar={toggleSidebar}/>
                {children}
            </main>
        </div>
    );
}

export default Layout_;
