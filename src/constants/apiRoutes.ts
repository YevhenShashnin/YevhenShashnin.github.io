const superAdminPath = "/panel/users";

enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export interface BaseRoute {
    method: HttpMethod;
    url: string | ((...params: any[]) => string);
}

export type StaticRoute = BaseRoute & { url: string };
export type DynamicRoute<Params extends any[]> = BaseRoute & { url: (...params: Params) => string };

function createCrudRoutes(resource: string) {
    return {
        list: { method: HttpMethod.GET, url: `/${resource}` } as StaticRoute,
        getById: { method: HttpMethod.GET, url: (id: string) => `/${resource}/${id}` } as DynamicRoute<[string]>,
        create: { method: HttpMethod.POST, url: `/${resource}` } as StaticRoute,
        updateById: { method: HttpMethod.PUT, url: (id: string) => `/${resource}/${id}` } as DynamicRoute<[string]>,
        deleteById: { method: HttpMethod.DELETE, url: (id: string) => `/${resource}/${id}` } as DynamicRoute<[string]>,
    };
}

export const apiRoutes = {
    // AUTH
    auth: {
        register: { method: HttpMethod.POST, url: "/register" },
        forget: { method: HttpMethod.POST, url: "/reset-password-request" },
        login: { method: HttpMethod.POST, url: "/login" },
        logout: { method: HttpMethod.POST, url: "/logout" },
        refreshToken: { method: HttpMethod.POST, url: "/token/refresh" },
    },

    // STATISTICS
    statistics: {
        drops: { method: HttpMethod.GET, url: "/stats/drops" } as StaticRoute,
        followers: { method: HttpMethod.GET, url: "/stats/followers" } as StaticRoute,
        retweets: { method: HttpMethod.GET, url: "/stats/retweets" } as StaticRoute,
    },

    // ACCOUNT
    accounts: {
        ...createCrudRoutes("account"),
        switchToFollow: {
            method: HttpMethod.POST,
            url: (id: string) => `/account/${id}/switch-to-follow`,
        } as DynamicRoute<[string]>,
        pause: { method: HttpMethod.POST, url: (id: string) => `/account/${id}/pause` } as DynamicRoute<[string]>,
        restart: { method: HttpMethod.POST, url: (id: string) => `/account/${id}/restart` } as DynamicRoute<[string]>,
        getGroups: { method: HttpMethod.GET, url: (id: string) => `/account/${id}/groups` } as DynamicRoute<[string]>,
        getAll: { method: HttpMethod.GET, url: `/account/all` } as DynamicRoute<[string]>,
    },

    // BEHAVIOR
    behavior: {
        ...createCrudRoutes("behaviour"),
        getAll: { method: HttpMethod.GET, url: "/behaviour/all" } as StaticRoute,
    },

    // BROWSER
    browser: createCrudRoutes("browser"),

    // PROXY
    proxy: createCrudRoutes("proxy"),

    // CONTENT
    content: {
        ...createCrudRoutes("content"),
        getAll: { method: HttpMethod.GET, url: "/content/all" } as StaticRoute, // Additional route
    },

    // CONTENT GROUP
    contentGroup: {
        ...createCrudRoutes("content-group"),
        getAll: { method: HttpMethod.GET, url: "/content-group/all" } as StaticRoute, // Additional route
    },

    // BLACKLIST
    blacklist: createCrudRoutes("blacklist"),

    // GROUPS
    groups: {
        list: { method: HttpMethod.GET, url: "/group" } as StaticRoute,
        getById: { method: HttpMethod.GET, url: (id: string) => `/group/${id}` } as DynamicRoute<[string]>,
        getAll: { method: HttpMethod.GET, url: "/group/all" } as StaticRoute,
    },

    // OUR GROUPS
    ourGroups: {
        ...createCrudRoutes("our-group"),
        switchToRetweet: {
            method: HttpMethod.POST,
            url: (id: string) => `/our-group/${id}/switch-to-retweet`,
        } as DynamicRoute<[string]>,
        getAll: { method: HttpMethod.GET, url: "/our-group/all" } as StaticRoute,
    },

    // ACCOUNTS FOLLOWING
    accountsFollowing: {
        ...createCrudRoutes("account-follow"),
        switchToRetweet: {
            method: HttpMethod.POST,
            url: (id: string) => `/account-follow/${id}/switch-to-retweet`,
        } as DynamicRoute<[string]>,

        pause: {
            method: HttpMethod.POST,
            url: (id: string) => `/account-follow/${id}/pause`,
        } as DynamicRoute<[string]>,
        restart: {
            method: HttpMethod.POST,
            url: (id: string) => `/account-follow/${id}/restart`,
        } as DynamicRoute<[string]>,
    },

    // AUTOJOIN
    autojoin: createCrudRoutes("autojoin-settings"),

    // PINNED
    pinned: {
        ...createCrudRoutes("pinned-settings"),
        getAll: { method: HttpMethod.GET, url: "/pinned-settings/all" } as StaticRoute,
    },

    // FOLLOWING
    following: {
        ...createCrudRoutes("following-settings"),
        getAll: { method: HttpMethod.GET, url: "/following-settings/all" } as StaticRoute,
    },
    subscribtions: {
        plans: { method: HttpMethod.GET, url: "/subscription/plans" } as StaticRoute,
        active: { method: HttpMethod.GET, url: "/subscription/active" } as StaticRoute,
    },
} as const;

function createCrudRoutesSuperAdmin(resource: string) {
    return {
        list: {
            method: HttpMethod.GET,
            url: (userId: string) => `${superAdminPath}/${userId}/${resource}`,
        } as DynamicRoute<[string]>,
        getById: {
            method: HttpMethod.GET,
            url: ({ userId, id }: { userId: string; id: string }) => `${superAdminPath}/${userId}/${resource}/${id}`,
        } as DynamicRoute<[string, string]>,
        create: {
            method: HttpMethod.POST,
            url: (userId: string) => `${superAdminPath}/${userId}/${resource}`,
        } as DynamicRoute<[string]>,
        updateById: {
            method: HttpMethod.PUT,
            url: ({ userId, id }: { userId: string; id: string }) => `${superAdminPath}/${userId}/${resource}/${id}`,
        } as DynamicRoute<[string, string]>,
        deleteById: {
            method: HttpMethod.DELETE,
            url: ({ userId, id }: { userId: string; id: string }) => `${superAdminPath}/${userId}/${resource}/${id}`,
        } as DynamicRoute<[string, string]>,
    };
}

export const apiRoutesSuperAdmin = {
    users: {
        list: { method: HttpMethod.GET, url: superAdminPath } as StaticRoute,
        deleteById: {
            method: HttpMethod.DELETE,
            url: (id: string) => `${superAdminPath}/${id}`,
        } as DynamicRoute<[string]>,
        getById: {
            method: HttpMethod.GET,
            url: (id: string) => `${superAdminPath}/${id}`,
        } as DynamicRoute<[string]>,
        updateById: {
            method: HttpMethod.PUT,
            url: (id: string) => `${superAdminPath}/${id}`,
        } as DynamicRoute<[string]>,
        create: { method: HttpMethod.POST, url: superAdminPath } as StaticRoute,
    },
    // GROUPS
    groups: {
        list: {
            method: HttpMethod.GET,
            url: (id: string) => `${superAdminPath}/${id}/group`,
        } as DynamicRoute<[string]>,
        getAll: {
            method: HttpMethod.GET,
            url: (id: string) => `${superAdminPath}/${id}/group/all`,
        },
    },

    // ACCOUNTS
    accounts: {
        ...createCrudRoutesSuperAdmin("account"),
        getAll: {
            method: HttpMethod.GET,
            url: (userId: string) => `${superAdminPath}/${userId}/account/all`,
        } as DynamicRoute<[string]>,
        pause: {
            method: HttpMethod.POST,
            url: ({ userId, id }: { userId: string; id: string }) => `${superAdminPath}/${userId}/account/${id}/pause`,
        },
        restart: {
            method: HttpMethod.POST,
            url: ({ userId, id }: {
                userId: string;
                id: string
            }) => `${superAdminPath}/${userId}/account/${id}/restart`,
        },
    },

    // ACCOUNTS FOLLOWING
    accountsFollowing: {
        ...createCrudRoutesSuperAdmin("account-follow"),
        getAll: {
            method: HttpMethod.GET,
            url: (userId: string) => `${superAdminPath}/${userId}/account-follow/all`,
        } as DynamicRoute<[string]>,
    },

    // CONTENT
    content: {
        ...createCrudRoutesSuperAdmin("content"),
        getAll: {
            method: HttpMethod.GET,
            url: (userId: string) => `${superAdminPath}/${userId}/content/all`,
        } as DynamicRoute<[string]>,
    },

    // CONTENT GROUP
    contentGroup: {
        ...createCrudRoutesSuperAdmin("content-group"),
        getAll: {
            method: HttpMethod.GET,
            url: (userId: string) => `${superAdminPath}/${userId}/content-group/all`,
        } as DynamicRoute<[string]>,
    },

    // BLACKLIST
    blacklist: {
        ...createCrudRoutesSuperAdmin("blacklist"),
    },

    // OUR GROUPS
    ourGroups: {
        ...createCrudRoutesSuperAdmin("our-group"),
        getAll: {
            method: HttpMethod.GET,
            url: (userId: string) => `${superAdminPath}/${userId}/our-group/all`,
        },
    },

    // BEHAVIOR
    behavior: {
        ...createCrudRoutesSuperAdmin("behaviour"),
    },

    // BROWSER
    browser: {
        ...createCrudRoutesSuperAdmin("browser"),
    },

    // PROXY
    proxy: {
        ...createCrudRoutesSuperAdmin("proxy"),
    },

    // AUTOJOIN
    autojoin: {
        ...createCrudRoutesSuperAdmin("autojoin-settings"),
    },

    // PINNED
    pinned: {
        ...createCrudRoutesSuperAdmin("pinned-settings"),
    },

    // FOLLOWING
    following: {
        ...createCrudRoutesSuperAdmin("following-settings"),
    },

    // SUBSCRIPTIONS
    subscriptions: {
        ...createCrudRoutesSuperAdmin("subscriptions"),
        listActive: {
            method: HttpMethod.GET,
            url: (userId: string) => `${superAdminPath}/${userId}/subscriptions/active`,
        },
        listExpired: {
            method: HttpMethod.GET,
            url: (userId: string) => `${superAdminPath}/${userId}/subscriptions/expired`,
        },
    },
} as const;