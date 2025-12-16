import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "Menu",
    items: [
      {
        title: "Autores",
        url: "/authors",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Libros",
        icon: Icons.Table,
        items: [
          {
            title: "Todos los libros",
            url: "/books",
          },
          {
            title: "Solicitudes de libros",
            url: "/books/requests",
          },
        ],
      },
      {
        title: "Categorias",
        url: "/categories",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Cursos",
        url: "/courses",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Instituciones",
        icon: Icons.Table,
        url: "/institutions",
        items: [],
      },
      {
        title: "Usuarios",
        icon: Icons.Table,
        items: [
          {
            title: "Todos los usuarios",
            url: "/users",
          },
          {
            title: "Estudiantes",
            url: "/users/students",
          },
          {
            title: "Profesores",
            url: "/users/teachers",
          },
        ],
      },
    ],
  },
];
