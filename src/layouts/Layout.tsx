import { ReactNode, useEffect, useState, useRef } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
    Activity,
    User,
    Settings,
    SquarePen,
    Chrome,
    UserRoundCog,
    Waypoints,
    NotebookPen,
    UserCheck,
    Ban, LogIn, Pin, Shield, BookPlus, Banknote,
    Users, UsersRound, ChartArea, NotebookTabs, Book, HandHelping,
} from "lucide-react";
import LanguageAndThemeToggle from "@/components/LanguageAndThemeToggle";
import DeleteModal from "@/modules/shared/DeleteModal/DeleteModal";
import { ROUTES } from "@/constants/routes";
import { userRolesEnum } from "@/constants/userRoles";
import { useUserStore } from "@/store/userStore";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
    children: ReactNode;
}

let baseSidebarLinks = [
    { label: "sidebar.dashboard", href: "/", icon: <ChartArea /> },
    { label: "sidebar.accounts", href: ROUTES.ACCOUNTS.LIST, icon: <UsersRound /> },
    { label: "sidebar.accountsFollowing", href: ROUTES.ACCOUNTS_FOLLOWING.LIST, icon: <UserCheck /> },
    { label: "sidebar.blacklist", href: ROUTES.BLACKLIST.LIST, icon: <Ban /> },
    { label: "sidebar.content", href: ROUTES.CONTENT.LIST, icon: <SquarePen /> },
    { label: "sidebar.contentGroup", href: ROUTES.CONTENT_GROUP.LIST, icon: <NotebookPen /> },
    { label: "sidebar.groups", href: ROUTES.GROUPS.LIST, icon: <Book /> },
    { label: "sidebar.ourGroups", href: ROUTES.OUR_GROUPS.LIST, icon: <NotebookTabs /> },
    { label: "sidebar.help", href: ROUTES.HELP, icon: <HandHelping /> },
    {
        label: "sidebar.settings", icon: <Settings />,
        nested: [
            { label: "sidebar.behavior", href: ROUTES.BEHAVIOR.LIST, icon: <UserRoundCog /> },
            { label: "sidebar.browser", href: ROUTES.BROWSER.LIST, icon: <Chrome /> },
            { label: "sidebar.proxy", href: ROUTES.PROXY.LIST, icon: <Waypoints /> },
            { label: "sidebar.autojoin", href: ROUTES.AUTOJOIN.LIST, icon: <LogIn /> },
            { label: "sidebar.pinned", href: ROUTES.PINNED.LIST, icon: <Pin /> },
            { label: "sidebar.following", href: ROUTES.FOLLOWING.LIST, icon: <BookPlus /> },
            { label: "sidebar.subscriptions", href: ROUTES.SUBSCRIPTION.LIST, icon: <Banknote /> },
        ],
    },
];

function Layout({ children }: LayoutProps) {
    const { roles } = useUserStore(); // Fetch the user's roles

    const [dynamicLinks, setDynamicLinks] = useState([...baseSidebarLinks]); // Initialize state with a shallow copy

    const isSuperAdminAddedRef = useRef(false);

    useEffect(() => {
        // Check if the Super Admin link is already present
        const isSuperAdminLinkPresent = dynamicLinks.some(link => link.label === "sidebar.superAdmin");

        // Only proceed if Super Admin hasn't been added yet
        if (
            roles &&
            roles.includes(userRolesEnum.ROLE_SUPER_ADMIN) &&
            !isSuperAdminLinkPresent &&
            !isSuperAdminAddedRef.current // Check if it has been added already
        ) {
            setDynamicLinks((prevLinks) => [
                ...prevLinks,
                {
                    label: "sidebar.superAdmin",
                    href: ROUTES.SUPER_ADMIN.BASE,
                    icon: <Shield />,
                },
            ]);
            isSuperAdminAddedRef.current = true; // Mark that Super Admin has been added
        }
    }, [roles, dynamicLinks]);

    return (
        <div className="flex h-screen">
            <Sidebar sidebarItems={{
                links: dynamicLinks,
            }} />
            <main className="mt-12 md:mt-0 md:ml-[270px] p-[20px] w-full h-[max-content]">
                {children}
            </main>
            <LanguageAndThemeToggle />
            <DeleteModal />
            <Toaster />
        </div>
    );
}

export default Layout;

