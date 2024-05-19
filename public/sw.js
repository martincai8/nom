self.addEventListener("install", function (event) {
    console.log("sw.js installed lfg");
	self.skipWaiting();
});

self.addEventListener('push', function(event) {
	console.log('Push received');
    
	let title = 'Notif';
	const options = {
		body: 'Notif body.',
		icon: './images/logo-192x192.png',
		badge: './images/badge-72x72.png',
		data: {
			url: 'https://nom-nu.vercel.app/',
		},
	};

	if (event.data) {
		const dataText = event.data.text();
		const data = JSON.parse(dataText);

        switch (event.data.type) {
            case 'booked':
                title = "Reservation made!"
                options.body = "Reservations have been made for 3 at xyz"
            default:
                title = "Get ready to eat!"
                options.body = data?.body;
				options.data.url = `https://nom-nu.vercel.app/alerts/${data?.visitId}`
        }
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