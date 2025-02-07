import { useAction, useMutation } from "convex/react";
import {
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    Underline,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Highlighter,
    Strikethrough,
    Sparkles,
    Download,
} from "lucide-react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "../../../../../configs/AIModel";
import { toast } from "sonner";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { saveAs } from "file-saver";
import { Packer, Document, Paragraph } from "docx";

export default function EditorExtenstion({ editor }) {
    const { user } = useUser();
    const { fileId } = useParams();
    const searchAI = useAction(api.myAction.search);
    const saveNotes = useMutation(api.notes.AddNotes);

    const onAiClick = async () => {
        toast("AI Model is working on your query. Please wait...");
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            " "
        );

        const result = await searchAI({
            query: selectedText,
            fileId: fileId,
        });

        const unformattedAnswer = JSON.parse(result);

        let allUnformattedAnswer = "";
        unformattedAnswer &&
            unformattedAnswer.forEach((item) => {
                allUnformattedAnswer += item.pageContent;
            });

        const PROMPT = `For question: ${selectedText} and with the given content as answer, please give appropriate answer in HTML format. The answer content is: ${allUnformattedAnswer}`;

        const AIModelResult = await chatSession.sendMessage(PROMPT);
        console.log(AIModelResult.response.text());
        const finalAns = AIModelResult.response
            .text()
            .replaceAll("```", "")
            .replace("html", "");

        const allText = editor.getHTML();
        editor.commands.setContent(
            `${allText}<p><strong>Answer: </strong>${finalAns}</p>`
        );

        saveNotes({
            notes: editor.getHTML(),
            fileId: fileId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });
    };

    const generateDocx = () => {
        const content = editor.getText();
        const doc = new Document({
            sections: [
                {
                    children: [new Paragraph(content)],
                },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "document.docx");
        });
    };

    return (
        editor && (
            <div className="p-5">
                <div className="control-group">
                    <div className="button-group flex flex-wrap gap-2 items-center">
                        {/* Heading Buttons */}
                        {[1, 2, 3].map((level) => (
                            <button
                                key={level}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level })
                                        .run()
                                }
                                className={`transition-all ${
                                    editor.isActive("heading", { level })
                                        ? "text-blue-500"
                                        : "hover:text-blue-500"
                                }`}
                            >
                                {level === 1 && (
                                    <Heading1 className="w-5 h-5 md:w-6 md:h-6" />
                                )}
                                {level === 2 && (
                                    <Heading2 className="w-5 h-5 md:w-6 md:h-6" />
                                )}
                                {level === 3 && (
                                    <Heading3 className="w-5 h-5 md:w-6 md:h-6" />
                                )}
                            </button>
                        ))}

                        {/* Formatting Buttons */}
                        {[
                            { action: "toggleBold", icon: <Bold />, type: "bold" },
                            { action: "toggleItalic", icon: <Italic />, type: "italic" },
                            { action: "toggleUnderline", icon: <Underline />, type: "underline" },
                            { action: "toggleStrike", icon: <Strikethrough />, type: "strike" },
                            { action: "toggleHighlight", icon: <Highlighter />, type: "highlight" },
                            { action: "toggleCodeBlock", icon: <Code />, type: "codeBlock" },
                        ].map(({ action, icon, type }) => (
                            <button
                                key={action}
                                onClick={() =>
                                    editor.chain().focus()[action]().run()
                                }
                                className={`transition-all ${
                                    editor.isActive(type)
                                        ? "text-blue-500"
                                        : "hover:text-blue-500"
                                }`}
                            >
                                {React.cloneElement(icon, {
                                    className: "w-5 h-5 md:w-6 md:h-6",
                                })}
                            </button>
                        ))}

                        {/* List Buttons */}
                        {[
                            { action: "toggleBulletList", icon: <List />, type: "bulletList" },
                            { action: "toggleOrderedList", icon: <ListOrdered />, type: "orderedList" },
                        ].map(({ action, icon, type }) => (
                            <button
                                key={action}
                                onClick={() =>
                                    editor.chain().focus()[action]().run()
                                }
                                className={`transition-all ${
                                    editor.isActive(type)
                                        ? "text-blue-500"
                                        : " hover:text-blue-500"
                                }`}
                            >
                                {React.cloneElement(icon, {
                                    className: "w-5 h-5 md:w-6 md:h-6",
                                })}
                            </button>
                        ))}

                        {/* Alignment Buttons */}
                        {[
                            { align: "left", icon: <AlignLeft /> },
                            { align: "center", icon: <AlignCenter /> },
                            { align: "right", icon: <AlignRight /> },
                        ].map(({ align, icon }) => (
                            <button
                                key={align}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .setTextAlign(align)
                                        .run()
                                }
                                className={`transition-all ${
                                    editor.isActive({ textAlign: align })
                                        ? "text-blue-500"
                                        : " hover:text-blue-500"
                                }`}
                            >
                                {React.cloneElement(icon, {
                                    className: "w-5 h-5 md:w-6 md:h-6",
                                })}
                            </button>
                        ))}

                        {/* AI Assistant Button */}
                        <button
                            onClick={onAiClick}
                            className="hover:text-blue-500 transition-all"
                        >
                            <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        {/* Download Button */}
                        <button
                            onClick={generateDocx}
                            className="hover:text-blue-500 transition-all"
                        >
                            <Download className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
