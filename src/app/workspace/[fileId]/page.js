"use client";
import { useParams } from "next/navigation";
import WorkspaceHeader from "./_components/WorkspaceHeader";
import PdfViewer from "./_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import TextEditor from "./_components/TextEditor";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";

export default function Workspace() {
    const { fileId } = useParams();
    const fileInfo = useQuery(api.fileStorage.getFileRecord, {
        fileId: fileId,
    });
        const editor = useEditor({
            extensions: [
                StarterKit,
                Placeholder.configure({
                    placeholder: "Start taking your notes here...",
                    emptyEditorClass:
                        "before:content-[attr(data-placeholder)] before:text-gray-400 before:absolute before:pointer-events-none",
                }),
                Underline,
                Heading.configure({ levels: [1, 2, 3] }),
                BulletList,
                OrderedList,
                ListItem,
                TextAlign.configure({ types: ["heading", "paragraph"] }),
                Highlight.configure({ multicolor: true }),
                Strike,
            ],
            content: "",
            editorProps: {
                attributes: {
                    class: "focus:outline-none h-screen p-5",
                },
            },
            editorViewOptions: {
                immediatelyRender: false,
            },
        });

    const fileUrl = fileInfo?.[0]?.fileUrl ?? null;
    const fileName = fileInfo?.[0]?.fileName ?? null;
    return (
        <div>
            <WorkspaceHeader fileName={fileName} editor={editor} />
            <div className="grid lg:grid-cols-2 gap-5 md:grid-cols-1">
                <div className="order-2 lg:order-none">
                    <TextEditor fileId={fileId} editor={editor} />
                </div>

                <div className="order-1 lg:order-none">
                    <PdfViewer fileUrl={fileUrl} />
                </div>
            </div>
        </div>
    );
}
