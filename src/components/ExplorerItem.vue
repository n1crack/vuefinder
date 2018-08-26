<template>
  <file-icon 
    :icon="item.type" 
    :title="item.basename" 
    data-selectable
  >
    <span :class="{'selectable' : selectMode}">
      {{ listview ? item.basename : title_shorten(item.basename) }}
    </span>

    <span 
      v-show="listview" 
      class="vuefinder-file-size is-hidden-mobile"
    >
      {{ item.type != 'folder' ? fileSizeIEC(item.size) : '' }}
    </span>

    <span 
      v-show="listview" 
      class="vuefinder-file-time is-hidden-mobile"
    >
      {{ time(item.timestamp) }}
    </span>
  </file-icon>
</template>

<script>
import FileIcon from './FileIcon.vue';
import moment from 'moment';
import filesize from '../mixins/filesize';

export default {
    name: 'Item',
    components: { FileIcon },
    mixins: [filesize],
    props:{
        item: {
            type: Object,
            required: true
        },
        listview: {
            type: Boolean,
            required: true
        },
        selectMode: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        title_shorten (title) {
            return title.replace(/((?=([\w\W]{0,15}))([\w\W]{9,})([\w\W]{9,}))/, '$2..$4');
        },
        time (time) {
            return moment.unix(time).format('DD MMMgg HH:mm');
        },
    }
};
</script>

<style lang="scss" scoped>
.vuefinder-file-size {
  width: 66px;
}

.vuefinder-file-time {
  width: 120px;
}
</style>