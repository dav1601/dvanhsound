<template>
    <v-list-item
        class="mx-4 px-4 dark nav-left-item rounded-lg bg-none"
        :class="{ active: active }"
        :to="to"
    >
        <slot></slot>
    </v-list-item>
</template>
<script>
export default {
    props: ["to", "active"],
};
</script>
<style lang="scss">
.v-list-item--variant-text .v-list-item__overlay {
    background: none !important;
}
.nav-left-item {
    color: $white-72 !important;
    &:hover {
        background: #2a2a2a !important;
        transition: all 0.25 ease-in-out !important;
    }
    .name {
        font-weight: 500;
        text-transform: capitalize;
    }

    &:hover {
        color: white !important;
    }
}
.nav-left-item.active {
    border-right-width: 6px;
    border-right-style: solid;
    border-right-color: $green;
    background: #2a2a2a !important;
}
</style>
