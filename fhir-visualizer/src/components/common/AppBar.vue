<script>
export default {
  name: 'AppBar',
};
</script>

<template>
    <v-toolbar class="appbar">
        <v-toolbar-title>
            <v-icon color="white">local_hospital</v-icon>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<style lang="scss" prescoped>
    .appbar {
        .toolbar__title {
            height: 100%;
            line-height: 60px;
            margin-left: 0 !important;
            background: #00A7EA;
            padding: 0 16px;
            color: #fff;

            @media screen and (max-width: 960px) {
                line-height: 50px;
            }
        }
        .toolbar__content {
            background: #485469;
        }

    }
</style>
