import type { DurationOption, TransportOption, FoodOption } from "@/types/date";

export const TIME_OPTIONS = [
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

export const DURATION_OPTIONS: DurationOption[] = [
  { id: "1h", label: "1 Hour", description: "A sweet little meetup" },
  { id: "2h", label: "2 Hours", description: "Enough for a proper chat" },
  { id: "3h", label: "3 Hours", description: "No rush at all" },
  { id: "evening", label: "Whole Evening", description: "Sunset & beyond" },
  { id: "day", label: "Whole Day", description: "The full adventure" },
];

export const TRANSPORT_OPTIONS: TransportOption[] = [
  { id: "walk", label: "Walk Together", icon: "walk" },
  { id: "cab", label: "Cab", icon: "cab" },
  { id: "metro", label: "Metro", icon: "metro" },
];

export const FOOD_OPTIONS: FoodOption[] = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "burger", label: "Burger", emoji: "🍔" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "momo", label: "Momos", emoji: "🥟" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "icecream", label: "Ice Cream", emoji: "🍦" },
  { id: "dessert", label: "Dessert", emoji: "🍰" },
  { id: "indian", label: "Indian", emoji: "🍛" },
  { id: "chinese", label: "Chinese", emoji: "🥡" },
  { id: "mexican", label: "Mexican", emoji: "🌮" },
  { id: "burrito", label: "Burrito", emoji: "🌯" },
];

export const STEP_LABELS = [
  "Date",
  "Time",
  "Duration",
  "Transport",
  "Food",
  "Confirm",
];

export function labelFor<T extends { id: string; label: string }>(
  options: T[],
  ids: string[],
): string[] {
  return ids
    .map((id) => options.find((o) => o.id === id)?.label)
    .filter((v): v is string => Boolean(v));
}
