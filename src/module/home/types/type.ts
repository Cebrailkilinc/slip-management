export interface RatingProps {
    rating: number
    numReviews: number
}

export interface ProductType {
    id: string,
    price: number,
    currency: string,
    name: string,
    description: string,
    quantity: number,
    isNew: boolean,
    rating: number,
    imageUrl: string,
}