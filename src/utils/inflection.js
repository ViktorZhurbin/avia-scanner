export const inflectStopsRu = (number) => {
    switch (number) {
        case 0:
            return 'Без пересадок';
        case 1:
            return `${number} пересадка`;
        case 2:
        case 3:
        case 4:
            return `${number} пересадки`;
        default:
            return `${number} пересадок`;
    }
};

export const inflectStopsEn = (number) => {
    switch (number) {
        case 0:
            return 'Direct';
        case 1:
            return `${number} stop`;
        default:
            return `${number} stops`;
    }
};
