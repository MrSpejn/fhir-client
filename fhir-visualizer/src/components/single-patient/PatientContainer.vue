<script>
import sortby from 'lodash.sortby';

import man from '@/assets/images/placeholder-man.png';
import woman from '@/assets/images/placeholder-woman.png';

import {
    intToRGB,
    hashCode,
    hexToHSL,
    luma,
} from '@/utils';

export default {
    name: 'patients-list',
    props: ['patient', 'observations', 'medicationRequests', 'encounters'],
    components: {
    },
    computed: {
        name() {
            const officialName = this.patient.name[0];
            if (officialName) {
                return `${officialName.given.join(' ')} ${officialName.family}`;
            }
            return this.patient.gender === "female" ? 'Jane Doe' : 'John Doe';
        },
        photo() {
            if (this.patient.gender === "female") {
                return woman;
            }
            return man;
        },
        info() {
            const firstAddress = this.patient.address[0];
            const firstPractitioner = this.patient.generalPractitioner[0];
            
            const race = this.patient.extension
                .find((ex) => ex.valueCodeableConcept && ex.valueCodeableConcept.text === "race");
            
            const ethnicity = this.patient.extension
                .find((ex) => ex.valueCodeableConcept && ex.valueCodeableConcept.text === "ethnicity");

            const socialSecurity = this.patient.extension
                .find((ex) => ex.url && ex.url.indexOf('SocialSecurityNumber-extension') !== -1);

            return {
                birthDate: this.patient.birthDate,
                practicioner: firstPractitioner ? firstPractitioner.name : 'N/A',
                address: firstAddress ? `${firstAddress.line[0]}, ${firstAddress.city}, ${firstAddress.country}` : 'N/A',
                socialSecurity: socialSecurity ? socialSecurity.valueString : 'N/A',
                gender: this.patient.gender,
                race: race && race.valueCodeableConcept.coding[0] ?
                    race.valueCodeableConcept.coding[0].display : 'N/A',
                ethnicity: ethnicity && ethnicity.valueCodeableConcept.coding[0] ? 
                    ethnicity.valueCodeableConcept.coding[0].display : 'N/A',
            };
            return {};
        },
        sortedEncounters() {
            const encounters = sortby(this.encounters.map(encounter => ({
                ...encounter,
                observations:
                    this.observations
                        .filter(observ => observ.context && observ.context.reference.split('/')[1] ===  encounter.id),
                medicationRequests:
                    this.medicationRequests
                        .filter(request => request.context && request.context.reference.split('/')[1] ===  encounter.id),
            }), 'period.start'))
            .filter(encounter => encounter.observations.length || encounter.medicationRequests.length);
            
            console.log(this.observations.filter(obs => obs.category[0].coding[0].code === 'vital-signs' && !obs.valueQuantity))
            return encounters;
        },
    }
};
</script>

<template>
    <div class="patients-container">
        <div class="patients-container__row">
            <figure class="patients-container__photo-wrapper">
                <img
                    :src="photo"
                    alt="profile-photo"
                    class="patients-container__photo"
                />
            </figure>
            <div class="patients-container__data">
                <h3 class="patients-container__name">{{name}}</h3>
                <dl class="patients-container__additional-information">
                    <dt class="patients-container__info-term">Birth Date: </dt>
                    <dd class="patients-container__info-desc">
                        {{ info.birthDate }}
                    </dd>
                    <dt class="patients-container__info-term">Gender: </dt>
                    <dd class="patients-container__info-desc">
                        {{ info.gender | capitalize }}
                    </dd>
                    <dt class="patients-container__info-term">Address: </dt>
                    <dd class="patients-container__info-desc">
                        {{ info.address }}
                    </dd>
                    <dt class="patients-container__info-term">Social Security Number: </dt>
                    <dd class="patients-container__info-desc">
                        {{ info.socialSecurity }}
                    </dd>
                    <dt class="patients-container__info-term">Race | Ethinicity: </dt>
                    <dd class="patients-container__info-desc">
                        {{ info.race | capitalize }} | {{ info.ethnicity | capitalize }}
                    </dd>
                </dl>
            </div>
        </div>
      
         <ul>
            <li v-for="ref in sortedEncounters">
                {{ ref.resourceType }} {{ ref.period.start}} - {{ ref.period.end }}

                <ul>
                    <li v-for="ref in ref.observations">
                        {{ref.category[0].coding[0].code}}: {{ref.code.text}} {{ ref.valueQuantity && ref.valueQuantity.value }}{{ref.valueQuantity && ref.valueQuantity.unit}}
                        <ul v-if="ref.component">
                            <li  v-for="ref in ref.component">
                                {{ref.code.text}} {{ref.valueQuantity.value}}{{ref.valueQuantity.unit}}
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li v-for="ref in ref.medicationRequests">
                        {{ ref.resourceType }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" prescoped>
    .patients-container {
        background-color: #fff;
        max-width: 1000px;
        min-height: 1200px;
        padding: 2em;
        margin: 24px auto;

        &__row {
            display: flex;
        }

    &__photo-wrapper {
            flex: 0 0 220px;
            width: 220px;
            height: 220px;
        }

        &__photo {
            width: 100%;
        }
        &__data {
            width: 100%;
            padding-left: 16px;
        }
        &__name {
            color: #00A7EA;
            font-size: 32px;
            margin-bottom: 24px;
        }
        &__additional-information {
            display: flex;
            flex-wrap: wrap;
        }
        &__info-term {
            flex: 0 0 200px;
            font-weight: 700;
        }
        &__info-desc {
            flex: 0 0 calc(100% - 200px);
        }
        &__info-desc, &__info-term {
            &:nth-of-type(2n+1) {
                color: #0074a3;
            }
            &:nth-of-type(2n) {
                color: #485469;
            }
        }
    }
</style>
