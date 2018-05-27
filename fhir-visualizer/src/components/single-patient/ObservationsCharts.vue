<script>
import moment from 'moment';
import sortBy from 'lodash.sortby';

import DatePicker from '@/components/common/DatePicker';

import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

const chart = {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}

export default {
    name: 'observations-charts',
    props: ['observations', 'patient'],
    components: {
        'date-picker': DatePicker,
        'chart': chart,
    },
    data: function () {
        const minIssue = this.observations.reduce((prev, now) => now.issued < prev ? now.issued : prev, '2018')
        return {
            start: moment(minIssue).format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
            property: null,
        };
    },
    computed: {
        selectable() {
            const counts = {};
            this.observations.forEach(obst => {
                if (obst.category[0].coding[0].code === 'social-history') return;
                if (counts[obst.code.coding[0].display] !== undefined)
                    counts[obst.code.coding[0].display] += 1;
                else 
                    counts[obst.code.coding[0].display] = 0;
            });
            return Object.entries(counts)
                .filter(([k, v]) => v >= 3) 
                .map(([k, v]) => k)
        },
        chartData() {
            if (!this.property) return;

            const data = sortBy(this.observations
                .filter(observation => observation.code.coding[0].display === this.property)
                .filter(observation => moment(this.start).isSameOrBefore(observation.issued) && moment(this.end).isSameOrAfter(observation.issued))
                , 'issued',
            );

            if (!data.length) return;

            let dataValues = [];
            if (data[0].valueQuantity) {
                dataValues = data.map(obs => Math.floor(obs.valueQuantity.value * 100) / 100);
            } else {
                dataValues = data.map(obs => Math.floor(obs.component[0].valueQuantity.value * 100) / 100);
            } 

            return {
                labels: data.map(obs => moment(obs.issued).format('YYYY-MM-DD')),
                datasets: [{
                    label: `${this.property} [${data[0].valueQuantity ? data[0].valueQuantity.unit : data[0].component[0].valueQuantity.unit}]`,
                    data: dataValues, 
                    borderColor: '#00A7EA',
                    backgroundColor: 'rgba(1, 116, 159, .3)',
                }]
            };
        },
    },
};
</script>

<template>
    <div class="observations-charts">
        <v-select
            v-model="property"
            :items="selectable"
            label="Features"
        ></v-select>
        <date-picker :value="start" v-on:input="value => start = value" />
        <date-picker :value="end" v-on:input="value => end = value" />
        <chart
            v-if="chartData"
            :chartData="chartData"
            :width="400"
            :height="200"
        />
    </div>
</template>



<style lang="scss" prescoped>
    .observations-charts {
        min-height: 800px;
    }
</style>
