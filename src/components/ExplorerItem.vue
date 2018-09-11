<template>
  <file-icon 
    :icon="item.type" 
    data-selectable
  >
    <span>
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
import format from 'date-fns/format';
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
        }
    },
    methods: {
        title_shorten (title) {
            return title.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, '$2..$4');
        },
        time (time) {
            return format(new Date(time*1000), 'dd MMMyy HH:mm');
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