<template>
  <span class="vuefinder-icon vuefinder-drag-image">
    <font-awesome-layers class="fa-layers fa-fw"> 
      <font-awesome-icon icon="copy" />
      <font-awesome-layers-text 
        v-show="count > 1"
        :value="count" 
        class="fa-layers-counter vuefinder-badge" 
        transform="down-20 shrink-11" />
    </font-awesome-layers>
  </span>
</template>

<script>

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

export default {
    name: 'DragImage',
    components: {         
        FontAwesomeIcon, 
        FontAwesomeLayers,
        FontAwesomeLayersText 
    },    
    props:{
        count: {
            type: Number,
            default: 5
        } 
    }
};
</script>

<style lang="scss" scoped>

.vuefinder-icon {
  display: inline-flex;
  margin: auto;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  font-size: 3em;
}
.vuefinder-drag-image{
  display : inline-flex; 
  position : absolute; 
  top : -200px; 
  left : -200px; 
}


</style>