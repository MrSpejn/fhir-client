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
        margin: 0 auto;
        list-style: none;
        
        padding: 0;

        @media screen and (max-width: 1024px) {
            max-width: 100%;
        }

        &__element {
            margin: 10px 0;
        }
    }
</style>
