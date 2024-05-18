self.addEventListener("install", function (event) {
    console.log("sw.js installed lfg");
	self.skipWaiting();
});

self.addEventListener('push', function(event) {
	console.log('Push received');
    
	let title = 'Hello';
	const options = {
		body: 'Thanks for sending this push msg.',
		icon: './images/logo-192x192.png',
		badge: './images/badge-72x72.png',
		data: {
			url: 'https://nom-nu.vercel.app/',
		},
	};

	if (event.data) {
		const dataText = event.data.text();
		title = 'payload received';
		options.body = `data: '${dataText}'`;
	}

	event.waitUntil(
		self.registration.showNotification(
			title,
			options,
		),
	);
});

self.addEventListener('notificationclick', function(event) {
	console.log('Notification clicked.');
	event.notification.close();

	let clickResponsePromise = Promise.resolve();
	if (event.notification.data && event.notification.data.url) {
		clickResponsePromise = clients.openWindow(event.notification.data.url);
	}

	event.waitUntil(clickResponsePromise);
});