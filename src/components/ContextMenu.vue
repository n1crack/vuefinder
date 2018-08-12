<template>
    <ul class="vuefinder-context-menu" id="vuefinder-context-menu" :style="context.positions">
        <li v-for="(item) in context.items" :key="item.title" @click="run(item)">
            <span class="vuefinder-icon">
                <font-awesome-icon :icon="item.icon"></font-awesome-icon>
            </span>
            {{ item.title }}
        </li>
    </ul>
</template>

<script>
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {fas} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(fas)

    export default {
        props: ['context'],
        name: "ContextMenu",
        components: {
            'font-awesome-icon': FontAwesomeIcon
        },
        methods: {
            close() {
                this.$emit('close');
            },
            run(item) {
                this.$emit('close');
                item.action();
            }
        },
        mounted() {
            window.addEventListener("mousedown", (e) => {

                if (e.target.parentNode === this.$el) {
                    return;
                }
                if (this.context.active) {
                    this.close();
                }

            });
        },
    }
</script>

<style lang="scss" scoped>
    /* The whole thing */
    .vuefinder-context-menu {
        z-index: 1000;
        position: absolute;
        overflow: hidden;
        border: 1px solid #CCC;
        white-space: nowrap;
        font-family: sans-serif;
        font-size: 0.9rem;
        background: #FFF;
        color: #333;
        border-radius: 5px;
        padding: 0;
    }

    /* Each of the items in the list */
    .vuefinder-context-menu li {
        padding: 5px 8px;
        cursor: pointer;
        list-style-type: none;
        transition: all .3s ease;
        user-select: none;
    }

    .vuefinder-context-menu li:hover {
        background-color: #9eb1c6;
    }

    .vuefinder-icon {
  
        display: inline-block;
        text-align: center;
    }
</style>