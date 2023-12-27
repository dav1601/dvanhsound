<template>
    <div class="col-1">
        <slot name="col-1"></slot>
    </div>
    <div class="col-2">
        <slot name="col-2"></slot>
    </div>
    <div class="col-3">
        <slot name="col-3"></slot>
    </div>

    <div class="col-4">
        <slot name="col-4"></slot>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.col-1 {
    @include col(2%);
}
.col-2 {
    @include col(53%);
}
.col-3 {
    @include col(27%);
}
.col-4 {
    @include col(18%);
}
</style>
