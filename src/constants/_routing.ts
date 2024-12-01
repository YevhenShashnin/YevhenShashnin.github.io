import { Method } from "axios";

export interface ApiRoute {
    method: Method;
    url: string | ((id: string) => string);
}

type ApiRoutes = Record<string, ApiRoute>;

export const apiRoutes: ApiRoutes = {
    // AUTH
    register: {
        method: "POST",
        url: `/register`,
    },
    login: {
        method: "POST",
        url: `/login`,
    },
    logout: {
        method: "POST",
        url: `/logout`,
    },
    refreshToken: {
        method: "POST",
        url: `/token/refresh`,
    },
    // ACCOUNT
    getAccount: {
        method: "GET",
        url: `/account`,
    },
    getAccountsAll: {
        method: "GET",
        url: `/account/all`,
    },
    createAccount: {
        method: "POST",
        url: `/account`,
    },
    getAccountById: {
        method: "GET",
        url: (id: string) => `/account/${id}`,
    },
    updateAccountById: {
        method: "PUT",
        url: (id: string) => `/account/${id}`,
    },
    deleteAccountById: {
        method: "DELETE",
        url: (id: string) => `/account/${id}`,
    },
    switchAccountToFollow: {
        method: "POST",
        url: (id) => `/account/${id}/switch-to-follow`,
    },
    pauseAccount: {
        method: "POST",
        url: (id) => `/account/${id}/pause`,
    },
    restartAccount: {
        method: "POST",
        url: (id) => `/account/${id}/restart`,
    },
    // BEHAVIOR
    getBehavior: {
        method: "GET",
        url: `/behaviour`,
    },
    getBehaviorAll: {
        method: "GET",
        url: `/behaviour/all`,
    },
    createBehavior: {
        method: "POST",
        url: `/behaviour`,
    },
    getBehaviorById: {
        method: "GET",
        url: (id: string) => `/behaviour/${id}`,
    },
    updateBehaviorById: {
        method: "PUT",
        url: (id: string) => `/behaviour/${id}`,
    },
    deleteBehaviorById: {
        method: "DELETE",
        url: (id: string) => `/behaviour/${id}`,
    },
    // BROWSER
    getBrowser: {
        method: "GET",
        url: `/browser`,
    },
    createBrowser: {
        method: "POST",
        url: `/browser`,
    },
    getBrowserById: {
        method: "GET",
        url: (id: string) => `/browser/${id}`,
    },
    updateBrowserById: {
        method: "PUT",
        url: (id: string) => `/browser/${id}`,
    },
    deleteBrowserById: {
        method: "DELETE",
        url: (id: string) => `/browser/${id}`,
    },
    // PROXY
    getProxy: {
        method: "GET",
        url: `/proxy`,
    },
    createProxy: {
        method: "POST",
        url: `/proxy`,
    },
    getProxyById: {
        method: "GET",
        url: (id: string) => `/proxy/${id}`,
    },
    updateProxyById: {
        method: "PUT",
        url: (id: string) => `/proxy/${id}`,
    },
    deleteProxyById: {
        method: "DELETE",
        url: (id: string) => `/proxy/${id}`,
    },
    // CONTENT
    getContent: {
        method: "GET",
        url: `/content`,
    },
    createContent: {
        method: "POST",
        url: `/content`,
    },
    getContentAll: {
        method: "GET",
        url: `/content/all`,
    },
    getContentById: {
        method: "GET",
        url: (id: string) => `/content/${id}`,
    },
    updateContentById: {
        method: "PUT",
        url: (id: string) => `/content/${id}`,
    },
    deleteContentById: {
        method: "DELETE",
        url: (id: string) => `/content/${id}`,
    },
    // CONTENT GROUP
    getContentGroup: {
        method: "GET",
        url: `/content-group`,
    },
    getContentGroupAll: {
        method: "GET",
        url: `/content-group/all`,
    },
    getContentGroupById: {
        method: "GET",
        url: (id: string) => `/content-group/${id}`,
    },
    createContentGroup: {
        method: "POST",
        url: `/content-group`,
    },
    updateContentGroupById: {
        method: "PUT",
        url: (id: string) => `/content-group/${id}`,
    },
    deleteContentGroupById: {
        method: "DELETE",
        url: (id: string) => `/content-group/${id}`,
    },
    // BLACKLIST
    getBlacklist: {
        method: "GET",
        url: `/blacklist`,
    },
    getBlacklistById: {
        method: "GET",
        url: (id: string) => `/blacklist/${id}`,
    },
    createBlacklist: {
        method: "POST",
        url: `/blacklist`,
    },
    updateBlacklistById: {
        method: "PUT",
        url: (id: string) => `/blacklist/${id}`,
    },
    deleteBlacklistById: {
        method: "DELETE",
        url: (id: string) => `/blacklist/${id}`,
    },
    // GROUPS
    getGroups: {
        method: "GET",
        url: `/group`,
    },

    // OUR GROUPS
    getOurGroups: {
        method: "GET",
        url: `/our-group`,
    },
    deleteOurGroupById: {
        method: "DELETE",
        url: (id: string) => `/our-group/${id}`,
    },
    createOurGroup: {
        method: "POST",
        url: `/our-group`,
    },
    editOurGroup: {
        method: "PUT",
        url: (id: string) => `/our-group/${id}`,
    },
    getOurGroupById: { // do we need this?
        method: "GET",
        url: (id: string) => `/our-group/${id}`,
    },
    updateOurGroupById: {
        method: "PUT",
        url: (id: string) => `/our-group/${id}`,
    },
    // ACCOUNTS FOLLOWING
    getAccountFollowing: {
        method: "GET",
        url: `/account-follow`,
    },
    createAccountFollowing: {
        method: "POST",
        url: `/account-follow`,
    },
    switchFollowToRetweet: {
        method: "POST",
        url: (id) => `/account-follow/${id}/switch-to-retweet`,
    },
    pauseAccountFollowing: {
        method: "POST",
        url: (id) => `/account-follow/${id}/pause`,
    },
    restartAccountFollowing: {
        method: "POST",
        url: (id) => `/account-follow/${id}/restart`,
    },
    getAccountFollowingById: {
        method: "GET",
        url: (id: string) => `/account-follow/${id}`,
    },
    updateAccountFollowingById: {
        method: "PUT",
        url: (id: string) => `/account-follow/${id}`,
    },
    deleteAccountFollowingById: {
        method: "DELETE",
        url: (id: string) => `/account-follow/${id}`,
    },
    // AUTOJOIN
    getAutojoin: {
        method: "GET",
        url: `/autojoin-settings`,
    },
    deleteAutojoinById: {
        method: "DELETE",
        url: (id: string) => `/autojoin-settings/${id}`,
    },
    createAutojoin: {
        method: "POST",
        url: `/autojoin-settings`,
    },
    getAutojoinById: {
        method: "GET",
        url: (id: string) => `/autojoin-settings/${id}`,
    },
    updateAutojoinById: {
        method: "PUT",
        url: (id: string) => `/autojoin-settings/${id}`,
    },
    // PINNED
    getPinned: {
        method: "GET",
        url: `/pinned-settings/`,
    },
    getPinnedAll: {
        method: "GET",
        url: `/pinned-settings/all`,
    },
    createPinned: {
        method: "POST",
        url: `/pinned-settings`,
    },
    deletePinnedById: {
        method: "DELETE",
        url: (id: string) => `/pinned-settings/${id}`,
    },
    getPinnedById: {
        method: "GET",
        url: (id: string) => `/pinned-settings/${id}`,
    },
    updatePinnedById: {
        method: "PUT",
        url: (id: string) => `/pinned-settings/${id}`,
    },
    // FOLLOWING
    getFollowing: {
        method: "GET",
        url: `/following-settings`,
    },
    getFollowingAll: {
      method: "GET",
        url: `/following-settings/all`,
    },
    createFollowing: {
        method: "POST",
        url: `/following-settings`,
    },
    getFollowingById: {
        method: "GET",
        url: (id: string) => `/following-settings/${id}`,
    },
    updateFollowingById: {
        method: "PUT",
        url: (id: string) => `/following-settings/${id}`,
    },
    deleteFollowingById: {
        method: "DELETE",
        url: (id: string) => `/following-settings/${id}`,
    },
    // SUPER ADMIN
    //USERS
    superAdminGetUsers: {
        method: "GET",
        url: `/panel/users`,
    },
    superAdminCreateUser: {
        method: "POST",
        url: `/panel/users`,
    },
    superAdminDeleteUser: {
        method: "DELETE",
        url: (id: string) => `/panel/users/${id}`,
    },
    //SA GROUPS
    superAdminGetUserGroups: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/group`,
    },
    //SA ACCOUNTS
    superAdminGetUserAccounts: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/account`,
    },
    superAdminDeleteUserAccount: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/account/${id}`,
    },
    superAdminGetUserAccountsAll: {
        method: "GET",
        url: (userId) => `/panel/users/${userId}/account/all`,
    },
    //SA ACCOUNTS FOLLOWING
    superAdminGetUserAccountsFollowing: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/account-follow`,
    },
    superAdminDeleteUserAccountFollowing: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/account/${id}`,
    },
    superAdminGetUserAccountsFollowingAll: {
        method: "GET",
        url: (userId) => `/panel/users/${userId}/account/all`,
    },
    //SA CONTENT
    superAdminGetUserContent: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/content`,
    },
    superAdminCreateContent: {
        method: "POST",
        url: (id: string) => `/panel/users/${id}/content`,
    },
    superAdminDeleteUserContent: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/content/${id}`,
    },
    superAdminGetContentById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/content/${id}`,
    },
    superAdminUpdateContentById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/content/${id}`,
    },
    //SA CONTENT GROUP
    superAdminGetUserContentGroup: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/content-group`,
    },
    superAdminDeleteUserContentGroup: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/${id}`,
    },
    superAdminCreateContentGroup: {
        method: "POST",
        url: (id: string) => `/panel/users/${userId}/content-group`,
    },
    superAdminGetContentGroupById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/content-group/${id}`,
    },
    superAdminUpdateContentGroupById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/content-group/${id}`,
    },
    //SA BLACKLIST
    superAdminGetUserBlacklist: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/blacklist`,
    },
    superAdminDeleteUserBlacklist: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/blacklist/${id}`,
    },
    superAdminGetUserBlacklistById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/blacklist/${id}`,

    },
    superAdminCreateUserBlacklist: {
        method: "POST",
        url: (userId) => `/panel/users/${userId}/blacklist`,

    },
    superAdminUpdateUserBlacklistById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/blacklist/${id}`,
    },
    //SA OUR GROUPS
    superAdminGetUserOurGroup: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/our-group`,
    },
    superAdminDeleteUserOurGroup: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/our-group/${id}`,
    },
    superAdminGetUserOurGroupById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/our-group/${id}`,
    },
    superAdminCreateUserOurGroup: {
        method: "POST",
        url: (id: string) => `/panel/users/${id}/our-group`,
    },
    superAdminUpdateUserOurGroupById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/our-group/${id}`,
    },
    //SA BEHAVIOR
    superAdminGetUserBehavior: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/behaviour`,
    },
    superAdminDeleteUserBehavior: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/behaviour/${id}`,
    },
    superAdminUpdateUserBehaviorById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/behaviour/${id}`,
    },
    superAdminCreateUserBehavior: {
        method: "POST",
        url: (id: string) => `/panel/users/${id}/behaviour`,
    },
    superAdminGetUserBehaviorById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/behaviour/${id}`,
    },
    //SA BROWSER
    superAdminGetUserBrowser: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/browser`,
    },
    superAdminDeleteUserBrowser: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/browser/${id}`,
    },
    superAdminCreateUserBrowser: {
        method: "POST",
        url: (id: string) => `/panel/users/${id}/browser`,
    },
    superAdminUpdateUserBrowserById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/browser/${id}`,
    },
    superAdminGetUserBrowserById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/browser/${id}`,
    },

    //SA PROXY
    superAdminGetUserProxy: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/proxy`,
    },
    superAdminDeleteUserProxy: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/proxy/${id}`,
    },
    superAdminGetUserProxyById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/proxy/${id}`,
    },
    superAdminCreateUserProxy: {
        method: "POST",
        url: (id: string) => `/panel/users/${id}/proxy`,
    },
    superAdminUpdateUserProxyById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/proxy/${id}`,
    },
    //SA AUTOJOIN
    superAdminGetUserAutojoin: {
        method: "GET",
        url: (id: string) => ` / panel / users /${id}/autojoin-settings`,
    },
    superAdminDeleteUserAutojoin: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/autojoin-settings/${id}`,
    },
    superAdminGetUserAutojoinById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/autojoin-settings/${id}`,
    },
    superAdminCreateUserAutojoin: {
        method: "POST",
        url: (id: string) => `/panel/users/${id}/autojoin-settings`,
    },
    superAdminUpdateUserAutojoinById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/autojoin-settings/${id}`,
    },
    //SA PINNED
    superAdminGetUserPinned: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/pinned-settings`,
    },
    superAdminDeleteUserPinned: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/pinned-settings/${id}`,
    },
    superAdminGetUserPinnedById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/pinned-settings/${id}`,
    },
    superAdminCreateUserPinned: {
        method: "POST",
        url: (id: string) => `/panel/users/${id}/pinned-settings`,
    },
    superAdminUpdateUserPinnedById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/pinned-settings/${id}`,
    },
    // SA FOLLOWING
    superAdminGetUserFollowing: {
        method: "GET",
        url: (id: string) => `/panel/users/${id}/following-settings`,
    },
    superAdminDeleteUserFollowing: {
        method: "DELETE",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/following-settings/${id}`,
    },
    superAdminGetUserFollowingById: {
        method: "GET",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/following-settings/${id}`,
    },
    superAdminCreateUserFollowing: {
        method: "POST",
        url: (id: string) => `/panel/users/${id}/following-settings`,
    },
    superAdminUpdateUserFollowingById: {
        method: "PUT",
        url: ({ userId, id }: { userId: string, id: string }) => `/panel/users/${userId}/following-settings/${id}`,
    },
    superAdminGetSubscriptions: {
        method: "GET",
        url: userId => `/panel/users/${userId}/subscriptions`,
    },
    superAdminCreateSubscription: {
        method: "POST",
        url: userId => `/panel/users/${userId}/subscriptions`,
    },
    superAdminDeleteSubscription: {
        method: "DELETE",
        url: ({ userId, id }) => `/panel/users/${userId}/subscriptions/${id}`,
    },
    superAdminEditSubscription: {
        method: "PUT",
        url: ({ userId, id }) => `/panel/users/${userId}/subscriptions/${id}`,
    }
};

// constants.ts
export const ROUTES = {
    LOGIN: "/login",

    HOME: "/",

    ACCOUNTS: "/accounts",
    ACCOUNT_ITEM: "/account/:accountId",
    ACCOUNT_CREATE: "/accounts/create",
    ACCOUNT_EDIT: "/accounts/edit/:accountId",

    CONTENT: "/content",
    CONTENT_CREATE: "/content/create",
    CONTENT_EDIT: "/content/edit/:contentId",

    CONTENT_GROUP: "/group-content",
    CONTENT_GROUP_ITEM: "/group-content/:contentGroupId",
    CONTENT_GROUP_CREATE: "/group-content/create",
    CONTENT_GROUP_EDIT: "/group-content/edit/:contentGroupId",

    ACCOUNTS_FOLLOWING: "/acc-following",
    ACCOUNTS_FOLLOWING_CREATE: "/acc-following/create",
    ACCOUNTS_FOLLOWING_EDIT: "/acc-following/edit/:accountFollowingId",
    ACCOUNTS_FOLLOWING_ITEM: "/acc-following/:accountFollowingId",

    BEHAVIOR: "/behavior",
    BEHAVIOR_CREATE: "/behavior/create",
    BEHAVIOR_UPDATE: "/behavior/edit/:behaviorId",

    BROWSER: "/browser",
    BROWSER_CREATE: "/browser/create",
    BROWSER_EDIT: "/browser/edit/:browserId",

    PROXY: "/proxy",
    PROXY_CREATE: "/proxy/create",
    PROXY_EDIT: "/proxy/edit/:proxyId",

    BLACKLIST: "/blacklist",
    BLACKLIST_CREATE: "/blacklist/create",
    BLACKLIST_EDIT: "/blacklist/edit/:blacklistId",

    GROUPS: "/groups",
    GROUPS_ITEM: "/groups/:id",

    OUR_GROUPS: "/our-groups",
    OUR_GROUPS_CREATE: "/our-groups/create",
    OUR_GROUPS_EDIT: "/our-groups/edit/:ourGroupsId",

    FOREIGN_ACCOUNTS: "/foreign-accounts",


    FOLLOWING: "/following",
    FOLLOWING_CREATE: "/following/create",
    FOLLOWING_EDIT: "/following/edit/:followingId",

    AUTOJOIN: "/autojoin",
    AUTOJOIN_CREATE: "/autojoin/create",
    AUTOJOIN_EDIT: "/autojoin/edit/:autojoinId",

    PINNED: "/pinned",
    PINNED_CREATE: "/pinned/create",
    PINNED_EDIT: "/pinned/edit/:pinnedId",

    SUPER_ADMIN: "/super-admin",
    SUPER_ADMIN_EDIT_USER: "/super-admin/edit-user/:userId/:slug?/:settings?",

    SUPER_ADMIN_EDIT_USER_CREATE_ACCOUNT: "/super-admin/edit-user/:userId/accounts/create",
    SUPER_ADMIN_EDIT_USER_EDIT_ACCOUNT: "/super-admin/edit-user/:userId/accounts/edit/:accountId",
    SUPER_ADMIN_EDIT_USER_ACCOUNT_ITEM: "/super-admin/edit-user/:userId/account/:accountId",

    SUPER_ADMIN_EDIT_USER_CREATE_ACCOUNT_FOLLOWING: "/super-admin/edit-user/:userId/acc-following/create",
    SUPER_ADMIN_EDIT_USER_EDIT_ACCOUNT_FOLLOWING: "/super-admin/edit-user/:userId/acc-following/edit/:accountFollowingId",
    SUPER_ADMIN_EDIT_USER_ACCOUNT_FOLLOWING_ITEM: "/super-admin/edit-user/:userId/following-account/:accountFollowingId",

    SUPER_ADMIN_EDIT_USER_CREATE_CONTENT: "/super-admin/edit-user/:userId/content/create",
    SUPER_ADMIN_EDIT_USER_EDIT_CONTENT: "/super-admin/edit-user/:userId/content/edit/:contentId",

    SUPER_ADMIN_EDIT_USER_CREATE_CONTENT_GROUP: "/super-admin/edit-user/:userId/group-content/create",
    SUPER_ADMIN_EDIT_USER_EDIT_CONTENT_GROUP: "/super-admin/edit-user/:userId/group-content/edit/:contentGroupId",

    SUPER_ADMIN_EDIT_USER_CREATE_BLACKLIST: "/super-admin/edit-user/:userId/blacklist/create",
    SUPER_ADMIN_EDIT_USER_EDIT_BLACKLIST: "/super-admin/edit-user/:userId/blacklist/edit/:blacklistId",

    SUPER_ADMIN_EDIT_USER_CREATE_OUR_GROUPS: "/super-admin/edit-user/:userId/our-groups/create",
    SUPER_ADMIN_EDIT_USER_EDIT_OUR_GROUPS: "/super-admin/edit-user/:userId/our-groups/edit/:ourGroupsId",

    SUPER_ADMIN_EDIT_USER_CREATE_BEHAVIOR: "/super-admin/edit-user/:userId/settings/behavior/create",
    SUPER_ADMIN_EDIT_USER_EDIT_BEHAVIOR: "/super-admin/edit-user/:userId/settings/behavior/edit/:behaviorId",

    SUPER_ADMIN_EDIT_USER_CREATE_BROWSER: "/super-admin/edit-user/:userId/settings/browser/create",
    SUPER_ADMIN_EDIT_USER_EDIT_BROWSER: "/super-admin/edit-user/:userId/settings/browser/edit/:browserId",

    SUPER_ADMIN_EDIT_USER_CREATE_PROXY: "/super-admin/edit-user/:userId/settings/proxy/create",
    SUPER_ADMIN_EDIT_USER_EDIT_PROXY: "/super-admin/edit-user/:userId/settings/proxy/edit/:proxyId",

    SUPER_ADMIN_EDIT_USER_CREATE_AUTOJOIN: "/super-admin/edit-user/:userId/settings/autojoin/create",
    SUPER_ADMIN_EDIT_USER_EDIT_AUTOJOIN: "/super-admin/edit-user/:userId/settings/autojoin/edit/:autojoinId",

    SUPER_ADMIN_EDIT_USER_CREATE_PINNED: "/super-admin/edit-user/:userId/settings/pinned/create",
    SUPER_ADMIN_EDIT_USER_EDIT_PINNED: "/super-admin/edit-user/:userId/settings/pinned/edit/:pinnedId",

    SUPER_ADMIN_EDIT_USER_CREATE_FOLLOWING: "/super-admin/edit-user/:userId/settings/following/create",
    SUPER_ADMIN_EDIT_USER_EDIT_FOLLOWING: "/super-admin/edit-user/:userId/settings/following/edit/:followingId",

    SUBSCRIPTIONS: "/subscriptions",

    UPER_ADMIN_EDIT_USER_CREATE_SUBSCRIPTIONS: "/super-admin/edit-user/:userId/subscriptions/create",
    SUPER_ADMIN_EDIT_USER_EDIT_SUBSCRIPTIONS: "/super-admin/edit-user/:userId/subscriptions/edit/:subscriptionId",
};

