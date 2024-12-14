export interface Event {
    id: string;
    title: string;
    description: string;
    discount: number;
    featured: boolean;
    address: string;
    city: string;
    country: string;
    stockTickets: number;
    date: string;
    hour: string;
    category: string;
    image: string;
    price: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }
  