import { Item } from "@/types";
import { atom } from "jotai";

export const selectedItemsAtom = atom<Item[]>([]);
