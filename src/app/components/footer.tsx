'use client'
import React from 'react';

const Footer = () => {
    const date: Date = new Date()
    return (
        <footer className={"bg-zinc-50 border-t-2 border-t-zinc-100 text-center py-4"}>
            <small>
                &copy; {date.getFullYear()} Postify
            </small>
        </footer>
    );
};

export default Footer;