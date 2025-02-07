"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

export default function UploadPdfDialog({
    children,
    isMaxFile,
    setIsSidebarOpen,
}) {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);

    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);
    const embededDocument = useAction(api.myAction.ingest);

    const { user } = useUser();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [open, setOpen] = useState(false);

    const onFileSelect = (event) => {
        setFile(event.target.files[0]);
    };
    const onUpload = async () => {
        setLoading(true);
        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();

        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });
        const { storageId } = await result.json();
        const fileId = uuid4();
        const fileUrl = await getFileUrl({ storageId });

        // Step 3: Save the newly allocated storage id to the database
        const response = await addFileEntry({
            fileId: fileId,
            storageId: storageId,
            fileName: fileName ?? "Untitled File",
            fileUrl: fileUrl,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });

        // API call to fetch PDF processed data
        const apiResp = await axios.get(`/api/pdf-loader?pdfUrl=${fileUrl}`);
        console.log(apiResp.data.result);
        const embededResult = embededDocument({
            splitText: apiResp.data.result,
            fileId: fileId,
        });
        console.log(embededResult);
        setLoading(false);
        setOpen(false);
        setFileName("");

        toast("File is ready...");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => {
                        setOpen(true);
                        setIsSidebarOpen(false);
                    }}
                    className="w-full"
                    disabled={isMaxFile}
                >
                    +Upload PDF
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Pdf File</DialogTitle>
                    <DialogDescription asChild>
                        <div className="">
                            <h2 className="mt-2">Select a file to Upload</h2>
                            <div className="gap-2 p-3 rounded-md border">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => onFileSelect(e)}
                                />
                            </div>
                            <div className="mt-2">
                                <label>File Name *</label>
                                <Input
                                    placeholder="File Name"
                                    value={fileName}
                                    onChange={(e) =>
                                        setFileName(e.target.value)
                                    }
                                    className="text-black"
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={onUpload} disabled={loading}>
                        {loading ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            "Upload"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
