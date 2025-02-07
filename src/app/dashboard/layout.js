"use client";
import { useState } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex">
            <div
                className={`fixed inset-y-0 left-0 z-50 h-screen bg-white shadow-lg transition-transform ${
                    isSidebarOpen
                        ? "translate-x-0 w-1/2 z-[1000]"
                        : "-translate-x-full"
                } md:translate-x-0 md:w-64`}
            >
                <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            <div className="flex-1 md:ml-64">
                <Header
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <div className="p-10">{children}</div>
            </div>


            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
