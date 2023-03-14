import { create_project, dashboard, logging_out, payment, profile, withdraw } from '../assets';

export const navlinks = [
    {
        name: 'dashboard',
        imgUrl: dashboard,
        link: '/',
    },
    {
        name: 'project',
        imgUrl: create_project,
        link: '/create_project',
    },
    {
        name: 'payment',
        imgUrl: payment,
        link: '/',
        disabled: true,
    },
    {
        name: 'withdraw',
        imgUrl: withdraw,
        link: '/',
        disabled: true,
    },
    {
        name: 'profile',
        imgUrl: profile,
        link: '/profile',
    },
    {
        name: 'logging_out',
        imgUrl: logging_out,
        link: '/',
        disabled: true,
    },
];