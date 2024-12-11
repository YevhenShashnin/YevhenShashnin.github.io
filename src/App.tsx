import React, {lazy} from "react";
import {ThemeProvider} from "@/components/theme-provider";
import Layout_ from "@/layouts/Layout_";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import {BrowserRouter as Router, Routes, Route, RouteProps} from "react-router-dom";
import Dashboard from "@/modules/fanat/Dashboard/Dashboard";
import Campaign from "@/modules/fanat/Campaign/Campaign";
// const Dashboard = lazy(() => import("@/modules/fanat/Dashboard/Dashboard"));
// const Campaign = lazy(() => import("@/modules/fanat/Campaign/Campaign"));

function App() {
    const [showDashboard, setShowDashboard] = React.useState(true);
    return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout_>
            {/*<Router>*/}
            {/*    <ErrorBoundary>*/}
            {/*        <Routes>*/}

                        {/*<Route path={'/'} element={<Dashboard/>}/>*/}
                        {/*<Route path={'/campaign'} element={<Campaign/>}/>*/}
            {/*        </Routes>*/}
            {/*    </ErrorBoundary>*/}
            {/*</Router>*/}
            <button onClick={() => setShowDashboard((prev) => !prev)}>Toggle</button>
            {showDashboard ? <Dashboard/> : <Campaign/>}
        </Layout_>
    </ThemeProvider>;
}

export default App;
