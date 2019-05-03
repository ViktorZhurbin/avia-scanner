import { createSelector } from 'reselect';

const getAllTickets = tickets => tickets.ticketData.allTickets;
const getSelectedStops = tickets => tickets.selectedStops;

export const getFilteredTickets = createSelector(
    [getAllTickets, getSelectedStops],
    (allTickets, selectedStops) => {
        const filteredTickets = allTickets
            ? allTickets.filter(
                ({ stops }) => selectedStops.includes(stops),
            )
            : [];

        return filteredTickets;
    },
);

export const getAllTicketsCount = createSelector(
    [getAllTickets],
    allTickets => allTickets.length,
);
