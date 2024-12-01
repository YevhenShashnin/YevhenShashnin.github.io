const SUPER_ADMIN_EDIT = "/super-admin/edit-user";

/**
 * Creates standard CRUD routes for a given base path.
 * @param basePath - The base path for the routes (e.g., 'accounts', 'content').
 * @returns An object containing the LIST, CREATE, and EDIT routes.
 */
function createCrudRoutes(basePath: string) {
    return {
        LIST: `/${basePath}`,
        CREATE: `/${basePath}/create`,
        EDIT: `/${basePath}/edit/:id`,
        ITEM: `${basePath}/:id`,
    };
};

/**
 * Creates standard CRUD routes for a given base path.
 * @param basePath - The base path for the routes (e.g., 'accounts', 'content').
 * @returns An object containing the LIST, CREATE, and EDIT routes.
 */
function createSuperAdminRoutes(basePath: string) {
    const routes = {
        CREATE: `${SUPER_ADMIN_EDIT}/:userId/${basePath}/create`,
        EDIT: `${SUPER_ADMIN_EDIT}/:userId/${basePath}/edit/:id`,
        ITEM: `${SUPER_ADMIN_EDIT}/:userId/${basePath}/:id`,
    };
    return routes;
}

export const ROUTES = {
    AUTH: {
        LOGIN: "/login",
        HOME: "/",
        FORGOT_PASSWORD: "/reset-password",
        CONFIRM_REGISTER: "/confirm-registration",
    },
    HOME: "/",
    HELP: "/help",
    ACCOUNTS: createCrudRoutes("accounts"),
    ACCOUNTS_FOLLOWING: createCrudRoutes("acc-following"),
    BLACKLIST: createCrudRoutes("blacklist"),

    CONTENT: createCrudRoutes("content"),
    CONTENT_GROUP: createCrudRoutes("group-content"),
    GROUPS: {
        LIST: "/groups",
        ITEM: "/groups/:id",
    },
    OUR_GROUPS: createCrudRoutes("our-groups"),

    BEHAVIOR: createCrudRoutes("behavior"),
    BROWSER: createCrudRoutes("browser"),
    PROXY: createCrudRoutes("proxy"),
    AUTOJOIN: createCrudRoutes("autojoin"),
    FOLLOWING: createCrudRoutes("following"),
    PINNED: createCrudRoutes("pinned"),
    SUBSCRIPTION: { LIST: "/subscriptions" },

    // Super Admin Routes
    SUPER_ADMIN: {
        BASE: "/super-admin",
        EDIT: "/super-admin/edit-user/:userId/:slug?/:settings?",
        ACCOUNTS: createSuperAdminRoutes("accounts"),
        ACCOUNTS_FOLLOWING: createSuperAdminRoutes("acc-following"),
        CONTENT: createSuperAdminRoutes("content"),
        CONTENT_GROUP: createSuperAdminRoutes("group-content"),
        BLACKLIST: createSuperAdminRoutes("blacklist"),
        OUR_GROUPS: createSuperAdminRoutes("our-group"),
        GROUPS: createSuperAdminRoutes("groups"),
        BEHAVIOR: createSuperAdminRoutes("settings/behavior"),
        BROWSER: createSuperAdminRoutes("settings/browser"),
        PROXY: createSuperAdminRoutes("settings/proxy"),
        AUTOJOIN: createSuperAdminRoutes("settings/autojoin"),
        PINNED: createSuperAdminRoutes("settings/pinned"),
        FOLLOWING: createSuperAdminRoutes("settings/following"),
        SUBSCRIPTIONS: createSuperAdminRoutes("settings/subscriptions"),
    },
};
