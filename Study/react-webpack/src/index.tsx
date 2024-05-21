import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 2000,
			retry: 0,
		},
	},
});
root.render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('Service Worker registered:', registration);
			})
			.catch((error) => {
				console.error('Service Worker registration failed:', error);
			});
	});
}

// window.addEventListener('beforeinstallprompt', (event) => {
// 	// Prevent Chrome 67 and earlier from automatically showing the prompt
// 	event.preventDefault();
// 	// Stash the event so it can be triggered later
// 	deferredPrompt = event;
// 	// Update UI notify the user they can add to home screen
// 	showInstallPromotion();
// });
