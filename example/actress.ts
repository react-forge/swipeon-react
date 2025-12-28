export type Gender = 'Female' | 'Male' | 'Non-Binary' | 'Other';

export interface ActressProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  image: string;
}

export const ACTRESS_PROFILES: ActressProfile[] = [
    {
      "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
      "name": "Emma Stone",
      "age": 36,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    },
    {
      "id": "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
      "name": "Scarlett Johansson",
      "age": 40,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7"
    },
    {
      "id": "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
      "name": "Zendaya",
      "age": 28,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    },
    {
      "id": "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
      "name": "Margot Robbie",
      "age": 34,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
    },
    {
      "id": "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
      "name": "Gal Gadot",
      "age": 39,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
    },
    {
      "id": "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
      "name": "Emma Watson",
      "age": 34,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      "id": "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d",
      "name": "Natalie Portman",
      "age": 43,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      "id": "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e",
      "name": "Jennifer Lawrence",
      "age": 34,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1524503033411-c9566986fc8f"
    },
    {
      "id": "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
      "name": "Ana de Armas",
      "age": 36,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    },
    {
      "id": "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
      "name": "Alexandra Daddario",
      "age": 38,
      "gender": "Female",
      "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  ]
  
