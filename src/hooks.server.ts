import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { dev } from '$app/environment';

const handleAuthentication: Handle = async ({ event, resolve }) => {
	const authHeader = event.request.headers.get('X-MS-CLIENT-PRINCIPAL-NAME');
	if (authHeader) {
		event.locals.userId = authHeader;
	} else {
		if (dev) {
			event.locals.userId = 'devUserId';
		}
	}
	return resolve(event);
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

export const handle: Handle = sequence(handleAuthentication, handleParaglide);
