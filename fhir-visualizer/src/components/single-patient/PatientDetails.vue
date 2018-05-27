<script>
import moment from 'moment';
import man from '@/assets/images/placeholder-man.png';
import woman from '@/assets/images/placeholder-woman.png';
import {
    intToRGB,
    hashCode,
    hexToHSL,
    luma,
} from '@/utils';


export default {
    name: 'patient-details',
    props: ['patient'],
    computed: {
        name() {
            const officialName = this.patient.name && this.patient.name[0];
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
            const firstAddress = this.patient.address && this.patient.address[0];
            const firstPractitioner = this.patient.generalPractitioner && this.patient.generalPractitioner[0];
            
            const race = this.patient.extension
                .find((ex) => ex.valueCodeableConcept && ex.valueCodeableConcept.text === "race");
            
            const ethnicity = this.patient.extension
                .find((ex) => ex.valueCodeableConcept && ex.valueCodeableConcept.text === "ethnicity");

            const socialSecurity = this.patient.extension
                .find((ex) => ex.url && ex.url.indexOf('SocialSecurityNumber-extension') !== -1);

            return {
                birthDate: moment(this.patient.birthDate),
                practicioner: firstPractitioner ? firstPractitioner.name : 'N/A',
                address: firstAddress ? `${firstAddress.line[0]}, ${firstAddress.city}, ${firstAddress.country}` : 'N/A',
                socialSecurity: socialSecurity ? socialSecurity.valueString : 'N/A',
                gender: this.patient.gender,
                race: race && race.valueCodeableConcept.coding[0] ?
                    race.valueCodeableConcept.coding[0].display : 'N/A',
                ethnicity: ethnicity && ethnicity.valueCodeableConcept.coding[0] ? 
                    ethnicity.valueCodeableConcept.coding[0].display : 'N/A',
                yearsOld: moment.duration(moment(this.patient.deceasedDateTime).diff(this.patient.birthDate)),
                death: this.patient.deceasedDateTime ? 
                    moment(this.patient.deceasedDateTime) :
                    null,
            };
            return {};
        },
    }
};
</script>

<template>
    <div class="patient-details">
        <figure class="patient-details__photo-wrapper">
            <img
                :src="photo"
                alt="profile-photo"
                class="patient-details__photo"
            />
            <p
                v-if="info.death"
                class="patient-details__deceased"
            >Deceased</p>
        </figure>
        <div class="patient-details__data">
            <h3 class="patient-details__name">{{name}}</h3>
            <dl class="patient-details__additional-information">
                <dt class="patient-details__info-term">Birth Date: </dt>
                <dd class="patient-details__info-desc">
                    {{ info.birthDate.format('DD-MM-YYYY') }} ({{ info.yearsOld.asYears() | floor }} years old)
                </dd>
                <dt class="patient-details__info-term">Gender: </dt>
                <dd class="patient-details__info-desc">
                    {{ info.gender | capitalize }}
                </dd>
                <dt class="patient-details__info-term">Address: </dt>
                <dd class="patient-details__info-desc">
                    {{ info.address }}
                </dd>
                <dt class="patient-details__info-term">Social Security Number: </dt>
                <dd class="patient-details__info-desc">
                    {{ info.socialSecurity }}
                </dd>
                <dt class="patient-details__info-term">Race | Ethinicity: </dt>
                <dd class="patient-details__info-desc">
                    {{ info.race | capitalize }} | {{ info.ethnicity | capitalize }}
                </dd>
            </dl>
        </div>
      
    </div>
</template>



<style lang="scss" prescoped>
    .patient-details {
        display: flex;

        &__photo-wrapper {
            flex: 0 0 220px;
            width: 220px;
            height: 220px;
            position: relative;
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
        &__deceased {
            position: absolute;
            top: 20px;
            left: 10px;
            transform-origin: 0 50%;
            line-height: 1em;
            margin-bottom: 0;
            transform: rotate(30deg);
            font-size: 46px;
            text-transform: uppercase;
            color: red;
            font-weight: 700;
        }
    }
</style>

