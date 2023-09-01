import { atom } from "recoil";

export const PhonesSeletedState = atom({
    key: 'PhonesSeletedState',
    default: []
})

export const PhonesAllSeletedState = atom({
    key: 'PhonesAllSeletedState',
    default: false
})