import React, { useState } from "react";
import { SidebarItems } from "@/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import SidebarButton from "@/components/Sidebar/SidebarButton";
import { Menu } from "lucide-react";

interface SidebarProps {
    sidebarItems: SidebarItems;
}

const MobileSidebar = ({ sidebarItems }: SidebarProps) => {
    const location = useLocation();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

    const toggleSheet = () => setIsSheetOpen(!isSheetOpen);

    const toggleNestedItems = (label: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    return (
        <Sheet open={isSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="absolute m-4" onClick={toggleSheet}>
                    <Menu className={"w-[30px] h-[30px]"} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" onClick={toggleSheet} className="overflow-y-auto">
                <div className="mt-5">
                    <div className="flex flex-col w-full">
                        {sidebarItems.links.map((link, index) => (
                            <React.Fragment key={link.label}>
                                <Link
                                    to={link.href || "#"}
                                    onClick={() => {
                                        if (link.nested) {
                                            toggleNestedItems(link.label);
                                        } else {
                                            toggleSheet();
                                        }
                                    }}
                                >
                                    <SidebarButton
                                        active={location.pathname === link.href}
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
                                                to={nestedLink.href || "#"}
                                                key={nestedLink.label}
                                                onClick={toggleSheet}
                                            >
                                                <SidebarButton
                                                    active={location.pathname === nestedLink.href}
                                                    icon={nestedLink.icon}
                                                    className="w-full"
                                                    label={nestedLink.label}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
