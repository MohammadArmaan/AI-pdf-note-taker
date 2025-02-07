"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ setIsSidebarOpen }) {
    const path = usePathname();
    const { user } = useUser();
    const fileList = useQuery(api.fileStorage.getUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    const getUserInfo = useQuery(api.user.getUserInfo, {
        userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    return (
        <div className="shadow-md h-screen p-7">
            <Link href={"/"}>
                <Image
                    src={"/logo.svg"}
                    height={120}
                    width={120}
                    alt="Logo"
                    priority
                />
            </Link>
            <div className="mt-10">
                <UploadPdfDialog
                    isMaxFile={
                        fileList?.length >= 5 && !getUserInfo.upgrade
                            ? true
                            : false
                    }
                    setIsSidebarOpen={setIsSidebarOpen}
                >
                    <Button className="w-full">+ Upload PDF</Button>
                </UploadPdfDialog>

                <Link href={"/dashboard"}>
                    <div
                        className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer ${path === "/dashboard" && "bg-slate-200"}`}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <Layout />
                        <h2>Workspace</h2>
                    </div>
                </Link>
                <Link href={"/dashboard/upgrade"}>
                    <div
                        className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer ${path === "/dashboard/upgrade" && "bg-slate-200"}`}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <Shield />
                        <h2>Upgrade</h2>
                    </div>
                </Link>
            </div>
            {!getUserInfo?.upgrade && (
                <div className="absolute bottom-24 w-[80%]">
                    <Progress value={(fileList?.length / 5) * 100} />
                    <p className="text-sm mt-1">
                        {fileList?.length} out of 5 Pdf Uploaded
                    </p>
                    <p className="text-sm mt-2 text-gray-400">
                        Upgrade to Upload more PDF
                    </p>
                </div>
            )}
        </div>
    );
}
