export default (number) => {
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
