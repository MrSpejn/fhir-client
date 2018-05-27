<script>
import moment from 'moment';
import Event from '@/components/single-patient/Event';

export default {
    name: 'event-timeline',
    props: ['events', 'openEvent'],
    components: {
        'event': Event,
    },
    created() {
        console.log(this.openEvent)
    },
    computed: {
        withDates() {
            return this.events.map((event) => ({
                event,
                start: moment(event.period.start),
                end: moment(event.period.end),
                duration: moment.duration(moment(event.period.end).diff(event.period.start)).humanize(),
            }));
        },
        diffs() {
            return this.withDates.reduce((diffs, current, index, list) => {
                if (index == 0) return [];
            
                return [
                    ...diffs, moment.duration(current.start.diff(list[index-1].end))
                ]
            }, []);
        },
        pixelize() {
            const base = this.events.length * 90;
            const logs = this.diffs.map(diff => {
                const logDiff = Math.log(diff.asDays() / 30);
                return logDiff < 1 ? 1 : logDiff;
            });
            const sum = logs.reduce((acc, val) => acc + val, 0);
            const fraction = base / sum;
            return logs.reduce((pixels, log) => [ ...pixels, log*fraction + pixels[pixels.length-1]], [0]);
        },
        isEnded() {
            return !!this.withDates.find(event => !!event.event.diagnosticReports.find(report => report.code.coding[0].code === '69409-1'));
        }
    }

};
</script>

<template>
    <div class="event-timeline">
        <ul
            :style="{ height: `${events.length * 90}px` }"
            class="event-timeline__time-list"
            v-bind:class="{'event-timeline__time-list--ended': isEnded, 'event-timeline__time-list--single': withDates.length === 1}"
        >
            <li 
                v-for="(event, idx) in withDates"
                :style="{ 
                    top: `${pixelize[idx]}px`,
                    zIndex: events.length - idx,
                }"
                class="event-timeline__time-item"
            >
                <event
                    :event="event"
                    :openEvent="openEvent"
                />
            </li>
        </ul>
    </div>
</template>



<style lang="scss" prescoped>
    $width: 5px;
    .event-timeline {
        padding: 20px 0 150px;

        &__time-list {
            position: relative;
            list-style: none;
            &::before {
                content: '';
                position: absolute;
                top: -50px;
                left: 50%;
                width: 2*$width;
                height: calc(100% + 150px);
                background-color: #495568;
                transform: translateX(-50%);
            }

            &--ended {
                &::before {
                    height: calc(100% + 110px);
                }
            }

            &--single.event-timeline__time-list--ended {
                &::before {
                    height: calc(100%);
                }
            }
        }
        &__time-item {
            position: absolute;
            width: calc(50% - #{$width + 10px});
            height: 120px;

            &:nth-child(2n) {
                left: calc(50% + #{$width + 10px});

                &::before {
                    left: - $width - 10px;
                }
            }
            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: calc(100% + #{$width + 10px});
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #fff;
                border: 8px solid #495568;
                transform: translate(-50%, -50%);
            }
            
            &::after {
                content: '';
                position: absolute;
                top: -5px;
                left: -5px;
                border: 18px solid transparent;
                border-top-color: #fafaff;
                border-left-color: #fafaff;
            }
        }
    
    }
</style>

