import { HeaderLink } from "../../../types/HeaderLink";
import { MenuItem } from "../../../types/MenuItem";
import generateUniqueId from "../../../util/generateUniqueId";

export const menuItems: MenuItem[] = [
  {
    id: generateUniqueId(),
    title: "",
    hide: true,
    icon: "",
    options: [
      {
        id: generateUniqueId(),
        title: "Dashboard",
        icon: "/img/icons/home.svg",
        children: [],
        link: "/dashboard/superAdmin/",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "other",
    icon: "",
    options: [
      {
        id: generateUniqueId(),
        title: "Profile",
        icon: "/img/icons/user.svg",
        children: [],
        link: "/profile",
      },
      {
        id: generateUniqueId(),
        title: "Logout",
        icon: "/img/icons/home.svg",
        children: [],
        link: "/logout",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Apps & Pages",
    icon: "",
    options: [
      {
        id: generateUniqueId(),
        title: "Email",
        icon: "/img/icons/email.svg",
        children: [],
        link: "",
      },
      {
        id: generateUniqueId(),
        title: "Chat",
        icon: "/img/icons/chat.svg",
        children: [],
        link: "",
      },
      {
        id: generateUniqueId(),
        title: "Todo",
        icon: "/img/icons/todo.svg",
        children: [],
        link: "",
      },
      {
        id: generateUniqueId(),
        title: "Calender",
        icon: "/img/icons/calender.svg",
        children: [],
        link: "",
      },
      {
        id: generateUniqueId(),
        title: "Kanban",
        icon: "/img/icons/kanban.svg",
        children: [],
        link: "",
      },
      {
        id: generateUniqueId(),
        title: "Invoice",
        icon: "/img/icons/invoice.svg",
        children: [],
        link: "",
      },
      {
        id: generateUniqueId(),
        title: "Roles & Permissions",
        icon: "/img/icons/permissions.svg",
        children: [],
        link: "/dashboard/superAdmin/roles",
      },
      {
        id: generateUniqueId(),
        title: "Plans",
        icon: "/img/icons/permissions.svg",
        children: [],
        link: "/dashboard/superAdmin/plans",
      },
      {
        id: generateUniqueId(),
        title: "Restaurants",
        icon: "/img/icons/calender.svg",
        children: [],
        link: "/dashboard/superAdmin/restaurants",
      },
      {
        id: generateUniqueId(),
        title: "User",
        icon: "/img/icons/user.svg",
        children: [],
        link: "",
      },
      {
        id: generateUniqueId(),
        title: "Authentication",
        icon: "/img/icons/authentication.svg",
        children: [
          {
            id: generateUniqueId(),
            title: "Login",
            icon: "",
            children: [],
            link: "",
          },
          {
            id: generateUniqueId(),
            title: "Register",
            icon: "",
            children: [],
            link: "",
          },
        ],
        link: "",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Statistics",
    icon: "",
    options: [
      {
        id: generateUniqueId(),
        title: "Charts",
        icon: "/img/icons/charts.svg",
        children: [],
        link: "",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "MISC",
    icon: "",
    options: [
      {
        id: generateUniqueId(),
        title: "Documentaion",
        icon: "/img/icons/documentation.svg",
        children: [],
        link: "",
      },
      {
        id: generateUniqueId(),
        title: "Raise Support",
        icon: "/img/icons/raise-support.svg",
        children: [],
        link: "",
      },
    ],
  },
];

export const headerLinks: HeaderLink[] = [
  {
    id: generateUniqueId(),
    title: "Email",
    icon: "/img/icons/email.svg",
    link: "",
  },
  {
    id: generateUniqueId(),
    title: "Chat",
    icon: "/img/icons/chat.svg",
    link: "",
  },
  {
    id: generateUniqueId(),
    title: "Todo",
    icon: "/img/icons/todo.svg",
    link: "",
  },
];
