import React, {ReactElement, Suspense, lazy} from "react";
import {BrowserRouter as Router, Routes, Route, RouteProps} from "react-router-dom";
import {ThemeProvider} from "@/components/theme-provider";
import PrivateRoutes from "@/routes/PrivateRoutes";
import ProtectedRoute from "@/routes/ProtectedRoute";
import {ROUTES} from "@/constants/routes";
import {userRolesEnum} from "@/constants/userRoles";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import NotFound from "@/components/NotFound/NotFound";
import {Loader} from "@/components/ui";

const Dashboard = lazy(() => import("@/modules/Dashboard/Dashboard"));
const Accounts = lazy(() => import("@/modules/Accounts/Accounts"));
const EditAccount = lazy(() => import("@/modules/Accounts/EditAccount/EditAccount"));
const AccountItem = lazy(() => import("@/modules/Accounts/AccountItem"));
const AccountsFollowing = lazy(() => import("@/modules/AccountsFollowing/AccountsFollowing"));
const AccountFollowingItem = lazy(() => import("@/modules/AccountsFollowing/AccountFollowingItem"));
const Blacklist = lazy(() => import("@/modules/Blacklist/Blacklist"));
const CreateBlacklist = lazy(() => import("@/modules/Blacklist/CreateBlacklist"));
const Content = lazy(() => import("@/modules/Content/Content"));
const CreateContent = lazy(() => import("@/modules/Content/CreateContent"));
const ContentGroup = lazy(() => import("@/modules/ContentGroup/ContentGroup"));
const ContentGroupItem = lazy(() => import("@/modules/ContentGroup/ContentGroupItem"));
const Group = lazy(() => import("@/modules/Group/Group"));
const GroupItem = lazy(() => import("@/modules/Group/GroupItem"));
const OurGroup = lazy(() => import("@/modules/OurGroup/OurGroup"));
const CreateOurGroup = lazy(() => import("@/modules/OurGroup/CreateOurGroup"));
const Behavior = lazy(() => import("@/modules/Settings/Behavior/Behavior"));
const CreateBehavior = lazy(() => import("@/modules/Settings/Behavior/CreateBehavior"));
const Browser = lazy(() => import("@/modules/Settings/Browser/Browser"));
const CreateBrowser = lazy(() => import("@/modules/Settings/Browser/CreateBrowser"));
const Proxy = lazy(() => import("@/modules/Settings/Proxy/Proxy"));
const CreateProxy = lazy(() => import("@/modules/Settings/Proxy/CreateProxy"));
const Autojoin = lazy(() => import("@/modules/Settings/Autojoin/Autojoin"));
const CreateAutojoin = lazy(() => import("@/modules/Settings/Autojoin/CreateAutojoin"));
const Pinned = lazy(() => import("@/modules/Settings/Pinned/Pinned"));
const CreatePinned = lazy(() => import("@/modules/Settings/Pinned/CreatePinned"));
const Following = lazy(() => import("@/modules/Settings/Following/Following"));
const CreateFollowing = lazy(() => import("@/modules/Settings/Following/CreateFollowing"));
const Subscriptions = lazy(() => import("@/modules/Settings/Subscriptions/Subscriptions"));
const SACreateSubscriptions = lazy(() => import("@/modules/Settings/Subscriptions/SACreateSubscriptions"));
const SuperAdmin = lazy(() => import("@/modules/SuperAdmin/SuperAdmin"));
const SuperAdminEditUser = lazy(() => import("@/modules/SuperAdmin/SuperAdminEditUser"));
const Auth = lazy(() => import("@/modules/Auth/Auth"));
const CreateContentGroup = lazy(() => import("@/modules/ContentGroup/CreateContentGroup"));
const CreateAccountsFollowing = lazy(() => import("@/modules/AccountsFollowing/EditAccount/EditAccount"));
const Help = lazy(() => import("@/modules/Help/Help"));
const ResetPassword = lazy(() => import("@/modules/Auth/ResetPassword"));
const ConfirmRegister = lazy(() => import("@/modules/Auth/ConfirmRegister"));

function App() {
    return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"><Dashboard/></ThemeProvider>;
    // return (
    //     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    //         <Router>
    //             <ErrorBoundary>
    //                 <Suspense fallback={<div className="w-full h-full"><Loader /></div>}>
    //                     <Routes>
    //                         <Route element={<PrivateRoutes />}>
    //                             <Route path={ROUTES.AUTH.HOME} element={<Dashboard />} />
    //
    //                             <Route path={ROUTES.HELP} element={<Help />} />
    //
    //                             <Route path={ROUTES.ACCOUNTS.LIST} element={<Accounts />} />
    //                             <Route path={ROUTES.ACCOUNTS.CREATE} element={<EditAccount />} />
    //                             <Route path={ROUTES.ACCOUNTS.EDIT} element={<EditAccount />} />
    //                             <Route path={ROUTES.ACCOUNTS.ITEM} element={<AccountItem />} />
    //
    //                             <Route path={ROUTES.ACCOUNTS_FOLLOWING.LIST} element={<AccountsFollowing />} />
    //                             <Route path={ROUTES.ACCOUNTS_FOLLOWING.CREATE} element={<CreateAccountsFollowing />} />
    //                             <Route path={ROUTES.ACCOUNTS_FOLLOWING.EDIT} element={<CreateAccountsFollowing />} />
    //                             <Route path={ROUTES.ACCOUNTS_FOLLOWING.ITEM} element={<AccountFollowingItem />} />
    //
    //                             <Route path={ROUTES.BLACKLIST.LIST} element={<Blacklist />} />
    //                             <Route path={ROUTES.BLACKLIST.CREATE} element={<CreateBlacklist />} />
    //                             <Route path={ROUTES.BLACKLIST.EDIT} element={<CreateBlacklist />} />
    //
    //                             <Route path={ROUTES.GROUPS.LIST} element={<Group />} />
    //                             <Route path={ROUTES.GROUPS.ITEM} element={<GroupItem />} />
    //
    //                             <Route path={ROUTES.OUR_GROUPS.LIST} element={<OurGroup />} />
    //                             <Route path={ROUTES.OUR_GROUPS.CREATE} element={<CreateOurGroup />} />
    //                             <Route path={ROUTES.OUR_GROUPS.EDIT} element={<CreateOurGroup />} />
    //
    //                             <Route path={ROUTES.CONTENT.LIST} element={<Content />} />
    //                             <Route path={ROUTES.CONTENT.CREATE} element={<CreateContent />} />
    //                             <Route path={ROUTES.CONTENT.EDIT} element={<CreateContent />} />
    //
    //                             <Route path={ROUTES.CONTENT_GROUP.LIST} element={<ContentGroup />} />
    //                             <Route path={ROUTES.CONTENT_GROUP.CREATE} element={<CreateContentGroup />} />
    //                             <Route path={ROUTES.CONTENT_GROUP.EDIT} element={<CreateContentGroup />} />
    //                             <Route path={ROUTES.CONTENT_GROUP.ITEM} element={<ContentGroupItem />} />
    //
    //                             <Route path={ROUTES.AUTOJOIN.LIST} element={<Autojoin />} />
    //                             <Route path={ROUTES.AUTOJOIN.CREATE} element={<CreateAutojoin />} />
    //                             <Route path={ROUTES.AUTOJOIN.EDIT} element={<CreateAutojoin />} />
    //
    //                             <Route path={ROUTES.PINNED.LIST} element={<Pinned />} />
    //                             <Route path={ROUTES.PINNED.CREATE} element={<CreatePinned />} />
    //                             <Route path={ROUTES.PINNED.EDIT} element={<CreatePinned />} />
    //
    //                             <Route path={ROUTES.BEHAVIOR.LIST} element={<Behavior />} />
    //                             <Route path={ROUTES.BEHAVIOR.CREATE} element={<CreateBehavior />} />
    //                             <Route path={ROUTES.BEHAVIOR.EDIT} element={<CreateBehavior />} />
    //
    //                             <Route path={ROUTES.BROWSER.LIST} element={<Browser />} />
    //                             <Route path={ROUTES.BROWSER.CREATE} element={<CreateBrowser />} />
    //                             <Route path={ROUTES.BROWSER.EDIT} element={<CreateBrowser />} />
    //
    //                             <Route path={ROUTES.PROXY.LIST} element={<Proxy />} />
    //                             <Route path={ROUTES.PROXY.CREATE} element={<CreateProxy />} />
    //                             <Route path={ROUTES.PROXY.EDIT} element={<CreateProxy />} />
    //
    //                             <Route path={ROUTES.PINNED.LIST} element={<Pinned />} />
    //                             <Route path={ROUTES.PINNED.CREATE} element={<CreatePinned />} />
    //                             <Route path={ROUTES.PINNED.EDIT} element={<CreatePinned />} />
    //
    //                             <Route path={ROUTES.FOLLOWING.LIST} element={<Following />} />
    //                             <Route path={ROUTES.FOLLOWING.CREATE} element={<CreateFollowing />} />
    //                             <Route path={ROUTES.FOLLOWING.EDIT} element={<CreateFollowing />} />
    //
    //                             <Route path={ROUTES.SUBSCRIPTION.LIST} element={<Subscriptions />} />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BASE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <SuperAdmin />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <SuperAdminEditUser />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.ACCOUNTS.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <EditAccount />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.ACCOUNTS.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <EditAccount />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.ACCOUNTS.ITEM}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <AccountItem />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BLACKLIST.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateBlacklist />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BLACKLIST.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateBlacklist />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.ACCOUNTS_FOLLOWING.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateAccountsFollowing />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.ACCOUNTS_FOLLOWING.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateAccountsFollowing />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.CONTENT.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateContent />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.CONTENT.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateContent />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.CONTENT_GROUP.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateContentGroup />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.CONTENT_GROUP.ITEM}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <ContentGroupItem />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.CONTENT_GROUP.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateContentGroup />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.AUTOJOIN.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateAutojoin />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.AUTOJOIN.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateAutojoin />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.PINNED.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreatePinned />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.PINNED.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreatePinned />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BEHAVIOR.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateBehavior />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BEHAVIOR.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateBehavior />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BROWSER.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateBrowser />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BROWSER.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateBrowser />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.PROXY.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateProxy />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.PROXY.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateProxy />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.FOLLOWING.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateFollowing />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.FOLLOWING.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateFollowing />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.SUBSCRIPTIONS.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <SACreateSubscriptions />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.SUBSCRIPTIONS.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <SACreateSubscriptions />
    //                                     </ProtectedRoute>
    //                                 }
    //                             />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.OUR_GROUPS.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateOurGroup />
    //                                     </ProtectedRoute>
    //                                 } />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.OUR_GROUPS.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateOurGroup />
    //                                     </ProtectedRoute>
    //                                 } />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BEHAVIOR.CREATE}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateBehavior />
    //                                     </ProtectedRoute>
    //                                 } />
    //                             <Route
    //                                 path={ROUTES.SUPER_ADMIN.BEHAVIOR.EDIT}
    //                                 element={
    //                                     <ProtectedRoute allowedRole={userRolesEnum.ROLE_SUPER_ADMIN}>
    //                                         <CreateBehavior />
    //                                     </ProtectedRoute>
    //                                 } />
    //                             <Route path="*" element={<NotFound />} />
    //                         </Route>
    //
    //                         <Route path={ROUTES.AUTH.LOGIN} element={<Auth />} />
    //
    //                         <Route path={ROUTES.AUTH.CONFIRM_REGISTER} element={<ConfirmRegister />} />
    //
    //                         <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ResetPassword />} />
    //
    //                     </Routes>
    //                 </Suspense>
    //             </ErrorBoundary>
    //         </Router>
    //     </ThemeProvider>
    // );
}

export default App;
