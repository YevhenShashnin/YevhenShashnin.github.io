import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/fanat/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Accounts from "@/modules/Accounts/Accounts";
import ContentGroup from "@/modules/ContentGroup/ContentGroup";
import Content from "@/modules/Content/Content";
import Behavior from "@/modules/Settings/Behavior/Behavior";
import Browser from "@/modules/Settings/Browser/Browser";
import { ROUTES } from "@/constants/routes";
import Blacklist from "@/modules/Blacklist/Blacklist";
import Group from "@/modules/Group/Group";
import OurGroup from "@/modules/OurGroup/OurGroup";
import Proxy from "@/modules/Settings/Proxy/Proxy";
import Autojoin from "@/modules/Settings/Autojoin/Autojoin";
import Pinned from "@/modules/Settings/Pinned/Pinned";
import AccountsFollowing from "@/modules/AccountsFollowing/AccountsFollowing";
import Following from "@/modules/Settings/Following/Following";
import SASubscriptions from "@/modules/Settings/Subscriptions/SASubscriptions";

const SuperAdminEditUser = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userId, slug, settings } = useParams();

    // State to keep track of the selected tab and settings tab
    const [currentTab, setCurrentTab] = useState(slug || "account");
    const [currentSettingsTab, setCurrentSettingsTab] = useState(settings || "behaviour");
    const [currentSubTab, setCurrentSubTab] = useState("active");

    // Sync tab state with URL whenever slug or settings change
    useEffect(() => {
        setCurrentTab(slug || "account");
    }, [slug]);

    useEffect(() => {
        setCurrentSettingsTab(settings || "behaviour");
    }, [settings]);

    const handleTabClick = (value: string) => {
        navigate(`/super-admin/edit-user/${userId}/${value}`);
    };

    const handleSettingsTabClick = (value: string) => {
        navigate(`/super-admin/edit-user/${userId}/settings/${value}`);
    };
    const handleSubTabClick = (value: string) => {
        setCurrentSubTab(value);
    }

    return (
        <>
            <div className="flex items-center mb-4 mt-1">
                <Button variant="ghost" className="mr-4" onClick={() => navigate(ROUTES.SUPER_ADMIN.BASE)}>
                    <ArrowLeft className="text-blue" />
                </Button>
                <h1 className="text-xl text-blue">{t("superAdmin.user")}</h1>
            </div>

            {/* Main Tabs */}
            <Tabs value={currentTab} onValueChange={handleTabClick} className="w-full">
                <TabsList className="w-full flex justify-around">
                    <TabsTrigger value="subscriptions">{t("superAdmin.subscriptions")}</TabsTrigger>
                    <TabsTrigger value="account">{t("superAdmin.account")}</TabsTrigger>
                    <TabsTrigger value="acc-following">{t("superAdmin.accountsFollowing")}</TabsTrigger>
                    <TabsTrigger value="blacklist">{t("superAdmin.blacklist")}</TabsTrigger>

                    <TabsTrigger value="content">{t("superAdmin.content")}</TabsTrigger>
                    <TabsTrigger value="content-group">{t("superAdmin.contentGroup")}</TabsTrigger>
                    {/*<TabsTrigger value="groups">{t("superAdmin.groups")}</TabsTrigger>*/}
                    <TabsTrigger value="ourGroups">{t("superAdmin.ourGroups")}</TabsTrigger>
                    <TabsTrigger value="settings">{t("superAdmin.settings")}</TabsTrigger>
                </TabsList>

                <TabsContent value="subscriptions">
                    <Tabs value={currentSubTab} onValueChange={handleSubTabClick} className="w-full">
                        <TabsList className="w-full flex justify-around">
                            <TabsTrigger value="active">{t("subscriptions.active")}</TabsTrigger>
                            <TabsTrigger value="expired">{t("subscriptions.expired")}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="active"><SASubscriptions active /></TabsContent>
                        <TabsContent value="expired"><SASubscriptions /></TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="account"><Accounts superAdmin /></TabsContent>
                <TabsContent value="content-group"><ContentGroup superAdmin /></TabsContent>
                <TabsContent value="content"><Content superAdmin /></TabsContent>
                <TabsContent value="acc-following"><AccountsFollowing superAdmin /></TabsContent>
                <TabsContent value="blacklist"><Blacklist superAdmin /></TabsContent>
                {/*<TabsContent value="groups"><Group superAdmin /></TabsContent>*/}
                <TabsContent value="ourGroups"><OurGroup superAdmin /></TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                    <Tabs value={currentSettingsTab} onValueChange={handleSettingsTabClick} className="w-full">
                        <TabsList className="w-full flex justify-around">
                            <TabsTrigger value="behaviour">{t("superAdmin.behaviour")}</TabsTrigger>
                            <TabsTrigger value="browser">{t("superAdmin.browser")}</TabsTrigger>
                            <TabsTrigger value="proxy">{t("superAdmin.proxy")}</TabsTrigger>
                            <TabsTrigger value="autojoin">{t("superAdmin.autojoin")}</TabsTrigger>
                            <TabsTrigger value="pinned">{t("superAdmin.pinned")}</TabsTrigger>
                            <TabsTrigger value="following">{t("superAdmin.following")}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="behaviour"><Behavior superAdmin /></TabsContent>
                        <TabsContent value="browser"><Browser superAdmin /></TabsContent>
                        <TabsContent value="proxy"><Proxy superAdmin /></TabsContent>
                        <TabsContent value="autojoin"><Autojoin superAdmin /></TabsContent>
                        <TabsContent value="pinned"><Pinned superAdmin /></TabsContent>
                        <TabsContent value="following"><Following superAdmin /></TabsContent>
                    </Tabs>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default SuperAdminEditUser;
