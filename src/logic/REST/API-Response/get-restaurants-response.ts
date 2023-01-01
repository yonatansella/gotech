interface Restaurant {
    name: string,
    id: number,
    address: string,
    score: number,
}

interface OptionalRestaurant {
    name?: string,
    id?: number,
    address?: string,
    score?: number,
}

export { Restaurant, OptionalRestaurant };
