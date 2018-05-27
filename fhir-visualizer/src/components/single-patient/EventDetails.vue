<script>
import moment from 'moment';
import sortBy from 'lodash.sortby';
import ObservationDetails from '@/components/single-patient/ObservationDetails';

export default {
    name: 'event-details',
    props: ['event'],
    components: {
        'observation-details': ObservationDetails,
    },
    created() {
    },
    computed: {
        observations() {
            const list = [...this.event.event.observations];
            list.sort((a, b) => {
                const ap = a.category[0].coding[0].code;
                const bp = b.category[0].coding[0].code;
                const ap2 = a.code.coding[0].display;
                const bp2 = b.code.coding[0].display;

                if (moment(a.issued).isBefore(moment(b.issued)))
                    return -1;
                if (moment(a.issued).isAfter(moment(b.issued)))
                    return 1;

                if (!ap || ap < bp)
                    return -1;
                if (!bp || ap > bp)
                    return 1;  

                if (!ap2 || ap2 < bp2)
                    return -1;
                if (!bp2 || ap2 > bp2)
                    return 1; 

                return 0;
            });

            console.log(list.map(l => l.issued))
            return list;
        },
    },
};
</script>

<template>
    <v-card class="event-details">
        <v-card-title><h3>Encounter: {{ event.start.format('DD MMM YYYY - ddd, HH:mm') }} - {{ event.end.format('DD MMM YYYY - ddd, HH:mm') }}</h3></v-card-title>
        <div
            class="event-details__data-section"
            v-if="event.event.procedures.length"
        >
            <p class="event-details__section-heading">Performed procedures</p>
            <v-list>
                <v-list-tile v-for="procedure in event.event.procedures">
                    <v-list-tile-content>
                        {{procedure.code.text}}
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </div>

        <div
            class="event-details__data-section"
            v-if="event.event.conditions.length"
        >
            <p class="event-details__section-heading">Patient conditions</p>
            <v-list class="event-details__section-list">
                <v-list-tile v-for="condition in event.event.conditions">
                    <v-list-tile-content>
                        {{condition.code.coding[0].display}}
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </div>
        <div
            class="event-details__data-section"
            v-if="event.event.observations.length"
        >
            <p class="event-details__section-heading">Gathered observations</p>
            <v-list class="event-details__section-list">
                <v-list-tile v-for="observation in observations">
                    <observation-details :observation="observation" />
                </v-list-tile>
            </v-list>
        </div>
        <div
            class="event-details__data-section"
            v-if="event.event.medicationRequests.length"
        >
            <p class="event-details__section-heading">Requested medication</p>
            <v-list class="event-details__section-list">
                <v-list-tile v-for="request in event.event.medicationRequests">
                    <v-list-tile-content>
                        {{request.medicationCodeableConcept.text}}
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </div>
        <div
            class="event-details__data-section"
            v-if="event.event.diagnosticReports.length"
        >
            <p class="event-details__section-heading">Diagnostic reports</p>
            <v-list class="event-details__section-list">
                <v-list-tile v-for="report in event.event.diagnosticReports">
                    <v-list-tile-content>
                        <v-list-tile-title>{{report.code.coding[0].display}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{report.result[0].display}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </div>

    </v-card>
</template>



<style lang="scss" prescoped>
  .event-details {
        min-height: 600px;
        padding: 0 24px 24px;

        &__section-heading {
            font-size: 16px;
            margin-bottom: 0;
            border-bottom: 1px solid #ddd;
        }
        &__section-list {
        }
  }

</style>
