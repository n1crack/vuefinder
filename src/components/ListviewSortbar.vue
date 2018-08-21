<template>
  <div class="vuefinder-list-view-sort-bar">
    <span 
      class="vuefinder-sort-bar vuefinder-list-basename" 
      @click="$emit('select', 'basename')"
    >Name
      <font-awesome-icon 
        v-show="sort.active && sort.by=='basename'" 
        :icon="sort.order=='asc'? 'sort-down': 'sort-up'"
      />
    </span>
    <span 
      class="vuefinder-sort-bar vuefinder-list-size is-hidden-mobile" 
      @click="$emit('select', 'size')"
    >Size
      <font-awesome-icon 
        v-show="sort.active && sort.by=='size'" 
        :icon="sort.order=='asc'? 'sort-down': 'sort-up'"
      />
    </span>
    <span 
      class="vuefinder-sort-bar vuefinder-list-time is-hidden-mobile" 
      @click="$emit('select', 'timestamp')"
    >Date
      <font-awesome-icon 
        v-show="sort.active && sort.by=='timestamp'" 
        :icon="sort.order=='asc'? 'sort-down': 'sort-up'"
      />
    </span>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

export default {
    name: 'ListviewSortbar',
    components: { FontAwesomeIcon },
    props: ['sort'],
};
</script>

<style scoped>
.vuefinder-list-view-sort-bar {
  font-size: smaller;
  display: flex;
  color: #3a525a;
}

.vuefinder-sort-bar {
  padding: 5px 14px;
  border: 1px whitesmoke solid;
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