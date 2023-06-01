import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom"
import { App } from './App'
import { QueryClientProvider } from "react-query"
import { queryClient } from "./api"
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/700.css'
import "./theme/main.scss"
import "./theme/variables.scss"
import 'react-tooltip/dist/react-tooltip.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)
root.render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
)
