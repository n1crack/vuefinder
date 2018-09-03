<template>
  <ul 
    id="vuefinder-context-menu" 
    :style="context.positions" 
    class="vuefinder-context-menu"
  >
    <li 
      v-for="(item) in context.items"
      :key="item.title" 
      class="vuefinder-context-item" 
      @click="run(item)"
    >
      <span class="vuefinder-icon">
        <font-awesome-icon :icon="item.icon" />
      </span>
      <span class="vuefinder-context-title">
        {{ item.title }}
      </span>
    </li>
  </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'ContextMenu',
    components: {
        'font-awesome-icon': FontAwesomeIcon
    },
    props: {
        context: {
            type: Object,
            required: true
        }
    },
    mounted () {
        window.addEventListener('mousedown', (e) => {

            if (e.target.parentNode === this.$el) {
                return;
            }
            if (this.context.active) {
                this.close();
            }

        });
    },
    methods: {
        close () {
            this.$emit('close');
        },
        run (item) {
            this.$emit('close');
            item.action();
        }
    },
};
</script>

<style lang="scss" scoped>
/* The whole thing */
.vuefinder-context-menu {
  z-index: 1000;
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 0.9rem;
  border-radius: 5px;
  padding: 0;
}

.vuefinder-context-item {
  padding: 5px 8px;
  cursor: pointer;
  list-style-type: none;
  transition: all 0.3s ease;
  user-select: none;
}
.vuefinder-icon {
  display: inline;
  text-align: center;
  pointer-events: none;
}
.vuefinder-context-title{
    display: inline;
    text-align: center;
    pointer-events: none;
}
</style>