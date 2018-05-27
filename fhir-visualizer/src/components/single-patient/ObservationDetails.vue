

<script>

export default {
    name: 'observation-details',
    props: ['observation'],
    computed: {
        title() {
            return `${this.observation.category[0].coding[0].code || ""} ${this.observation.code.coding[0].display}`
        },
        content() {
            const codeableConcept = this.observation.valueCodeableConcept && 
                this.observation.valueCodeableConcept.text;
            const valueQuantity = this.observation.valueQuantity &&
                `${this.observation.valueQuantity.value} ${this.observation.valueQuantity.unit}`;
            const components = this.observation.component && 
                this.observation.component.reduce((p, c) => (p ? `${p} / ${c.valueQuantity.value}` : c.valueQuantity.value), null)
            
            return valueQuantity || codeableConcept || components
        },
    },
};
</script>

<template>
    <v-list-tile-content>
        <v-list-tile-title>{{title}}</v-list-tile-title>
        <v-list-tile-sub-title>{{content}}</v-list-tile-sub-title>
    </v-list-tile-content>
</template>



<style lang="scss" prescoped>
    .observation-details {
    }
</style>
