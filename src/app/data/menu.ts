export type MenuItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

export const menu: MenuItem[] = [
    {
        id: 1,
        name: "Margherita",
        description: "Classic pizza with tomato sauce",
        price: 8.99,
        image: "/images/margherita.jpg"
    },
    {
        id: 2,
        name: "Pepperoni",
        description: "Tomato sauce, mozarella, and pepperoni",
        price: 10.99,
        image: "/images/pepperoni.jpg"
    },
    {
        id: 3,
        name: "Vegeteriana",
        description: "Mozzarella and vegetables",
        price: 9.5,
        image: "/images/vegetariana.jpg"
    },
];