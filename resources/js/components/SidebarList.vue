<template>
    <v-list class="nav-left mb-1" :id="id" :class="classes">
        <v-list-subheader
            class="nav-left-subHeader"
            v-if="subHeader"
            style="padding-inline-start: 32px !important"
        >
            {{ subHeader }}
        </v-list-subheader>
        <!-- ANCHOR items library --------------------------------- -->
        <v-list-item
            class="px-8 nav-left-item"
            v-for="(item, index) in list"
            :key="'list-item-' + id + index"
            color="primary"
            :value="item"
        >
            <div class="flex justify-start align-center">
                <v-icon :icon="'mdi-' + item.icon" class="icon"></v-icon>
                <v-list-item-title class="ml-4 name truncate">
                    {{ item.name }}
                </v-list-item-title>
            </div>
        </v-list-item>
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
