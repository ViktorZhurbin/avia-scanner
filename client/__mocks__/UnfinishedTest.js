
export default jest.fn()
    .mockImplementationOnce(() => ({
        ticketData: ['currencyRates', 'allTickets', 'filteredTickets', 'stopOptions'],
    }))
    .mockImplementationOnce(() => {
        throw (new Error('Error fetching ticketData'));
    });
