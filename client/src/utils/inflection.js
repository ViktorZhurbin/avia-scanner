export default (number) => {
    switch (number) {
        case 0:
            return 'Direct';
        case 1:
            return `${number} stop`;
        default:
            return `${number} stops`;
    }
};
