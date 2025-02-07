import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function WorkspaceHeader({ fileName, editor }) {
    const { fileId } = useParams();
    const { user } = useUser();

    const saveNotes = useMutation(api.notes.AddNotes);

    const saveHandler = () => {
        if (!editor) return;

        saveNotes({
            notes: editor.getHTML(),
            fileId: fileId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });
    };

    return (
        <div className="p-4 flex justify-between shadow-md items-center">
            <Link href={"/"}>
                <Image
                    src={"/logo.svg"}
                    height={120}
                    width={120}
                    alt="Logo"
                    priority
                />
            </Link>
            <h2 className="font-semibold hidden sm:block">{fileName}</h2>
            <div className="flex gap-2 items-center">
                <Button onClick={saveHandler}>Save</Button>
                <UserButton />
            </div>
        </div>
    );
}
