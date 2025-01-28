import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import GuestLayout from "@/Layouts/GuestLayout.jsx";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const Layout = props.initialPage.props.layout === 'AuthenticatedLayout' ? AuthenticatedLayout : GuestLayout;

        root.render(
            <Layout auth={props.initialPage.props.auth}>
                <App {...props} />
            </Layout>
            );
    },
    progress: {
        color: '#4B5563',
    },
});
