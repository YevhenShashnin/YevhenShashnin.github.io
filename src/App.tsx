import React, {lazy} from "react";
import {ThemeProvider} from "@/components/theme-provider";
import Layout_ from "@/layouts/Layout_";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import {BrowserRouter as Router, Routes, Route, RouteProps} from "react-router-dom";

const Dashboard = lazy(() => import("@/modules/fanat/Dashboard/Dashboard"));
const Campaign = lazy(() => import("@/modules/fanat/Campaign/Campaign"));

function App() {
    return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout_>
            <Router>
                <ErrorBoundary>
                    <Routes>
                        <Route path={'/'} element={<Dashboard/>}/>
                        <Route path={'/campaign'} element={<Campaign/>}/>
                    </Routes>
                </ErrorBoundary>
            </Router>
        </Layout_>
    </ThemeProvider>;
}

export default App;
