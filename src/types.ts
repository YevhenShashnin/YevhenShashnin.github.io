import React from "react";

export interface SidebarItems {
    links: Array<
        {
            label: string;
            href?: string;
            icon?:  React.ReactNode;
            nested?: Array<{
                label: string;
                href: string;
                icon?: React.ReactNode;
            }>;
        }
    >
}