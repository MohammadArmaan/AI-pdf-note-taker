"use client";

import { useState, useEffect } from "react";
import { EditorContent } from "@tiptap/react";
import EditorExtenstion from "./EditorExtensions";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export default function TextEditor({ fileId, editor }) {
    const [isMounted, setIsMounted] = useState(false);
    const notes = useQuery(api.notes.getNotes, {
        fileId: fileId,
    });

    // const editor = useEditor({
    //     extensions: [
    //         StarterKit,
    //         Placeholder.configure({
    //             placeholder: "Start taking your notes here...",
    //             emptyEditorClass:
    //                 "before:content-[attr(data-placeholder)] before:text-gray-400 before:absolute before:pointer-events-none",
    //         }),
    //         Underline,
    //         Heading.configure({ levels: [1, 2, 3] }),
    //         BulletList,
    //         OrderedList,
    //         ListItem,
    //         TextAlign.configure({ types: ["heading", "paragraph"] }),
    //         Highlight.configure({ multicolor: true }),
    //         Strike,
    //     ],
    //     content: "",
    //     editorProps: {
    //         attributes: {
    //             class: "focus:outline-none h-screen p-5",
    //         },
    //     },
    //     editorViewOptions: {
    //         immediatelyRender: false,
    //     },
    // });

    useEffect(() => {
        editor && editor.commands.setContent(notes);
        setIsMounted(true);
    }, [notes && editor]);

    if (!isMounted || !editor) return null;

    return (
        <div>
            <EditorExtenstion editor={editor} />
            <div className="overflow-scroll h-[88vh]">
                <EditorContent editor={editor} className="prose max-w-none" />
            </div>
        </div>
    );
}
