import { MenuOption } from "./MenuOption";

export interface Module {
    title: string;
    description: string;
    icon: React.ReactNode;
    backgroundColor: string;
    link: string;
    menuOptions?: MenuOption[];
    role: string;
}
