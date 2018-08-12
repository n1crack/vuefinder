<template>
    <div class="vuefinder-container">
        <transition-group :class="{ 'list': listview }" class="vuefinder-explorer" name="vuefinder-items"
                          tag="div">

            <file-icon :class="{ 'disabled': selectMode }" icon="angle-left" v-show="! isRoot" key="keyBackButton" @click.native="$emit('back')">
                <span>Go back</span>
            </file-icon>

            <slot></slot>

            <div key="empty-list" class="vuefinder-empty-list" v-if="! $slots.default"><span>There is no file.</span>
            </div>

        </transition-group>
    </div>
</template>

<script>
    import FileIcon from "./FileIcon.vue";

    export default {
        props: ['listview', 'selectMode', 'isRoot'],
        components: {FileIcon},
        name: "Explorer"
    }
</script>

<style lang="scss" scoped>

    .vuefinder-explorer {
        display: flex;
        padding: 10px;
        margin: 0;
        flex-wrap: wrap;
        min-height: 95px;
        max-height: 400px;
        list-style: none;
        justify-content: flex-start;
        align-content: flex-start;
        overflow-y: auto;

        &.list {
            display: block;
        }
    }

    .vuefinder-empty-list {
        margin: auto;
        padding: 10px;
        position: absolute;
        color: darkgray;
        text-align: center;
        left: 0;
        right: 0;
        bottom: 0;
        width: 50%;
        max-width: 250px;
        height: 50px;
    }

    #{"/deep/"} .vuefinder-items-enter-active {
        transition: opacity .5s;
    }

    #{"/deep/"} .vuefinder-items-enter, #{"/deep/"} .vuefinder-items-leave-to /* .list-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>