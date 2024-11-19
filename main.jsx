
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Taskmanager from './Taskmanager.jsx'
import Edit from './Edit.jsx'

const router = createBrowserRouter([
    {
        path :'/',
        element: <App/>,
        children:[

            {
                path : '',
                element: <Taskmanager/>
            },
            {
                path : 'Edit/:id',
                element: <Edit/>
            },

        ]
    }
])

createRoot(document.getElementById('root')).render(
 
    <RouterProvider router={router} />
)
