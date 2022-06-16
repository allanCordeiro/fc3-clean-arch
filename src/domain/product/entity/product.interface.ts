import Notification from "../../@shared/notification/notification";

export interface ProductInterface {
    get id(): string;
    get name(): string;
    get price(): number;
    changeName(name: string): void;
    changePrice(price: number): void;
    validate(): void;
}