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
    name: 'patients-row',
    props: ['patient'],
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
            const background = firstPractitioner ? intToRGB(hashCode(firstPractitioner.name)) : 'dddddd';
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
  <a :href="`/patient/${patient.id}`" class="patients-row">
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
  </a>
</template>

<style lang="scss" prescoped>
    .patients-row {
        display: flex;
        background-color: #fff;
        padding: 10px 0 0 10px;
        text-decoration: none;
        color: #666;
        
        &:hover {
            background-color: #f1f1f1;
        }

        &__photo-wrapper {
            flex: 0 0 100px;
            width: 100px;
            height: 100px;
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
        &__provider {
            float: right;
            width: 50%;
            text-align: right;
            padding-right: 20px;
            min-height: 24px;
        }

        @media screen and (max-width: 1024px) {
            &__provider {
                width: 75%;
                margin-top: 12px;
            }
        }
        @media screen and (max-width: 770px) {
            &__provider {
                width: 100%;
            }
        }
    }    
</style>
