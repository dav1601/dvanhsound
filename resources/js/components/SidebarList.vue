<template>
    <v-list class="nav-left mb-1" dark :id="id" :class="classes">

    </v-list>
</template>
<script>
export default {
    props: {
        subHeader: {
            default: "",
        },
        list: {
            default: [],
        },
        classes: {
            default: "",
        },
        id: {
            default: "",
        },
        classesItem: {
            default: "",
        },
    },
};
</script>
<style lang="scss">
.nav-left {
    &-item {
        color: $white-72 !important;
        .name {
            font-weight: 500;
            text-transform: capitalize;
        }

        &:hover {
            color: white !important;
        }
    }
    &-subHeader {
        color: $white-72;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.92px;
    }
    &-item.active {
        border-right-width: 6px;
        border-right-style: solid;
        border-right-color: $green;
    }
}
</style>
