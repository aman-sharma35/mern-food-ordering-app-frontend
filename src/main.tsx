import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css';
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0providerWithNavigate from './auth/Auth0ProviderWithNavigate';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';


//by default react query will fetch all the queries again anytime the user has clicked away from their Chrome window and decides to come back so this can sometimes be a nice feature but for development it can be a bit tricky because so it triggers if you click on your devb tools and then click on the window again so it sometimes causes us to lose data so turning it off is a good idea for development once we've created the query client we need to pass it to our components down
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      {/* we're just wrapping our entire app in a query provider so that all the components can get access to the query provider stuff that react query gives */}
      <QueryClientProvider client={queryClient}>
        <Auth0providerWithNavigate>
          <AppRoutes />
          <Toaster visibleToasts={1} position='top-right' richColors/>
        </Auth0providerWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
