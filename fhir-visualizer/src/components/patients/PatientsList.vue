<script>
import PatientsRow from '@/components/patients/PatientsRow';

export default {
    name: 'patients-list',
    props: ['patients'],
    components: {
        'patient-row': PatientsRow,
    }
};
</script>

<template>
    <ul class="patients-list">
        <li
            v-for="patient in patients"
            class="patients-list__element"
        >
            <patient-row :patient="patient" />
        </li>
    </ul>
</template>

<style lang="scss" prescoped>
    .patients-list {
        max-width: 900px;
        list-style: none;
        padding: 0;

        &__element {
            margin: 10px 0;
        }
    }
</style>
