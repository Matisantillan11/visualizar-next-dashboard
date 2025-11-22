import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Authors",
        url: "/authors",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Books",
        url: "/books",
        icon: Icons.Table,
        items: [
          {
            title: "Books requests",
            url: "/books/requests",
          },
        ],
      },
      {
        title: "Categories",
        url: "/categories",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Courses",
        url: "/courses",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Institutions",
        icon: Icons.Table,
        url: "/institutions",
        items: [],
      },
      {
        title: "Users",
        icon: Icons.Table,
        items: [
          {
            title: "All users",
            url: "/users",
          },
          {
            title: "Students",
            url: "/users/students",
          },
          {
            title: "Teachers",
            url: "/users/teachers",
          },
        ],
      },
    ],
  },
];
