import React, { lazy } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Layout_ from '@/layouts/Layout_';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    RouteProps,
} from 'react-router-dom';
import Dashboard from '@/modules/fanat/Dashboard/Dashboard';
import Campaign from '@/modules/fanat/Campaign/Campaign';
import CampaignLink from '@/modules/fanat/Campaign/pages/CampaignLink';
import Stories from '@/modules/fanat/Stories/Stories';
import AddStory from '@/modules/fanat/Stories/AddStory';
import AddPost from '@/modules/fanat/Posts/AddPost';
// const Dashboard = lazy(() => import("@/modules/fanat/Dashboard/Dashboard"));
// const Campaign = lazy(() => import("@/modules/fanat/Campaign/Campaign"));

function App() {
    const [route, setShowRoute] = React.useState({
        dashboard: true,
        campaign: false,
        addStory: false,
        addPost: false,
        link: false,
    });
    const routeHandler = (route: string) => {
        if (!route) return;
        setShowRoute({
            dashboard: route === 'dashboard',
            campaign: route === 'campaign',
            addStory: route === 'addStory',
            addPost: route === 'addPost',
            link: route === 'link',
        });
    }
    return (
        <Router>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Layout_ onClick={routeHandler}>
                    {/*<Router>*/}
                    {/*    <ErrorBoundary>*/}
                    {/*        <Routes>*/}

                    {/*<Route path={'/'} element={<Dashboard/>}/>*/}
                    {/*<Route path={'/campaign'} element={<Campaign/>}/>*/}
                    {/*        </Routes>*/}
                    {/*    </ErrorBoundary>*/}
                    {/*</Router>*/}
                    {route.dashboard && <Dashboard />}
                    {route.campaign && <Campaign />}
                    {route.addStory && <AddStory />}
                    {route.addPost && <AddPost />}
                    {route.link && <CampaignLink />}
                </Layout_>
                {/*<CampaignLink/>*/}
            </ThemeProvider>
        </Router>
    );
}

export default App;
