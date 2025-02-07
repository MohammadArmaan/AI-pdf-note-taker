import { Loader2 } from "lucide-react";

export default function PdfViewer({ fileUrl }) {
    if (!fileUrl) {
        return (
            <div className="flex items-center justify-center h-[90vh] bg-gray-100 text-gray-500">
                <Loader2 className="animate-spin" size={64} />
            </div>
        );
    }

    return (
        <div className="relative w-full h-full min-h-[400px]">
            <iframe
                src={`${fileUrl}#toolbar=0`}
                className="w-full h-[90vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh]"
            />
        </div>
    );
}
