<template>
  <div class="vuefinder-file-content">
    <div class="vuefinder-file-icon">
      <span 
        :class="{ 'light': icon != 'folder' }" 
        class="vuefinder-icon" >
        <font-awesome-icon :icon="icon" />
      </span>
    </div>

    <div class="vuefinder-file-name">
      <slot />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'FileIcon',
    components: { FontAwesomeIcon },
    props:{
        icon: {
            type: String,
            required: true
        }
    },
};
</script>

<style lang="scss" scoped>
.vuefinder-file-content {
  width: 110px;
  margin: 4px;
  display: flex;
  flex-direction: column;
}

.vuefinder-icon {
  display: inline-flex;
  margin: auto;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  font-size: 3em;
}

.vuefinder-file-icon {
  display: flex;
  margin-top: 5px;
  align-self: center;
  justify-content: flex-start;
}

.vuefinder-file-name {
  display: flex;
  margin-top: 5px;
  font-size: 12px;
  line-height: 24px;
  align-items: flex-start;
  flex: 1;
  justify-content: flex-start;

  span:first-child {
    flex: 1;
    //align-self: stretch;
  }

  span {
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    text-align: center;
    word-break: break-all;
    border: 1px dashed transparent;
  }
}

.list {
  .vuefinder-file-content {
    width: auto;
    margin: 3px;
    flex-direction: row;
  }

  .vuefinder-icon {
    height: 1.5rem;
    width: 1.5rem;
    font-size: inherit;
    align-items: center;
  }

  .vuefinder-file-name {
    min-width: 0;

    span {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>