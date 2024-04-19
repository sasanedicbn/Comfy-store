 export type Product = {
    id: number;
    attributes: {
        image: string;
        title: string;
        price: number;
    };
};

export type MetaData = {
    categories?: string[];
    companies?: string[];
    pagination?: {
        pageCount?: number;
    };
};