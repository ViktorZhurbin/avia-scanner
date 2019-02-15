export default (number) => {
    switch (number) {
        case 1:
            return 'пересадка';
        case 2:
        case 3:
        case 4:
            return 'пересадки';
        default:
            return 'пересадок';
    }
};
