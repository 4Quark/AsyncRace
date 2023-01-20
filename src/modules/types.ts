export type carData = {
    name: string,
    color: string,
    id?: number,
};

export type carDrive = {
    velocity: number,
    distance: number,
};

export type queryP = {
    key: string, 
    value: string | number,
}[];

export type winnerData = {
    wins: number, 
    time: number,
    id?: number,
}

export type sort = 'id' | 'wins' | 'time';
