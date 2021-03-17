
export interface Pancel {
    name: string;
    sfe: number;
    mgt: number;
    nehez?: boolean;
}

export const PANCELOK: Array<Pancel> = [
    { name: 'posztó', sfe: 1, mgt: 0 },
    { name: 'kivert bőr', sfe: 1, mgt: 0 },
    { name: 'keményített bőr', sfe: 2, mgt: 2 },
    { name: 'gyűrűs', sfe: 1, mgt: 1 },
    { name: 'brigantin', sfe: 3, mgt: 2 },
    { name: 'láncing', sfe: 2, mgt: 1 },
    { name: 'sodronying', sfe: 3, mgt: 1 },
    { name: 'pikkelyvért', sfe: 3, mgt: 2 },
    { name: 'lemezvértezet', sfe: 3, mgt: 3, nehez: true },
    { name: 'mellvért', sfe: 4, mgt: 4, nehez: true },
    { name: 'félvértezet', sfe: 5, mgt: 6, nehez: true },
    { name: 'teljes vértezet', sfe: 6, mgt: 8, nehez: true }
]