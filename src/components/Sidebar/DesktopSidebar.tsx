import React, { useEffect, useState } from "react";
import SidebarButton from "@/components/Sidebar/SidebarButton";
import { SidebarItems } from "@/types";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    sidebarItems: SidebarItems;
}

const DesktopSidebar = ({ sidebarItems }: SidebarProps) => {
    const location = useLocation();
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

    const toggleNestedItems = (label: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    useEffect(() => {
        const currentPath = location.pathname;
        sidebarItems.links.forEach(link => {
            if (link.nested) {
                const expanded = link.nested.some(nestedLink => currentPath.startsWith(nestedLink.href));
                setExpandedItems(prev => ({
                    ...prev,
                    [link.label]: expanded,
                }));
            }
        });
    }, []);
    return (
        <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r dark:bg-black overflow-auto">
            <div className="h-full px-3 py-4">
                <h3 className="mx-3 text-lg font-semibold text-foreground dark:text-white mb-3">Fanat</h3>
                <div className="mt-5">
                    <div className="flex flex-col w-full">
                        {sidebarItems.links.map((link, index) => (
                            <React.Fragment key={link.label}>
                                <Link
                                    to={link.href || "#"}
                                    onClick={() => link.nested && toggleNestedItems(link.label)}
                                >
                                    <SidebarButton
                                        active={link.href === "/"
                                            ? location.pathname === "/"
                                            : location.pathname == link.href}
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
                                            >
                                                <SidebarButton
                                                    active={location.pathname.startsWith(nestedLink.href)}
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
            </div>
        </aside>
    );
};

export default DesktopSidebar;
