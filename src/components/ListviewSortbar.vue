<template>
  <div class="vuefinder-list-view-sort-bar">
    <span 
      class="vuefinder-sort-bar vuefinder-list-basename" 
      @click="$emit('select', 'basename')"
    >Name
      <font-awesome-icon 
        v-show="sort.active && sort.column=='basename'" 
        :icon="sort.order=='asc'? 'sort-down': 'sort-up'"
      />
    </span>
    <span 
      class="vuefinder-sort-bar vuefinder-list-size is-hidden-mobile" 
      @click="$emit('select', 'size')"
    >Size
      <font-awesome-icon 
        v-show="sort.active && sort.column=='size'" 
        :icon="sort.order=='asc'? 'sort-down': 'sort-up'"
      />
    </span>
    <span 
      class="vuefinder-sort-bar vuefinder-list-time is-hidden-mobile" 
      @click="$emit('select', 'timestamp')"
    >Date
      <font-awesome-icon 
        v-show="sort.active && sort.column=='timestamp'" 
        :icon="sort.order=='asc'? 'sort-down': 'sort-up'"
      />
    </span>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'ListviewSortbar',
    components: { FontAwesomeIcon },
    props: {
        sort: {
            type: Object,
            required: true
        }
    },
};
</script>

<style scoped>
.vuefinder-list-view-sort-bar {
  font-size: smaller;
  display: flex;
}

.vuefinder-sort-bar {
  padding: 5px 14px;
}

.vuefinder-list-basename {
  flex: 1;
}

.vuefinder-list-size {
  width: 80px;
}

.vuefinder-list-time {
  width: 120px;
}
</style>