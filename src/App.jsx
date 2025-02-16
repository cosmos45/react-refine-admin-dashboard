import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { GraphQLClient } from "@refinedev/nestjs-query";
import { useNotificationProvider, } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { dataProvider, liveProvider, authProvider } from "./providers/";
import { Home, ForgotPassword, Login, Register } from "./pages";
import Layout from "./components/layout";
import routerBindings, { CatchAllNavigate, DocumentTitleHandler, UnsavedChangesNotifier, } from "@refinedev/react-router-v6";
import { App as AntdApp, } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import React from "react";
import { resources } from "@/config/resources";
import CompanyList from "@/pages/company/list";
import Create from "@/pages/company/create";
import EditPage from "@/pages/company/edit";
import TaskList from "@/pages/tasks/task_list";
import CreateTask from "@/pages/tasks/create";
import EditTask from "@/pages/tasks/edit";
// import { ForgotPassword } from "./pages/forgotPassword";
// import { Login } from "./pages/login";
// import { Register } from "./pages/register";
const API_URL = "https://api.nestjs-query.refine.dev/graphql";
const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";
const gqlClient = new GraphQLClient(API_URL);
const wsClient = createClient({ url: WS_URL });
function App() {
    return (<BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine dataProvider={dataProvider} liveProvider={liveProvider} notificationProvider={useNotificationProvider} routerProvider={routerBindings} authProvider={authProvider} resources={resources} options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "d90JCO-X5qaIT-1ddwLT",
            liveMode: "auto",
        }}>
                <Routes>
                  {/* <Route index element={<WelcomePage />} /> */}

                  <Route path="/register" element={<Register />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/forgot-password " element={<ForgotPassword />}/>

                  <Route element={<Authenticated key="authenticated-layout" fallback={<CatchAllNavigate to="/login"/>}>
                          <Layout>
                            <Outlet />





                          </Layout>

                      </Authenticated>}>
                    <Route index element={<Home />}/>
                      <Route path="/companies">
                          <Route index element={<CompanyList />}/>
                          <Route path="new" element={<Create />}/>
                          <Route path="edit/:id" element={<EditPage />}/>
                      </Route>
                      <Route path="/tasks" element={<TaskList>
                                  <Outlet />
                              </TaskList>}>
                          <Route path="new" element={<CreateTask />}/>
                          <Route path="edit/:id" element={<EditTask />}/>
                      </Route>

                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>);
}
export default App;
