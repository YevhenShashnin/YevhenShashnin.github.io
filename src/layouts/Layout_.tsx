import React, {useState} from "react";
import LanguageAndThemeToggle from "@/components/LanguageAndThemeToggle";

interface LayoutProps {
    children: React.ReactNode;
    onClick: (isDashboard: boolean) => void;
}

function Layout_({children, onClick}: LayoutProps) {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar for desktop */}
            <div
                className={`hidden sm:block
                    fixed top-0 left-0 h-full w-[20%] p-4  shadow-md
                    transform-gpu transition-transform duration-500 ease-in-out
                    ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`
                }
            >
                <a onClick={() => onClick(true)} className="block mt-4 cursor-pointer">
                    Dashboard
                </a>
                <a onClick={() => onClick(false)} className="block mt-4 cursor-pointer">
                    Campaign
                </a>
            </div>

            {/* Sidebar for mobile */}
            <div
                className={`sm:hidden z-[1000] bg-background fixed top-0 left-0 h-full w-[75%] bg-gray-100 p-4 shadow-md transform transition-transform duration-500 ease-in-out ${
                    showSidebar ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <button
                    onClick={toggleSidebar}
                    className="absolute top-2 right-2 text-xl font-bold"
                >
                    &times;
                </button>
                <a
                    onClick={() => {
                        onClick(true);
                        toggleSidebar();
                    }}
                    className="block mt-4 cursor-pointer"
                >
                    Dashboard
                </a>
                <a
                    onClick={() => {
                        onClick(false);
                        toggleSidebar();
                    }}
                    className="block mt-4 cursor-pointer"
                >
                    Campaign
                </a>
            </div>

            {/* Main content */}
            <main
                className={`flex-grow p-4 transition-all duration-500 ease-in-out ${
                    showSidebar ? "sm:ml-[20%]" : "ml-0"
                }`}
            >
                {/* Mobile toggle button */}

                <LanguageAndThemeToggle setShowSidebar={toggleSidebar}/>
                {children}
            </main>
        </div>
    );
}

export default Layout_;

