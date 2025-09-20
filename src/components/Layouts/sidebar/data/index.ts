import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
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
            title: "Authors",
            url: "/users/authors",
          },
          {
            title: "Students",
            url: "/users/students",
          },
        ],
      },
    ],
  },
];
