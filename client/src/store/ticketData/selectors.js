import { createSelector } from 'reselect';

const getAllTickets = tickets => tickets.ticketData.allTickets;
const getSelectedStops = tickets => tickets.selectedStops;

export default createSelector(
    [getAllTickets, getSelectedStops],
    (allTickets, selectedStops) => {
        const filteredTickets = allTickets
            ? allTickets.filter(
                ({ stops }) => selectedStops[stops],
            )
            : [];

        return filteredTickets;
    },
);
