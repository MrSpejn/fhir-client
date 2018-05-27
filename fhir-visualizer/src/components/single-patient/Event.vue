<script>
// import  'file-loader?name=img/[name].[ext]!@/assets/images/tombstone-with-cross.png';
import tombstone from '@/assets/images/tombstone-with-cross.png';

export default {
    name: 'event',
    props: ['event', 'openEvent'],
    components: {
    
    },
    computed: {
        isMore() {
            const observations = +!!this.event.event.observations.length;
            const conditions = this.event.event.conditions.length;
            const procedures = this.event.event.procedures.length;
            const medicationRequests = this.event.event.medicationRequests.length;
            return observations + conditions + procedures + medicationRequests > 4;
        },
        deathCertificate() {
            return this.event.event.diagnosticReports.find(report => report.code.coding[0].code === '69409-1');
        },
        tombstone() {
            return tombstone;
        }
    },
    methods: {
        open() {
            this.openEvent(this.event);
        },
    },
};
</script>

<template>
    <div class="event paper" v-on:click="open">
        <p class="event__date">{{ event.start.format('DD MMM YYYY - ddd, HH:mm') }}</p>
        <p
            v-if="event.event.conditions.length"
            class="event__conditions-head"
        >
            Condition:
        </p>
        <ul
            v-if="event.event.conditions.length"
            class="event__conditions"
        >
            <li v-for="condition in event.event.conditions">{{condition.code.text}}</li>
        </ul>
        <div class="clear"></div>
        <p
            v-if="event.event.observations.length"
            class="event__observations"
        >Observations</p>
        <p
            v-if="event.event.procedures.length"
            class="event__conditions-head"
        >
            Procedures:
        </p>
        <ul class="event__procedures">
            <li v-for="procedure in event.event.procedures">{{procedure.code.text}}</li>
        </ul>
        <div class="clear"></div>
        <ul class="event__medication-requests">
            <li v-for="medicationRequest in event.event.medicationRequests">
                {{medicationRequest.medicationCodeableConcept.text}}
            </li>
        </ul>
        <div v-if="isMore" class="event__is-more">More</div>
        <div v-if="event.event.diagnosticReports.length" class="event__report">
            <v-icon color="white">assignment</v-icon>
        </div>
        <div v-if="deathCertificate" class="event__deatch-certificate">
            <img :src="tombstone" />
        </div>
    </div>
</template>



<style lang="scss" prescoped>
    .event {
        height: 113px;
        overflow: hidden;
        position: relative;
        background-color: #fff;

        &__date {
            background-color: #01749F;
            color: #fff;
            padding-left: 32px;
            line-height: 2em;
            margin: 0;
        }

        &__observations {
            font-weight: 700;
            margin-bottom: 0;
        }
        &__procedures {
           float: right;
            padding-right: 24px;
            list-style: none;
             width: 80%;
        }

         &__medication-requests {
            border-top: 1px solid #ddd;
            list-style: none;
            padding-left: 16px;
        }
        &__conditions {
            float: right;
            padding-right: 24px;
            list-style: none;
             width: 80%;

             
        }
        &__conditions-head {
            font-weight: 700;
            margin-bottom: 0;
            display: inline-block;
        }
        &__report {
            position: absolute;
            top: 0;
            right: 0;
        }
        &__is-more {
            position: absolute;
            bottom: 0;
            right: 0;
            text-transform: uppercase;
            font-weight: 700;
            background: #fff;
            padding-left: 5px;
        }

        &__deatch-certificate {
            position: absolute;
            top: 0;
            right: 24px;
            width: 24px;
            height: 24px;

            img {
                width: 100%;
            }
        }
    }
</style>
