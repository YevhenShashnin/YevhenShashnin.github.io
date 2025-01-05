import React, { useState } from 'react';
import LanguageAndThemeToggle from '@/components/LanguageAndThemeToggle';
import { Link } from 'react-router-dom';
import SidebarButton from '@/components/Sidebar/SidebarButton';
import {
    NotebookText,
    ChartLine,
    Palette,
    DollarSign,
    Megaphone,
    UserPlus,
    Laptop,
    LibraryBig,
    FileVideo,
    Repeat2,
    MessageCircleMore,
    BriefcaseBusiness,
    MonitorCog,
    HandHelping,
    Cog,
    Receipt,
} from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    onClick: (isDashboard: boolean) => void;
}

let sidebarItems = [
    {
        label: 'sidebar.general',
        icon: <NotebookText />,
        nested: [
            {
                label: 'sidebar.dashboard',
                href: '/',
                icon: <ChartLine />,
                value: 'dashboard',
            },
            { label: 'sidebar.creators', href: '/', icon: <Palette /> },
            { label: 'sidebar.plans', href: '/', icon: <DollarSign /> },
            {
                label: 'sidebar.campaigns',
                href: '/',
                icon: <Megaphone />,
                value: 'campaign',
            },
            { label: 'sidebar.fans', href: '/', icon: <UserPlus />, value: 'link' },
        ],
    },
    {
        label: 'sidebar.outreach',
        icon: <Laptop />,
        nested: [
            {
                label: 'sidebar.stories',
                href: '/',
                icon: <LibraryBig />,
                value: 'addStory',
            },
            {
                label: 'sidebar.posts',
                href: '/',
                icon: <FileVideo />,
                value: 'addPost',
            },
            { label: 'sidebar.reposts', href: '/', icon: <Repeat2 /> },
            {
                label: 'sidebar.messages',
                href: '/',
                icon: <MessageCircleMore />,
            },
        ],
    },
    {
        label: 'sidebar.automation',
        icon: <MonitorCog />,
        nested: [
            { label: 'sidebar.stories', href: '/', icon: <LibraryBig /> },
            { label: 'sidebar.posts', href: '/', icon: <FileVideo /> },
            { label: 'sidebar.reposts', href: '/', icon: <Repeat2 /> },
            {
                label: 'sidebar.messages',
                href: '/',
                icon: <MessageCircleMore />,
            },
        ],
    },
    {
        label: 'sidebar.workforce',
        icon: <BriefcaseBusiness />,
        nested: [
            { label: 'sidebar.stories', href: '/', icon: <LibraryBig /> },
            { label: 'sidebar.posts', href: '/', icon: <FileVideo /> },
            { label: 'sidebar.reposts', href: '/', icon: <Repeat2 /> },
            {
                label: 'sidebar.messages',
                href: '/',
                icon: <MessageCircleMore />,
            },
        ],
    },
    { label: 'sidebar.help', icon: <HandHelping />, href: '/' },
    {
        label: 'sidebar.settings',
        icon: <Cog />,
        nested: [
            { label: 'sidebar.stories', href: '/', icon: <LibraryBig /> },
            { label: 'sidebar.posts', href: '/', icon: <FileVideo /> },
            { label: 'sidebar.reposts', href: '/', icon: <Repeat2 /> },
            {
                label: 'sidebar.messages',
                href: '/',
                icon: <MessageCircleMore />,
            },
        ],
    },
    { label: 'sidebar.billing', icon: <Receipt />, href: '/' },
    // { label: "sidebar.accounts",  href: "/",  icon: <UsersRound /> },
    // { label: "sidebar.accountsFollowing",  href:"/",  icon: <UserCheck /> },
    // { label: "sidebar.blacklist",  href: "/",  icon: <Ban /> },
    // { label: "sidebar.content",  href: "/",  icon: <SquarePen /> },
    // { label: "sidebar.contentGroup",  href: "/",  icon: <NotebookPen /> },
    // { label: "sidebar.groups",  href: "/",  icon: <Book /> },
    // { label: "sidebar.ourGroups",  href: "/",  icon: <NotebookTabs /> },
    // { label: "sidebar.help",  href: "/",  icon: <HandHelping /> },
    // {
    //     label: "sidebar.settings", icon: <Settings />,
    //     nested: [
    //         { label: "sidebar.behavior",  href: "/",  icon: <UserRoundCog /> },
    //         { label: "sidebar.browser",  href: "/",  icon: <Chrome /> },
    //         { label: "sidebar.proxy",  href: "/",  icon: <Waypoints /> },
    //         { label: "sidebar.autojoin",  href: "/",  icon: <LogIn /> },
    //         { label: "sidebar.pinned",  href: "/",  icon: <Pin /> },
    //         { label: "sidebar.following",  href: "/",  icon: <BookPlus /> },
    //         { label: "sidebar.subscriptions",  href: "/",  icon: <Banknote /> },
    //     ],
    // },
];

function Layout_({ children, onClick }: LayoutProps) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [expandedItems, setExpandedItems] = useState<{
        [key: string]: boolean;
    }>({});
    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const toggleNestedItems = (label: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };
    return (
        <div className="flex h-screen">
            {/* Sidebar for desktop */}
            <div
                className={`hidden sm:block
                    fixed top-0 left-0 h-full w-[20%] p-4  shadow-md
                    transform-gpu transition-transform duration-500 ease-in-out
                    ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <h1 className="font-bold text-xl    pl-4">FANAT</h1>
                {sidebarItems.map((link, index) => (
                    <React.Fragment key={link.label}>
                        <Link
                            to={link.href || '#'}
                            onClick={() =>
                                link.nested && toggleNestedItems(link.label)
                            }
                        >
                            <SidebarButton
                                active={
                                    link.href === '/'
                                        ? location.pathname === '/'
                                        : location.pathname == link.href
                                }
                                icon={link.icon}
                                className="w-full"
                                label={link.label}
                                nested={!!link.nested?.length}
                                expanded={expandedItems[link.label]}
                            />
                        </Link>
                        {link.nested && expandedItems[link.label] && (
                            <div className="ml-5">
                                {link.nested.map((nestedLink, nestedIndex) => (
                                    <Link
                                        to={nestedLink.href || '#'}
                                        key={nestedLink.label}
                                    >
                                        <SidebarButton
                                            active={location.pathname.startsWith(
                                                nestedLink.href
                                            )}
                                            icon={nestedLink.icon}
                                            className="w-full"
                                            label={nestedLink.label}
                                            onClick={() =>
                                                onClick(nestedLink.value)
                                            }
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Sidebar for mobile */}
            <div
                className={`sm:hidden z-[1000] bg-background fixed top-0 left-0 h-full w-[75%] bg-gray-100 p-4 shadow-md transform transition-transform duration-500 ease-in-out ${
                    showSidebar ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <button
                    onClick={toggleSidebar}
                    className="absolute top-2 right-2 text-xl font-bold"
                >
                    &times;
                </button>
                <h1 className="font-bold text-xl pl-4">FANAT</h1>
                {sidebarItems.map((link, index) => (
                    <React.Fragment key={link.label}>
                        <Link
                            to={link.href || '#'}
                            onClick={() =>
                                link.nested && toggleNestedItems(link.label)
                            }
                        >
                            <SidebarButton
                                active={
                                    link.href === '/'
                                        ? location.pathname === '/'
                                        : location.pathname == link.href
                                }
                                icon={link.icon}
                                className="w-full"
                                label={link.label}
                                nested={!!link.nested?.length}
                                expanded={expandedItems[link.label]}
                            />
                        </Link>
                        {link.nested && expandedItems[link.label] && (
                            <div className="ml-5">
                                {link.nested.map((nestedLink, nestedIndex) => (
                                    <Link
                                        to={nestedLink.href || '#'}
                                        key={nestedLink.label}
                                    >
                                        <SidebarButton
                                            active={location.pathname.startsWith(
                                                nestedLink.href
                                            )}
                                            icon={nestedLink.icon}
                                            className="w-full"
                                            label={nestedLink.label}
                                            onClick={() =>
                                                onClick(nestedLink.value)
                                            }
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Main content */}
            <main
                className={`flex-grow p-4 transition-all duration-500 ease-in-out ${
                    showSidebar ? 'sm:ml-[20%]' : 'ml-0'
                }`}
            >
                {/* Mobile toggle button */}

                <LanguageAndThemeToggle setShowSidebar={toggleSidebar} />
                {children}
            </main>
        </div>
    );
}

export default Layout_;
