export type MenuItemOption = {
  id: string;
  title: string;
  hide?: boolean;
  icon: string;
  link: string;
  children: MenuItemOption[];
};
