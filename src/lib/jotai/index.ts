import {atom} from "jotai"
import { Item } from "../Types"

export const selectedItemsAtom = atom<Item[]>([]);