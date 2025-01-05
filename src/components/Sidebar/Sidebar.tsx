import {SidebarItems} from "@/types";
import DesktopSidebar from "@/components/Sidebar/DesktopSidebar";
import MobileSidebar from "@/components/Sidebar/MobileSidebar";
import {useMediaQuery} from "@/hooks/useMediaQuery";

interface SidebarProps {
    sidebarItems: SidebarItems;
}

const Sidebar = ({sidebarItems}: SidebarProps) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    if (isDesktop) return (
        <DesktopSidebar sidebarItems={sidebarItems}/>
    );
    return <MobileSidebar sidebarItems={sidebarItems}/>
};

export default Sidebar;