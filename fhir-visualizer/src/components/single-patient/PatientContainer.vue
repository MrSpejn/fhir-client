<script>
import VueScrollbar from 'vue2-scrollbar';

import EventsTimeline from '@/components/single-patient/EventsTimeline';
import PatientDetails from '@/components/single-patient/PatientDetails';
import EventDetails from '@/components/single-patient/EventDetails';
import ObservationsCharts from '@/components/single-patient/ObservationsCharts';

export default {
    name: 'patients-list',
    props: ['patient', 'events', 'observations'],
    data() {
        return {
            dialogOpen: false,
            eventInDialog: null,
        };
    },
    components: {
        'events-timeline': EventsTimeline,
        'event-details': EventDetails,
        'patient-details': PatientDetails,
        'observations-charts': ObservationsCharts,
        'v-scrollbar': VueScrollbar,
    },
    methods: {
        openEvent(event = null) {
            this.dialogOpen = true;
            this.eventInDialog = event;
        }
    }
};
</script>

<template>
    <div v-if="patient.name" class="patients-container">
        <patient-details :patient="patient" />
        <v-scrollbar class="patients-container__timeline">
            <events-timeline
                :events="events"
                :openEvent="openEvent"
            />
        </v-scrollbar>
        <div class="patients-container__charts">
            <observations-charts
                :observations="observations"
            />
        </div>
        <v-dialog
            v-model="dialogOpen"
            max-width="700px"
        >   
            <event-details
                v-if="eventInDialog"
                :event="eventInDialog"
            />
        </v-dialog>
    </div>
</template>



<style lang="scss" prescoped>
    .patients-container {
        background-color: #fafaff;
        max-width: 1000px;
        min-height: 1200px;
        padding: 2em;
        margin: 24px auto 128px;

        &__row {
            display: flex;
        }

        &__timeline {
            max-height: 900px;
            overflow-y: auto;
            box-shadow: inset 0 6px 3px -3px #888;
        }
    }
</style>
