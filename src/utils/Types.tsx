export type ProductVariant = {
    id: number;
    product_id: number;
    title: string;
    price: string;
};

export type ProductImage = {
    id: number;
    product_id: number;
    src: string;
};

export type Product = {
    id: number;
    title: string;
    variants: ProductVariant[];
    image: ProductImage;
    isShow?: boolean
};

export interface ShowProduct {
    productName: string,
    product: Product
}

export const ProductList: Product[] = [
    {
        id: 77,
        title: "Fog Linen Chambray Towel - Beige Stripe",
        variants: [
            {
                id: 1,
                product_id: 77,
                title: "XS / Silver",
                price: "49",
            },
            {
                id: 2,
                product_id: 77,
                title: "S / Silver",
                price: "49",
            },
            {
                id: 3,
                product_id: 77,
                title: "M / Silver",
                price: "49",
            },
        ],
        image: {
            id: 266,
            product_id: 77,
            src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
        },
    },
    {
        id: 80,
        title: "Orbit Terrarium - Large",
        variants: [
            {
                id: 64,
                product_id: 80,
                title: "Default Title",
                price: "109",
            },
        ],
        image: {
            id: 272,
            product_id: 80,
            src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
        },
    },
];


export const DefaultProduct: Product = {

    id: 0,
    title: "",
    variants: [
        {
            id: 0,
            product_id: 0,
            title: "",
            price: "",
        }

    ],
    image: {
        id: 0,
        product_id: 0,
        src: "",
    },
    isShow: false

}