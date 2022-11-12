import { MenuItemOption } from "./MenuItemOption";

export type MenuItem = {
  id: string;
  title: string;
  hide?: boolean;
  icon: string;
  options: MenuItemOption[];
};
