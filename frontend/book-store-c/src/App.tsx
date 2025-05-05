import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/common/Error'
import ToastContainer from './components/common/toast/ToastContainer'
import Layout from './components/layout/Layout'
import { BookStoreThemeProvider } from './context/themeContext'
import BookDetail from './pages/BookDetail'
import Books from './pages/Books'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Order from './pages/Order'
import OrderList from './pages/OrderList'
import ResetPassword from './pages/ResetPassword'
import Signup from './pages/Signup'

const queryClient = new QueryClient()

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'books',
    element: <Books />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'reset',
    element: <ResetPassword />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'books',
    element: <Books />,
  },
  {
    path: 'books/:bookId',
    element: <BookDetail />,
  },
  {
    path: 'cart',
    element: <Cart />,
  },
  {
    path: 'order',
    element: <Order />,
  },
  {
    path: 'orderList',
    element: <OrderList />,
  },
]

const newRouteList = routeList.map((item) => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: <Error />,
  }
})

const router = createBrowserRouter(newRouteList)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  )
}

export default App
