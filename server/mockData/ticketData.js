module.exports = {
    currencyRates: {
        USD: 1,
        EUR: 0.8,
        RUB: 80
    },
    allTickets: [
        {
            id: '13554-2021-01-29T22:15:00-10413-2020-01-30T18:45:00',
            segmentIds: [2, 3],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T22:15:00',
            arrival: '2020-01-30T18:45:00',
            duration: 1170,
            journeyMode: 'Flight',
            stops: 1,
            carriers: [819],
            operatingCarriers: [819],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '609',
                    CarrierId: 819
                },
                {
                    FlightNumber: '614',
                    CarrierId: 819
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 819,
                Code: 'A3',
                Name: 'Aegean Airlines',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/A3.png',
                DisplayCode: 'A3'
            },
            offer: {
                price: 214.88,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fedus%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32756%7c609%7c13554%7c2021-01-29T22%3a15%7c9592%7c2209-13304T03%3a50%7c215%7c-%7c-%7c-%3bflight%7c-32756%7c614%7c9592%7c2020-01-30T16%3a15%7c10413%7c2020-01-30T18%3a45%7c210%7c-%7c-%7c-%2cflight%7c-32332%7c9409%7c10413%7c2020-01-29T08%3a55%7c11165%7c2020-01-29T10%3a05%7c70%7c-%7c-%7c-%3bflight%7c-32332%7c9466%7c11165%7c2020-01-29T11%3a00%7c13554%7c2020-01-29T11%3a35%7c95%7c-%7c-%7c-%26carriers%3d-32756%2c-32332%26operators%3d-32756%3b-32756%2c-32332%3b-32332%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d214.88%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dedus.13554.10413.190303.190305.1..E%7c6164079481951323883%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        },
        {
            id: '13554-2021-01-29T15:35:00-10413-2021-01-29T17:55:00',
            segmentIds: [28],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T15:35:00',
            arrival: '2021-01-29T17:55:00',
            duration: 80,
            journeyMode: 'Flight',
            stops: 0,
            carriers: [838],
            operatingCarriers: [838],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '1781',
                    CarrierId: 838
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 838,
                Code: 'AF',
                Name: 'Air France',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/AF.png',
                DisplayCode: 'AF'
            },
            offer: {
                price: 322,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fvaya%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32677%7c1781%7c13554%7c2021-01-29T15%3a35%7c10413%7c2021-01-29T17%3a55%7c80%7c-%7c-%7c-%2cflight%7c-32132%7c2008%7c10413%7c2020-01-29T11%3a45%7c9451%7c2020-01-29T13%3a05%7c80%7c-%7c-%7c-%3bflight%7c-32132%7c1019%7c9451%7c2020-01-29T14%3a05%7c13554%7c2020-01-29T14%3a25%7c80%7c-%7c-%7c-%26carriers%3d-32677%2c-32132%26operators%3d-32677%2c-32677%3b-32131%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d322.00%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dvaya.13554.10413.190303.190305.1..E%7c-7406076499791905597%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        },
        {
            id: '13554-2021-01-29T12:15:00-10413-2021-01-29T20:15:00',
            segmentIds: [9, 10],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T12:15:00',
            arrival: '2021-01-29T20:15:00',
            duration: 420,
            journeyMode: 'Flight',
            stops: 1,
            carriers: [1047],
            operatingCarriers: [1047],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '9467',
                    CarrierId: 1047
                },
                {
                    FlightNumber: '9402',
                    CarrierId: 1047
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 1047,
                Code: 'EW',
                Name: 'eurowings',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/EW.png',
                DisplayCode: 'EW'
            },
            offer: {
                price: 348.62,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fbfus%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32332%7c9467%7c13554%7c2021-01-29T12%3a15%7c11165%7c2021-01-29T14%3a40%7c85%7c-%7c-%7c-%3bflight%7c-32332%7c9402%7c11165%7c2021-01-29T19%3a00%7c10413%7c2021-01-29T20%3a15%7c75%7c-%7c-%7c-%2cflight%7c-32753%7c521%7c10413%7c2020-01-29T10%3a05%7c11154%7c2020-01-29T10%3a55%7c110%7cREUOW17G%7cR%7c-%3bflight%7c-32480%7c835%7c11154%7c2020-01-29T13%3a05%7c13554%7c2020-01-29T14%3a30%7c85%7cVV2H%7cV%7c-%26carriers%3d-32332%2c-32753%2c-32480%26operators%3d-32332%3b-32332%2c-32753%3b-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d348.62%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dbfus.13554.10413.190303.190305.1..E%7c1702188564991607561%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        },
        {
            id: '13554-2021-01-29T13:30:00-10413-2021-01-29T18:55:00',
            segmentIds: [17, 18],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T13:30:00',
            arrival: '2021-01-29T18:55:00',
            duration: 265,
            journeyMode: 'Flight',
            stops: 1,
            carriers: [1368],
            operatingCarriers: [1368],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '907',
                    CarrierId: 1368
                },
                {
                    FlightNumber: '1046',
                    CarrierId: 1368
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 1368,
                Code: 'LH',
                Name: 'Lufthansa',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/LH.png',
                DisplayCode: 'LH'
            },
            offer: {
                price: 367,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fctus%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32090%7c907%7c13554%7c2021-01-29T13%3a30%7c11616%7c2219-13293T16%3a05%7c95%7cV03LGTE1%7cV%7c-%3bflight%7c-32090%7c1046%7c11616%7c2021-01-29T17%3a40%7c10413%7c2219-13293T18%3a55%7c75%7cS03LGTE2%7cV%7c-%2cflight%7c-31799%7c645%7c10413%7c2020-01-29T20%3a50%7c18563%7c2209-13295T22%3a00%7c70%7cS03LGTE2%7cS%7c-%3bflight%7c-31799%7c316%7c18563%7c2020-03-06T07%3a10%7c13554%7c2020-03-06T08%3a05%7c115%7cS03LGTE2%7cS%7c-%26carriers%3d-32090%2c-31799%26operators%3d-32090%3b-32090%2c-31799%3b-31799%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d367.00%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dctus.13554.10413.190303.190305.1..E%7c203785377783440779%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        },
        {
            id: '13554-2021-01-29T08:50:00-10413-2021-01-29T13:50:00',
            segmentIds: [13, 14],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T08:50:00',
            arrival: '2021-01-29T13:50:00',
            duration: 240,
            journeyMode: 'Flight',
            stops: 1,
            carriers: [1384],
            operatingCarriers: [1384],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '317',
                    CarrierId: 1384
                },
                {
                    FlightNumber: '638',
                    CarrierId: 1384
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 1384,
                Code: 'LX',
                Name: 'SWISS',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/LX.png',
                DisplayCode: 'LX'
            },
            offer: {
                price: 367.93,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fhop2%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-31799%7c317%7c13554%7c2021-01-29T08%3a50%7c18563%7c2219-13293T11%3a40%7c110%7c-%7c-%7c-%3bflight%7c-31799%7c638%7c18563%7c2021-01-29T12%3a30%7c10413%7c2021-01-29T13%3a50%7c80%7c-%7c-%7c-%2cflight%7c-31799%7c1035%7c10413%7c2020-01-29T14%3a20%7c11616%7c2020-01-29T15%3a35%7c75%7c-%7c-%7c-%3bflight%7c-31799%7c916%7c11616%7c2020-01-29T17%3a00%7c13554%7c2020-01-29T17%3a45%7c105%7c-%7c-%7c-%26carriers%3d-31799%26operators%3d-31799%3b-31799%2c-32090%3b-32090%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d367.93%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dhop2.13554.10413.190303.190305.1..E%7c-3540069469597218494%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        },
        {
            id: '13554-2021-01-29T13:05:00-10413-2021-01-29T15:20:00',
            segmentIds: [0],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T13:05:00',
            arrival: '2021-01-29T15:20:00',
            duration: 75,
            journeyMode: 'Flight',
            stops: 0,
            carriers: [881],
            operatingCarriers: [881],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '314',
                    CarrierId: 881
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 881,
                Code: 'BA',
                Name: 'British Airways',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/BA.png',
                DisplayCode: 'BA'
            },
            offer: {
                price: 368.55,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fba__%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32480%7c314%7c13554%7c2021-01-29T13%3a05%7c10413%7c2219-13293T15%3a20%7c75%7cMZ0R%7cM%7cBasic%2cflight%7c-32480%7c303%7c10413%7c2020-01-29T07%3a30%7c13554%7c2209-13295T07%3a50%7c80%7cLZ0R%7cL%7cBasic%26carriers%3d-32480%26operators%3d-32480%2c-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dtrue%26ticket_price%3d368.55%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dba__.13554.10413.190303.190305.1..E%7c-2912932257989518283%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00%26source_website_id%3damac'
            }
        },
        {
            id: '13554-2021-01-29T13:55:00-10413-2021-01-29T21:25:00',
            segmentIds: [6, 7],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T13:55:00',
            arrival: '2021-01-29T21:25:00',
            duration: 390,
            journeyMode: 'Flight',
            stops: 1,
            carriers: [1707],
            operatingCarriers: [1707],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '504',
                    CarrierId: 1707
                },
                {
                    FlightNumber: '559',
                    CarrierId: 1707
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 1707,
                Code: 'SK',
                Name: 'SAS',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/SK.png',
                DisplayCode: 'SK'
            },
            offer: {
                price: 423.58,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2forbz%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-31901%7c504%7c13554%7c2021-01-29T13%3a55%7c10694%7c2219-13293T16%3a50%7c115%7cWEOLIGHT%7cW%7c-%3bflight%7c-31901%7c559%7c10694%7c2021-01-29T19%3a30%7c10413%7c2219-13293T21%3a25%7c115%7cWEOLIGHT%7cW%7c-%2cflight%7c-32480%7c307%7c10413%7c2020-01-29T10%3a35%7c13554%7c2209-13295T11%3a00%7c85%7cVZ0R%7cV%7c-%26carriers%3d-31901%2c-32480%26operators%3d-31901%3b-31901%2c-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d423.58%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dorbz.13554.10413.190303.190305.1..E%7c4397474476575344352%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        },
        {
            id: '13554-2021-01-29T15:05:00-10413-2021-01-29T17:25:00',
            segmentIds: [21],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T15:05:00',
            arrival: '2021-01-29T17:25:00',
            duration: 80,
            journeyMode: 'Flight',
            stops: 0,
            carriers: [881],
            operatingCarriers: [881],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '316',
                    CarrierId: 881
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 881,
                Code: 'BA',
                Name: 'British Airways',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/BA.png',
                DisplayCode: 'BA'
            },
            offer: {
                price: 456,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fskyp%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32480%7c316%7c13554%7c2021-01-29T15%3a05%7c10413%7c2219-13293T17%3a25%7c80%7cMTZ0RO%7cM%7c-%2cflight%7c-32677%7c1180%7c10413%7c2020-01-29T18%3a55%7c13554%7c2209-13295T19%3a15%7c80%7cGRDFR9%7cG%7c-%26carriers%3d-32480%2c-32677%26operators%3d-32480%2c-32677%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dtrue%26ticket_price%3d456.00%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dskyp.13554.10413.190303.190305.1..E%7c-3160824224656814330%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a42%3a00'
            }
        },
        {
            id: '13554-2021-01-29T08:45:00-10413-2021-01-29T14:05:00',
            segmentIds: [26, 27],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T08:45:00',
            arrival: '2021-01-29T14:05:00',
            duration: 260,
            journeyMode: 'Flight',
            stops: 1,
            carriers: [885],
            operatingCarriers: [885, 838],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '2102',
                    CarrierId: 885
                },
                {
                    FlightNumber: '3055',
                    CarrierId: 885
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 885,
                Code: 'BE',
                Name: 'Flybe',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/BE.png',
                DisplayCode: 'BE'
            },
            offer: {
                price: 474.7,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fxpus%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32302%7c2102%7c13554%7c2021-01-29T08%3a45%7c11235%7c2021-01-29T10%3a25%7c100%7cUFLY2S%7cU%7c-%3bflight%7c-32302%7c3055%7c11235%7c2021-01-29T11%3a15%7c10413%7c2219-13293T14%3a05%7c110%7cSFLY1S%7cS%7c-%2cflight%7c-31901%7c566%7c10413%7c2020-01-29T11%3a10%7c10694%7c2020-01-29T13%3a00%7c110%7cWEOLIGHT%7cW%7c-%3bflight%7c-31901%7c505%7c10694%7c2020-01-29T14%3a55%7c13554%7c2020-01-29T16%3a00%7c125%7cWEOLIGHT%7cW%7c-%26carriers%3d-32302%2c-31901%26operators%3d-32302%3b-32677%2c-31901%3b-31901%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d474.70%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dxpus.13554.10413.190303.190305.1..E%7c2041875680682941635%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        },
        {
            id: '13554-2021-01-29T17:25:00-10413-2021-01-29T19:40:00',
            segmentIds: [23],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T17:25:00',
            arrival: '2021-01-29T19:40:00',
            duration: 75,
            journeyMode: 'Flight',
            stops: 0,
            carriers: [881],
            operatingCarriers: [881],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '322',
                    CarrierId: 881
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 881,
                Code: 'BA',
                Name: 'British Airways',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/BA.png',
                DisplayCode: 'BA'
            },
            offer: {
                price: 515.5,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2forbz%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32480%7c322%7c13554%7c2021-01-29T17%3a25%7c10413%7c2219-13293T19%3a40%7c75%7cMZ0R%7cM%7c-%2cflight%7c-31901%7c566%7c10413%7c2020-01-29T11%3a10%7c10694%7c2209-13295T13%3a00%7c110%7cWEOLIGHT%7cW%7c-%3bflight%7c-31901%7c505%7c10694%7c2020-01-29T14%3a55%7c13554%7c2020-01-29T16%3a00%7c125%7cWEOLIGHT%7cW%7c-%26carriers%3d-32480%2c-31901%26operators%3d-32480%2c-31901%3b-31901%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d515.50%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dorbz.13554.10413.190303.190305.1..E%7c-4655013070893058706%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        }
    ],
    filteredTickets: [
        {
            id: '13554-2021-01-29T15:35:00-10413-2021-01-29T17:55:00',
            segmentIds: [28],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T15:35:00',
            arrival: '2021-01-29T17:55:00',
            duration: 80,
            journeyMode: 'Flight',
            stops: 0,
            carriers: [838],
            operatingCarriers: [838],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '1781',
                    CarrierId: 838
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 838,
                Code: 'AF',
                Name: 'Air France',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/AF.png',
                DisplayCode: 'AF'
            },
            offer: {
                price: 322,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fvaya%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32677%7c1781%7c13554%7c2021-01-29T15%3a35%7c10413%7c2021-01-29T17%3a55%7c80%7c-%7c-%7c-%2cflight%7c-32132%7c2008%7c10413%7c2020-01-29T11%3a45%7c9451%7c2020-01-29T13%3a05%7c80%7c-%7c-%7c-%3bflight%7c-32132%7c1019%7c9451%7c2020-01-29T14%3a05%7c13554%7c2020-01-29T14%3a25%7c80%7c-%7c-%7c-%26carriers%3d-32677%2c-32132%26operators%3d-32677%2c-32677%3b-32131%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d322.00%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dvaya.13554.10413.190303.190305.1..E%7c-7406076499791905597%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        },
        {
            id: '13554-2021-01-29T13:05:00-10413-2021-01-29T15:20:00',
            segmentIds: [0],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T13:05:00',
            arrival: '2021-01-29T15:20:00',
            duration: 75,
            journeyMode: 'Flight',
            stops: 0,
            carriers: [881],
            operatingCarriers: [881],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '314',
                    CarrierId: 881
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 881,
                Code: 'BA',
                Name: 'British Airways',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/BA.png',
                DisplayCode: 'BA'
            },
            offer: {
                price: 368.55,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fba__%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32480%7c314%7c13554%7c2021-01-29T13%3a05%7c10413%7c2219-13293T15%3a20%7c75%7cMZ0R%7cM%7cBasic%2cflight%7c-32480%7c303%7c10413%7c2020-01-29T07%3a30%7c13554%7c2209-13295T07%3a50%7c80%7cLZ0R%7cL%7cBasic%26carriers%3d-32480%26operators%3d-32480%2c-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dtrue%26ticket_price%3d368.55%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dba__.13554.10413.190303.190305.1..E%7c-2912932257989518283%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00%26source_website_id%3damac'
            }
        },
        {
            id: '13554-2021-01-29T15:05:00-10413-2021-01-29T17:25:00',
            segmentIds: [21],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T15:05:00',
            arrival: '2021-01-29T17:25:00',
            duration: 80,
            journeyMode: 'Flight',
            stops: 0,
            carriers: [881],
            operatingCarriers: [881],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '316',
                    CarrierId: 881
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 881,
                Code: 'BA',
                Name: 'British Airways',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/BA.png',
                DisplayCode: 'BA'
            },
            offer: {
                price: 456,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2fskyp%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32480%7c316%7c13554%7c2021-01-29T15%3a05%7c10413%7c2219-13293T17%3a25%7c80%7cMTZ0RO%7cM%7c-%2cflight%7c-32677%7c1180%7c10413%7c2020-01-29T18%3a55%7c13554%7c2209-13295T19%3a15%7c80%7cGRDFR9%7cG%7c-%26carriers%3d-32480%2c-32677%26operators%3d-32480%2c-32677%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dtrue%26ticket_price%3d456.00%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dskyp.13554.10413.190303.190305.1..E%7c-3160824224656814330%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a42%3a00'
            }
        },
        {
            id: '13554-2021-01-29T17:25:00-10413-2021-01-29T19:40:00',
            segmentIds: [23],
            originStation: 13554,
            destinationStation: 10413,
            departure: '2021-01-29T17:25:00',
            arrival: '2021-01-29T19:40:00',
            duration: 75,
            journeyMode: 'Flight',
            stops: 0,
            carriers: [881],
            operatingCarriers: [881],
            directionality: 'Outbound',
            flightNumbers: [
                {
                    FlightNumber: '322',
                    CarrierId: 881
                }
            ],
            origin: {
                Id: 4698,
                ParentId: 247,
                Code: 'LON',
                Type: 'City',
                Name: 'London'
            },
            destination: {
                Id: 6073,
                ParentId: 244,
                Code: 'PAR',
                Type: 'City',
                Name: 'Paris'
            },
            carrier: {
                Id: 881,
                Code: 'BA',
                Name: 'British Airways',
                ImageUrl: 'https://s1.apideeplink.com/images/airlines/BA.png',
                DisplayCode: 'BA'
            },
            offer: {
                price: 515.5,
                link:
                    'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=NqagL4PVt5peZGMG189S4zg4dm39CEoR%2bV8UrnEXQEuJZ36mI8cG9Fi4G8qRAMyN&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUS%2fen-US%2fUSD%2forbz%2f2%2f13554.10413.2021-01-29%2c10413.13554.2020-01-29%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32480%7c322%7c13554%7c2021-01-29T17%3a25%7c10413%7c2219-13293T19%3a40%7c75%7cMZ0R%7cM%7c-%2cflight%7c-31901%7c566%7c10413%7c2020-01-29T11%3a10%7c10694%7c2209-13295T13%3a00%7c110%7cWEOLIGHT%7cW%7c-%3bflight%7c-31901%7c505%7c10694%7c2020-01-29T14%3a55%7c13554%7c2020-01-29T16%3a00%7c125%7cWEOLIGHT%7cW%7c-%26carriers%3d-32480%2c-31901%26operators%3d-32480%2c-31901%3b-31901%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d515.50%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dorbz.13554.10413.190303.190305.1..E%7c-4655013070893058706%26commercial_filters%3dfalse%26q_datetime_utc%3d2020-02-24T02%3a32%3a00'
            }
        }
    ],
    stopOptions: [0, 1]
};
