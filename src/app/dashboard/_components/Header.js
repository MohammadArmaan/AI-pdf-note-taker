import { Menu } from "lucide-react"; 
import { UserButton } from "@clerk/nextjs";

export default function Header({ toggleSidebar }) {
    return (
        <header className="p-5 shadow-sm flex items-center justify-between bg-white lg:justify-end">
            <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-full hover:bg-gray-200"
            >
                <Menu size={24} />
            </button>

            <UserButton />
        </header>
    );
}
