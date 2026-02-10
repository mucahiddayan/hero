export interface ShoppingItem {
    _id: string;
    name: string;
    bought: boolean;
    createdAt: string;
}

export interface ShoppingList {
    _id: string;
    name: string;
    items: ShoppingItem[];
}
