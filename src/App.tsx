import React, {lazy} from "react";
import {ThemeProvider} from "@/components/theme-provider";
import Layout_ from "@/layouts/Layout_";

const Dashboard = lazy(() => import("@/modules/Dashboard_/Dashboard"));


function App() {
    return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout_>
            <Dashboard/>
        </Layout_>
    </ThemeProvider>;
}

export default App;
