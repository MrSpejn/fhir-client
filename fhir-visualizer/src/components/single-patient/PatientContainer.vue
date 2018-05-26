<script>
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
    props: ['patient', 'refs'],
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
        
        practicionerColor() {
            const firstPractitioner = this.patient.generalPractitioner[0];
            console.log(firstPractitioner);
            const background = firstPractitioner ? intToRGB(hashCode(firstPractitioner.reference)) : 'dddddd';
            const color = luma(background) < 150 ? '#fff' : '#000';
            
            return {
                background: `#${background}`,
                color: color,
            };
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
        }
    }
};
</script>

<template>
    <div class="patients-container">
        <div class="patients-container__row">
            <figure class="patients-row__photo-wrapper">
                <img
                    :src="photo"
                    alt="profile-photo"
                    class="patients-row__photo"
                />
            </figure>
            <div class="patients-row__data">
                <h3 class="patients-row__name">{{name}}</h3>
                <dl class="patients-row__additional-information">
                    <dt class="patients-row__info-term">Birth Date: </dt>
                    <dd class="patients-row__info-desc">
                        {{ info.birthDate }}
                    </dd>
                    <dt class="patients-row__info-term">Gender: </dt>
                    <dd class="patients-row__info-desc">
                        {{ info.gender | capitalize }}
                    </dd>
                    <dt class="patients-row__info-term">Address: </dt>
                    <dd class="patients-row__info-desc">
                        {{ info.address }}
                    </dd>
                    <dt class="patients-row__info-term">Social Security Number: </dt>
                    <dd class="patients-row__info-desc">
                        {{ info.socialSecurity }}
                    </dd>
                    <dt class="patients-row__info-term">Race | Ethinicity: </dt>
                    <dd class="patients-row__info-desc">
                        {{ info.race | capitalize }} | {{ info.ethnicity | capitalize }}
                    </dd>
                </dl>
                <div
                    v-bind:style="{ backgroundColor: practicionerColor.background, color: practicionerColor.color }"
                    class="patients-row__provider">
                    {{ info.practicioner }}
                </div>
            </div>
        </div>
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
    }
</style>
